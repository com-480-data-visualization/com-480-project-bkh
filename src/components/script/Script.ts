import * as d3 from "d3";
import { Component, Vue } from "vue-property-decorator";
import { customeChord } from "./chordindex";
import { customeRibbon } from "./ribbonindex";
@Component
export default class Script extends Vue {
  colors = [
    "#9C6744",
    "#C9BEB9",
    "#CFA07E",
    "#C4BAA1",
    "#C2B6BF",
    "#9C7989",
    "#8FB5AA",
    "#85889E",
    "#121212",
    "#91919C"
  ];
  color!: any;
  arcColors: Array<string> = [];
  points!: any;
  matrix!: Array<any>;
  characters!: any;
  movies!: any;
  words!: any;
  movieIndexByName!: any;
  characterIndexByName!: any;
  races!: any;
  glinks!: any
  gnodes!: any
  pack!: any;
  chord!: any;
  arc!: any;
  ribbon!: any;
  rOuterScale!: any;
  rInnerScale!: any;
  opacityScale!: any;
  width_left = 700;
  width_right = 700;
  height = 500;
  outerRadius: number = Math.min(this.width_left, this.height) * 0.5 - 10;
  innerRadius: number = this.outerRadius - 15;
  insideRadius: number = this.width_left * 0.5;
  paddingCircle = 20;
  paddingArc = 0.01;
  movieIntro = [
    "The Fellowship of the Ring",
    "The Two Towers",
    "The Return of the King"
  ];
  div!: any;
  div1!: any;
  div2!: any;
  div3!: any;
  div4!: any;
  mounted() {
    
    this.div = d3
      .select("#script")
      .append("div")
      .attr("id", "svg1")
    this.div2 = d3
      .select("#svg1")
      .append("div")
      .attr("id", "svg2")
      .attr("class", "tooltip2")
      .style("left", "740px");
    this.div3 = d3
      .select("#svg1")
      .append("g") // group to move svg sideways
      .attr("transform", "translate(" + 100 + ")")
      .append("div")
      .attr("id", "svg3")
      .attr("class", "tooltip3")
      .style("left", "1050px");
    this.div4 = d3
      .select("#svg1")
      .append("div")
      .attr("id", "svg4")
      .attr("class", "tooltip4")
      .style("left", "670px");
    this.div1 = d3
      .select("#script")
      .append("div")
      .attr("class", "tooltip1")
      .style("opacity", 0);
    const promise1 = d3.csv(
        process.env.VUE_APP_PUBLIC_PATH + "/Movies.csv",
        this.parseMovieRaw
      ),
      promise2 = d3.csv(
        process.env.VUE_APP_PUBLIC_PATH + "/merged_information.csv"
      );
    Promise.all([promise1, promise2]).then((x: any) =>
      this.callback(x[0], x[1])
    );
  }

  parseMovieRaw(d: any, i: any) {
    return {
      Name: d.Name,
      runtime: Number(d.RuntimeInMinutes),
      budget: Number(d.BudgetInMillions),
      boxRevenue: Number(d.BoxOfficeRevenueInMillions),
      nominations: Number(d.AcademyAwardNominations),
      wins: Number(d.AcademyAwardWins),
      score: Number(d.RottenTomatoesScore)
    };
  }

  callback(rawMovies: any, wordsByCharacter: any) {
    this.processData(rawMovies, wordsByCharacter);
  
    const svg1 = d3
      .select("#svg1")
      .append("svg")
      .attr("width", this.width_left)
      .attr("height", this.height)
      .append("g")
      .attr(
        "transform",
        "translate(" + this.height / 2 + "," + this.height / 2 + ")");
      
    this.prepareDrawing()
    this.drawPaths(svg1);
    this.drawcircles(svg1);
    this.drawLegends(svg1);
  }

