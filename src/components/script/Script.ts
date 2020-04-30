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
    "#121212",
    "#8FB5AA",
    "#85889E",
    "#9C7989",
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
  pack!: any;
  chord!: any;
  arc!: any;
  ribbon!: any;
  rOuterScale!: any;
  rInnerScale!: any;
  opacityScale!: any;
  width = 1366;
  height = 700;
  outerRadius: number = Math.min(this.width, this.height) * 0.5 - 10;
  innerRadius: number = this.outerRadius - 30;
  insideRadius: number = this.width * 0.5;
  paddingCircle = 30;
  paddingArc = 0.01;
  movieIntro = [
    "The Fellowship of the Ring",
    "The Two Towers",
    "The Return of the King"
  ];
  div!: any;
  div1!: any;
  div2!: any;
  mounted() {
    this.div = d3
      .select("#script")
      .append("div")
      .attr("id", "svg1");
    // small div for hover effects on the chords
    this.div1 = d3
      .select("#script")
      .append("div")
      .attr("class", "tooltip1")
      .style("opacity", 0);
    // big div for hover effects
    this.div2 = d3
      .select("#svg1")
      .append("div")
      .attr("class", "tooltip2")
      .style("opacity", 0)
      .style("left", "820px")
      .style("top", "30px");
    const promise1 = d3.csv(process.env.VUE_APP_PUBLIC_PATH + "/Movies.csv", this.parseMovieRaw),
      promise2 = d3.csv(process.env.VUE_APP_PUBLIC_PATH + "/merged_information.csv");

    Promise.all([promise1, promise2]).then((x: any) =>
      this.callback(x[0], x[1])
    );
  }

  /* function for the main visualization */
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

  /* call back function for the main visualization */
  callback(rawMovies: any, wordsByCharacter: any) {
    this.processData(rawMovies, wordsByCharacter);
    const svg1 = d3
      .select("#svg1")
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height);
    const group = svg1
      .append("g")
      .attr(
        "transform",
        "translate(" + this.height / 2 + "," + this.height / 2 + ")"
      );
    this.prepareDrawing();
    this.drawPaths(group);
    this.drawcircles(group);
    this.drawLegends(group);
  }

  /* prepare data */
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
      .rollup((v: any) => {
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
      d.x = d.x - this.insideRadius / 2;
      d.y = d.y - this.insideRadius / 2;
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
        this.displayFieldSet(i, "movie");
      })
      .on("mouseout", (d: any, i: any) => {
        this.circleMouseout(d, i);
      });

    bubbles
      .append("circle")
      .attr("r", function(d: any) {
        return 60;
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
          .attr("r", 60);
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
      .attr("font-size", "9pt")
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
    const xloc = 470;
    let yloc = 80;
    const raceLegends = svg
      .append("g")
      .selectAll("rect")
      .data(this.races)
      .enter();

    raceLegends
      .append("rect")
      .attr("x", function(d: any, i: any) {
        return xloc;
      })
      .attr("y", function(d: any, i: any) {
        return yloc + i * 25;
      })
      .attr("width", 10)
      .attr("height", 10)
      .style("fill", (d: any, i: any) => {
        return this.color(this.races[i]);
      })
      .style("opacity", "0.9");
    yloc = 90;
    raceLegends
      .append("text")
      .attr("x", function(d: any, i: any) {
        return xloc + 30;
      })
      .attr("y", function(d: any, i: any) {
        return yloc + i * 25;
      })
      .attr("text-anchor", "left")
      .attr("font-size", "12pt")
      .text(function(d: any) {
        return d;
      });
  }

  /* display text on hover for circles and chords */
  displayFieldSet(i: any, type: string) {
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
      fields["Total Words in the Series"] = this.words[i].sum;
      fields["Words in " + this.movies[0].Name] = this.words[i].wordsList[0];
      fields["Words in " + this.movies[1].Name] = this.words[i].wordsList[1];
      fields["Words in " + this.movies[2].Name] = this.words[i].wordsList[2];
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
    d3.select("fieldset").remove();
    const fieldset = this.div2.append("fieldset");
    fieldset.append("legend").html(legend);
    for (const key in fields) {
      fieldset
        .append("li")
        .html("<strong>" + key + "</strong>: " + fields[key])
        .style("color", () => {
          if (key == "race") {
            return this.color(fields[key]);
          }
          return "black";
        });
    }
  }

  /* display the small text on hover for each chord group */
  displayTooltip(i: any, opacity: any) {
    const text = this.words[i].key;
    this.div1
      .transition()
      .duration(200)
      .style("opacity", opacity);
    this.div1
      .html(text)
      .style("left", d3.event.pageX + "px")
      .style("top", d3.event.pageY - 28 + "px");
  }

  /* change chord opacity on hover for each chord */
  chordMouseover(d: any, i: any, opacity: any) {
    d3.selectAll(".ribbons path")
      .filter(function(e, index) {
        return index != i;
      })
      .transition()
      .style("opacity", 0.1);

    const charInd = Math.floor(i / 3);
    const movieInd = d.source.subindex;
    // var text = words[i].key;
    // console.log(movieIntro[d.source.subindex])
    this.div2.style("opacity", 0.9);
    const fields: any = {};
    fields["Movie"] = this.movies[movieInd].Name;
    fields["Character"] = this.words[charInd].key;
    fields["Race"] = this.words[charInd].race;
    fields["Birth"] = this.words[charInd].birth;
    fields["Death"] = this.words[charInd].death;
    fields["Hair Color"] = this.words[charInd].hair;
    fields["Height"] = this.words[charInd].height;
    fields["Gender"] = this.words[charInd].gender;
    fields["Words"] = this.words[charInd].wordsList[movieInd];
    d3.select("fieldset").remove();
    const fieldset = this.div2.append("fieldset");
    const legend: string =
      this.words[charInd].key + " in " + this.movies[movieInd].Name;
    fieldset.append("legend").html(legend);
    let flag = 0;
    for (const key in fields) {
      let type = "ul";
      if (flag == 0) type = "li";
      fieldset
        .append(type)
        .html("<strong>" + key + "</strong>: " + fields[key])
        .style("color", function() {
          return "black";
        });
      if (key == "Character") {
        flag = 1;
      }
    }

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