  processData(rawMovies: any, wordsByCharacter: any) {
    this.movies = rawMovies.map(function(d: any, i: any) {
      d.index = i;
      return d;
    });
    this.movieIndexByName = d3.map(this.movies, function(d: any) {
      return d.Name;
    });
    this.characters = d3.map(wordsByCharacter, function(d: any) {
      return d.char;
    });
    this.races = wordsByCharacter
      .map(function(d: any) {
        return d.race;
      })
      .sort()
      .filter(function(d: any, i: any, array: any) {
        return !i || d != array[i - 1];
      });
    this.words = d3
      .nest()
      .key(function(d: any) {
        return d.char;
      })
      .rollup((v: any[]): any => {
        const array = [0, 0, 0];
        v.forEach((e: any) => {
          const index = this.movieIndexByName.get(e.movie).index;
          array[index] = Number(e.word_count);
        });
        return array;
      })
      .entries(wordsByCharacter)
      .map((d: any) => {
        this.characters.get(d.key);
        d.sum = d3.sum(d.value);
        d.wordsList = d.value;
        d.race = this.characters.get(d.key).race;
        d.birth = this.characters.get(d.key).birth;
        d.death = this.characters.get(d.key).death;
        d.birthEra = this.characters.get(d.key).birthEra;
        d.deathEra = this.characters.get(d.key).deathEra;
        d.gender = this.characters.get(d.key).gender;
        d.hair = this.characters.get(d.key).hair;
        d.height = this.characters.get(d.key).height;
        return d;
      });
    this.words.sort(function(a: any, b: any) {
      return a.race == b.race ? b.sum - a.sum : a.race.localeCompare(b.race);
    });
    this.characterIndexByName = d3.map(this.words, function(d: any) {
      return d.key;
    });
    this.matrix = [];
    this.words.forEach((word: any) => {
      this.matrix.push(word.value);
    });
  }

  /* prepare for the bubbles */
  prepareDrawing() {
    const pack = d3
      .pack()
      .size([this.insideRadius, this.insideRadius])
      .padding(this.paddingCircle);
    const root = d3
      .hierarchy({
        children: this.movies
      })
      .sum(function(d: any) {
        return d.boxRevenue * d.boxRevenue;
      });
    this.points = pack(root).leaves();
    this.points.map((d: any, i: any) => {
      if(i == 0) {
        d.x = d.x-200;
        d.y = d.y-200;
      }
      else if(i == 1){
        d.x = d.x-140;
        d.y = d.y-200;
      }
      else {
        d.x = d.x-170;
        d.y = d.y-170;
      }
      
    });
    this.chord = customeChord()
      .padAngle(this.paddingArc)
      .sortSubgroups(d3.descending);
    this.arc = d3
      .arc()
      .innerRadius(this.innerRadius)
      .outerRadius(this.outerRadius);
    this.ribbon = customeRibbon().radius(this.innerRadius);
  }
  drawBubbles(svg: any, i: number) {
    const currColor = d3
      .scaleOrdinal()
      .domain(this.races)
      .range(this.colors);
    
    const simulation:any = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d: any) { return d.id; }))
    .force("charge", d3.forceManyBody().strength(-300).distanceMax(300).distanceMin(80))
          .force("center", d3.forceCenter(this.width_left / 2, this.width_left / 2));

    function dragstarted(d:any) {
      if (!d3.event.active) simulation.alphaTarget(.03).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    function dragged(d:any) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }
    function dragended(d:any) {
      if (!d3.event.active) simulation.alphaTarget(.03);
      d.fx = null;
      d.fy = null;
    }  
    let filename = "f_r_character_graph.json";
    if(i == 1) filename = "t_t_character_graph.json"
    else if(i == 2) filename = "r_k_character_graph.json"
    d3.json(process.env.VUE_APP_PUBLIC_PATH + filename).
      then(function(graph) {
        const link = svg.append("g")
            .attr("class", "links")
          .selectAll("line")
          .data(graph.links)
          .enter().append("line")
            .attr("stroke", "grey")
            .attr("stroke-width", function(d: any) { return d.value / 5; });
      
        const nodes = svg.append("g")
            .attr("class", "nodes")
          .selectAll("circle")
          .data(graph.nodes)
          .enter().append("g")
        
        nodes.append("circle")
            .attr("r", 5)
            .attr("fill", function(d: any) { return currColor(d.race); })
            .call(d3.drag()
              .on("start", dragstarted)
              .on("drag", dragged)
              .on("end", dragended));
        
        nodes.append("text")
          .attr("dx", 8)
          .attr("dy", ".35em")
          .attr("font-family", "Georgia")
          .text(function(d: any) { return d.id });
        function ticked() {
          link
              .attr("x1", function(d: any) { return d.source.x; })
              .attr("y1", function(d: any) { return d.source.y; })
              .attr("x2", function(d: any) { return d.target.x; })
              .attr("y2", function(d: any) { return d.target.y; });
      
          nodes
              .attr("transform", function(d: any) { return "translate("+[d.x,d.y]+")" });
        }
        simulation
            .nodes(graph.nodes)
            .on("tick", ticked);
        simulation.force("link")
          .links(graph.links);
      })
      .catch(function(error) {
        throw error;
      });
  }
  /* draw center inner and outer circles */
  drawcircles(svg: any) {
    const bubbles = svg
      .append("g")
      .attr("class", "bubbles")
      .selectAll(".bubble")
      .data(this.points)
      .enter()
      .append("g")
      // add hover effects for inner circles
      .on("mouseover", (d: any, i: any) => {
        this.circleMouseover(d, i);
        // this.displayFieldSet(i, "movie");
      })
      .on("mouseout", (d: any, i: any) => {
        this.circleMouseout(d, i);
      });

    bubbles
      .append("circle")
      .attr("r", function(d: any) {
        return 63;
      })
      .attr("cx", function(d: any) {
        return d.x;
      })
      .attr("cy", function(d: any) {
        return d.y;
      })
      .style("fill", "#c5c5c5")
      .style("opacity", 0.9)
      // add hover effects for outer circles
      .on("mouseover", (d: any, i: any, n: any) => {
        d3.select(n[i])
          .transition()
          .attr("r", 80)
          .style("fill", "#7d7d7d");
        this.displayFieldSet(i, "movie");
      })
      .on("mouseout", (d: any, i: any, n: any) => {
        d3.select(n[i])
          .transition()
          .style("fill", "#c5c5c5")
          .attr("r", 62);
      });
    bubbles
      .append("text")
      .attr("x", function(d: any) {
        return d.x;
      })
      .attr("y", function(d: any) {
        return d.y;
      })
      .attr("text-anchor", "middle")
      .attr("font-size", "8pt")
      .attr("font-family", "Georgia")
      .text((d: any, i: any) => {
        return this.movieIntro[i];
      });
  }

  /* draw chord diagram */
  drawPaths(svg: any) {
    this.color = d3
      .scaleOrdinal()
      .domain(this.races)
      .range(this.colors);
    const g = svg.append("g").datum(this.chord(this.matrix, this.points));
    const arcs = g
      .append("g")
      .attr("class", "arcs")
      .selectAll("g")
      .data(function(chords: any) {
        return chords.groups;
      })
      .enter();

    arcs
      .append("path")
      .style("fill", (d: any) => {
        return this.color(this.words[d.index].race);
      })
      .style("stroke", (d: any) => {
        return this.color(this.words[d.index].race);
      })
      .attr("opacity", 1)
      .attr("d", this.arc)
      // add hover effect for chord groups
      .on("mouseover", (d: any, i: any) => {
        this.groupMouseover(d, i);
        this.displayTooltip(i, 0.9);
        this.displayFieldSet(i, "character");
      })
      .on("mouseout", (d: any, i: any) => {
        this.displayTooltip(i, 0);
        this.groupMouseout(d, i);
      });

    const streams = g
      .append("g")
      .attr("class", "ribbons")
      .selectAll("path")
      .data(function(chords: any) {
        return chords;
      });
    streams
      .enter()
      .append("path")
      .style("fill", (d: any) => {
        return this.color(this.words[d.source.index].race);
      })
      .style("stroke", (d: any) => {
        return this.color(this.words[d.source.index].race);
      })
      .attr("opacity", 0.6)
      .attr("d", this.ribbon)
      // add hover effect for individual chords
      .on("mouseover", (d: any, i: any) => {
        this.chordMouseover(d, i, "0.9");
      })
      .on("mouseout", (d: any, i: any) => {
        this.chordMouseout(d, i);
      });
  }

  drawLegends(svg: any) {
    const xloc = 240;
    let yloc = -220;
    const raceLegends = svg
      .append("g")
      .selectAll("rect")
      .data(this.races)
      .enter();

    raceLegends
      .append("rect")
      .attr("x", function(d: any, i: any) {
        return xloc + Math.floor(i / 5) * 130;
      })
      .attr("y", function(d: any, i: any) {
        return yloc + (i % 5) * 25;
      })
      .attr("width", 8)
      .attr("height", 8)
      .style("fill", (d: any, i: any) => {
        return this.color(this.races[i]);
      })
      .style("opacity", "0.9");
    yloc = -210;
    raceLegends
      .append("text")
      .attr("x", function(d: any, i: any) {
        return xloc + Math.floor(i / 5) * 130 + 20;
      })
      .attr("y", function(d: any, i: any) {
        return yloc + (i % 5) * 25;
      })
      .attr("text-anchor", "left")
      .attr("font-size", "8pt")
      .attr("font-family", "Georgia")
      .text(function(d: any) {
        return d;
      });
  }

  /* display text on hover for circles and chords */
  displayFieldSet(i: any, type: string) {
    d3.select("#svg2").select("svg").remove()
    d3.select("#svg3").select("svg").remove()
    d3.select("#svg4").select("svg").remove();
    this.div2.style("opacity", 0.9);
    let legend;
    let fields: any = {};
    if (type == "character") {
      legend = this.words[i].key;
      fields["Race"] = this.words[i].race;
      fields["Birth"] = this.words[i].birth;
      fields["Death"] = this.words[i].death;
      fields["Hair Color"] = this.words[i].hair;
      fields["Height"] = this.words[i].height;
      fields["Gender"] = this.words[i].gender;
    } else if (type == "movie") {
      legend = this.movies[i].Name;
      fields = {
        "Runtime In Minutes": this.movies[i].runtime,
        "Budget In Millions": this.movies[i].budget,
        "Box Office Revenue In Millions": this.movies[i].boxRevenue,
        "Academy Award Nominations": this.movies[i].nominations,
        "Academy Award Wins": this.movies[i].wins,
        "Rotten Tomatoes Score": this.movies[i].score
      };
    } else return;
    const characterSmall = legend.toLowerCase();
    d3
      .select("#svg3")
      .append("svg")
      .attr("width", this.width_right)
      .attr("height", this.height)
      .append("image")
      .attr("xlink:href", process.env.VUE_APP_PUBLIC_PATH + "/characters/" + characterSmall + ".png")
      .attr("width", 230)
      .attr("height", 230);
    d3.select("fieldset").remove();
    const fieldset = this.div2.append("fieldset");
    fieldset.append("legend").html(legend);


    for (const key in fields) {
      fieldset
        .append("li")
        .html("<strong>" + key + "</strong>: " + fields[key])
        .style("color", () => {
          if (key == "Race") {
            return this.color(fields[key]);
          }
          return "black";
        });
    }
  }

  /* display the small text on hover for each chord group */
  displayTooltip(i: any, opacity: any) {
    const text = this.words[i].key + 
    "<br>" + this.movies[0].Name + ": " + this.words[i].wordsList[0] + " words" + 
    "<br>" + this.movies[1].Name + ": " + this.words[i].wordsList[1] + " words" +
    "<br>" + this.movies[2].Name + ": " + this.words[i].wordsList[2] + " words";
    // this.div1.transition().duration(500).remove();
    
      this.div1
        .transition()
        .duration(500)
        .style("opacity", opacity);
      this.div1
        .html(text)
        .style("left", d3.event.pageX + 15 + "px")
        .style("top", d3.event.pageY - 10 + "px");
    
  }

  /* change chord opacity on hover for each chord */
  chordMouseover(d: any, i: any, opacity: any) {
    d3.selectAll(".ribbons path")
      .filter(function(e, index) {
        return index != i;
      })
      .transition()
      .style("opacity", 0.1);

    d3.selectAll(".bubbles g")
      .filter(function(e, index) {
        return index != d.source.subindex;
      })
      .transition()
      .style("opacity", 0.1);
  }

  /* remove hover effects */
  chordMouseout(d: any, i: any) {
    d3.selectAll(".ribbons path")
      .filter(function(e, index) {
        return index != i;
      })
      .transition()
      .style("opacity", 0.8);

    d3.selectAll(".bubbles g")
      .filter(function(e, index) {
        return index != d.source.subindex;
      })
      .transition()
      .style("opacity", 1);
  }

  /* change chord opacity on hover for each circle */
  circleMouseover(d: any, i: any) {
    d3.selectAll(".ribbons path")
      .filter(function(e: any, index: any) {
        return e.source.subindex != i;
      })
      .transition()
      .style("opacity", 0.1);

    d3.selectAll(".bubbles g")
      .filter(function(e, index) {
        return index != i;
      })
      .transition()
      .style("opacity", 0.1);
    d3.select("#svg2").select("svg").remove();
    d3.select("#svg3").select("svg").remove();
    d3.select("#svg4").select("svg").remove();
    d3.select("fieldset").remove();
    const svg2 = d3
      .select("#svg4")
      .append("svg")
      .attr("width", this.width_right)
      .attr("height", this.height)
      .append("g") // group to move svg sideways
      .attr("transform", "translate(" + (0 + "," + -100) + ")")
    this.drawBubbles(svg2, i);
  }

  /* remove hover effects */
  circleMouseout(d: any, i: any) {
    d3.selectAll(".ribbons path")
      .filter(function(e: any, index: any) {
        return e.source.subindex != i;
      })
      .transition()
      .style("opacity", 0.8);

    d3.selectAll(".bubbles g")
      .filter(function(e, index) {
        return index != i;
      })
      .transition()
      .style("opacity", 1);
  }

  /* change chord opacity on hover for each group */
  groupMouseover(d: any, i: any) {
    const movielist: any = [];
    d3.selectAll(".ribbons path")
      .filter(function(e: any, index: any) {
        if (e.source.index == i && e.source.value > 0)
          movielist.push(e.source.subindex);
        return e.source.index != i;
      })
      .transition()
      .style("opacity", 0.1);

    d3.selectAll(".bubbles g")
      .filter(function(e, index) {
        return movielist.indexOf(index) < 0;
      })
      .transition()
      .style("opacity", 0.1);
  }

  /* remove hover effects */
  groupMouseout(d: any, i: any) {
    const movielist: any = [];
    d3.selectAll(".ribbons path")
      .filter(function(e: any, index: any) {
        if (e.source.index == i && e.source.value > 0)
          movielist.push(e.source.subindex);
        return e.source.index != i;
      })
      .transition()
      .style("opacity", 0.8);

    d3.selectAll(".bubbles g")
      .filter(function(e, index) {
        return movielist.indexOf(index) < 0;
      })
      .transition()
      .style("opacity", 1);
  }
}
