import { Component, Vue } from "vue-property-decorator";
import * as d3 from "d3";
//import * as _d3Tip from "d3-tip";
//let parent = this
@Component
export default class Eventse extends Vue {

  data = [
    {
      preview: "nan",
      id: "Gondor has not been founded yet",
      start: 0,
      end: 2820,
      age: "SA",
      startLabel: "",
      endLabel: "",
      color: "#BFBFBF"
    },
    {
      preview: "K",
      id: "Elendil",
      start: 2820,
      end: 2941,
      age: "SA",
      startLabel: "",
      endLabel: "",
      color: "#FBC779"
    },
    {
      preview: "K",
      id: "Isildur",
      start: 2941,
      end: 2960,
      age: "SA",
      startLabel: "",
      endLabel: "",
      color: "#FBC779"
    },
    {
      preview: "K",
      id: "Isildur",
      start: 0,
      end: 2,
      age: "TA",
      startLabel: "",
      endLabel: "",
      color: "#FBC779"
    },
    {
      preview: "K",
      id: "Meneldil",
      start: 2,
      end: 158,
      age: "TA",
      startLabel: "",
      endLabel: "",
      color: "#FBC779"
    },
    {
      preview: "K",
      id: "Cemendur",
      start: 158,
      end: 238,
      age: "TA",
      startLabel: "",
      endLabel: "",
      color: "#FBC779"
    },
    {
      preview: "K",
      id: "Eärendil of Gondor",
      start: 238,
      end: 324,
      age: "TA",
      startLabel: "",
      endLabel: "",
      color: "#FBC779"
    },
    {
      preview: "K",
      id: "Anardil",
      start: 324,
      end: 411,
      age: "TA",
      startLabel: "",
      endLabel: "",
      color: "#FBC779"
    },
    {
      preview: "K",
      id: "Ostoher",
      start: 411,
      end: 491,
      age: "TA",
      startLabel: "",
      endLabel: "",
      color: "#FBC779"
    },
    {
      preview: "K",
      id: "Rómendacil I",
      start: 491,
      end: 541,
      age: "TA",
      startLabel: "",
      endLabel: "",
      color: "#FBC779"
    },
    {
      preview: "K",
      id: "Turambar",
      start: 541,
      end: 667,
      age: "TA",
      startLabel: "",
      endLabel: "",
      color: "#FBC779"
    },
    {
      preview: "K",
      id: "Atanatar I",
      start: 667,
      end: 748,
      age: "TA",
      startLabel: "",
      endLabel: "",
      color: "#FBC779"
    },
    {
      preview: "K",
      id: "Siriondil",
      start: 748,
      end: 830,
      age: "TA",
      startLabel: "",
      endLabel: "",
      color: "#FBC779"
    },
    {
      preview: "K",
      id: "Tarannon Falastur",
      start: 830,
      end: 913,
      age: "TA",
      startLabel: "",
      endLabel: "",
      color: "#FBC779"
    },
    {
      preview: "K",
      id: "Eärnil I",
      start: 913,
      end: 936,
      age: "TA",
      startLabel: "",
      endLabel: "",
      color: "#FBC779"
    },
    {
      preview: "K",
      id: "Ciryandil",
      start: 936,
      end: 1015,
      age: "TA",
      startLabel: "",
      endLabel: "",
      color: "#FBC779"
    },
    {
      preview: "K",
      id: "Hyarmendacil I",
      start: 1015,
      end: 1149,
      age: "TA",
      startLabel: "",
      endLabel: "",
      color: "#FBC779"
    },
    {
      preview: "K",
      id: "Atanatar II",
      start: 1149,
      end: 1226,
      age: "TA",
      startLabel: "",
      endLabel: "",
      color: "#FBC779"
    },
    {
      preview: "K",
      id: "Narmacil I",
      start: 1226,
      end: 1294,
      age: "TA",
      startLabel: "",
      endLabel: "",
      color: "#FBC779"
    },
    {
      preview: "K",
      id: "Calmacil",
      start: 1294,
      end: 1304,
      age: "TA",
      startLabel: "",
      endLabel: "",
      color: "#FBC779"
    },
    {
      preview: "No-one",
      id: "No-one",
      start: 1304,
      end: 1366,
      age: "TA",
      startLabel: "",
      endLabel: "",
      color: "#FFC0CB"
    },
    {
      preview: "K",
      id: "Valacar",
      start: 1366,
      end: 1432,
      age: "TA",
      startLabel: "",
      endLabel: "",
      color: "#FBC779"
    },
    {
      preview: "K",
      id: "Eldacar of Gondor",
      start: 1432,
      end: 1437,
      age: "TA",
      startLabel: "",
      endLabel: "",
      color: "#FBC779"
    },
    {
      preview: "K",
      id: "Castamir the Usurper",
      start: 1437,
      end: 1447,
      age: "TA",
      startLabel: "",
      endLabel: "",
      color: "#FBC779"
    },
    {
      preview: "K",
      id: "Dummy",
      start: 1447,
      end: 1490,
      age: "TA",
      startLabel: "",
      endLabel: "",
      color: "#FBC779"
    },
    {
      preview: "K",
      id: "Aldamir",
      start: 1490,
      end: 1540,
      age: "TA",
      startLabel: "",
      endLabel: "",
      color: "#FBC779"
    },
    {
      preview: "K",
      id: "Hyarmendacil II",
      start: 1540,
      end: 1621,
      age: "TA",
      startLabel: "",
      endLabel: "",
      color: "#FBC779"
    },
    {
      preview: "K",
      id: "Minardil",
      start: 1621,
      end: 1634,
      age: "TA",
      startLabel: "",
      endLabel: "",
      color: "#FBC779"
    },
    {
      preview: "K",
      id: "Telemnar",
      start: 1634,
      end: 1636,
      age: "TA",
      startLabel: "",
      endLabel: "",
      color: "#FBC779"
    },
    {
      preview: "K",
      id: "Tarondor",
      start: 1636,
      end: 1798,
      age: "TA",
      startLabel: "",
      endLabel: "",
      color: "#FBC779"
    },
    {
      preview: "K",
      id: "Telumehtar",
      start: 1798,
      end: 1850,
      age: "TA",
      startLabel: "",
      endLabel: "",
      color: "#FBC779"
    },
    {
      preview: "K",
      id: "Narmacil II",
      start: 1850,
      end: 1856,
      age: "TA",
      startLabel: "",
      endLabel: "",
      color: "#FBC779"
    },
    {
      preview: "K",
      id: "Calimehtar",
      start: 1856,
      end: 1936,
      age: "TA",
      startLabel: "",
      endLabel: "",
      color: "#FBC779"
    },
    {
      preview: "K",
      id: "Ondoher",
      start: 1936,
      end: 1944,
      age: "TA",
      startLabel: "",
      endLabel: "",
      color: "#FBC779"
    },
    {
      preview: "K",
      id: "Eärnil II",
      start: 1945,
      end: 2043,
      age: "TA",
      startLabel: "",
      endLabel: "",
      color: "#FBC779"
    },
    {
      preview: "K",
      id: "Eärnur",
      start: 2043,
      end: 2050,
      age: "TA",
      startLabel: "",
      endLabel: "",
      color: "#FBC779"
    },
    {
      preview: "Gondor Destroyed",
      id: "Gondor Destroyed",
      start: 2050,
      end: 3019,
      age: "TA",
      startLabel: "",
      endLabel: "",
      color: "#FF6666"
    },
    {
      preview: "K",
      id: "Aragorn II Elessar",
      start: 3019,
      end: 3021,
      age: "TA",
      startLabel: "",
      endLabel: "",
      color: "#FBC779"
    },
    {
      preview: "K",
      id: "Aragorn II Elessar",
      start: 0,
      end: 120,
      age: "FO",
      startLabel: "",
      endLabel: "",
      color: "#FBC779"
    },
    {
      preview: "K",
      id: "Eldarion",
      start: 120,
      end: 220,
      age: "FO",
      startLabel: "",
      endLabel: "",
      color: "#FBC779"
    }
  ];

  margin = { top: 20, right: 40, bottom: 200, left: 5 };
  margin2 = { top: 860, right: 40, bottom: 40, left: 5 };
  width = 1600 - this.margin.left - this.margin.right;
  height = 1000 - this.margin.top - this.margin.bottom;
  focusHeight = 1000 - this.margin2.top - this.margin2.bottom;
  x: any;
  y: any;
  filteredData: any;
  parent: any;
  svg: any;
  groups: any;
  groupsView: any;
  line: any;
  brush: any;
  LightenDarkenColor(col: any, amt: any) {
    let usePound = false;
    if (col[0] == "#") {
      col = col.slice(1);
      usePound = true;
    }

    const num = parseInt(col, 16);

    let r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    let b = ((num >> 8) & 0x00ff) + amt;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    let g = (num & 0x0000ff) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
  }
  getTooltipContent(d: any) {
    return `<b>${d.id}</b>
    <br/>
    ${d.age} 
    <br/>
    ${d.start} - ${d.end}
    `;
  }

  getRect(d: any, i: any, n: any) {
    const el = d3.select(n[i]);

    const sx = this.x(d.start);

    const w = this.x(d.end) - this.x(d.start);
    const isLabelRight = sx > this.width / 2 ? sx + w < this.width : sx - w > 0;

    el.style("cursor", "pointer");

    el.append("rect")
      .attr("x", sx)
      .attr("height", this.y2.bandwidth())
      .attr("width", w)
      .attr("fill", d.color)
      .attr("stroke", "black")
      .attr("stroke-width", "1");

    el.append("text")
      .text(d.id)
      .attr("x", sx + w / 2)
      .attr("y", 2.5)
      .attr("fill", "black")
      .style("text-anchor", "start")
      .style("dominant-baseline", "hanging")
      .style("font", "9px sans-serif");
  }

  createTooltip(el: any) {
    el.style("position", "absolute")
      .style("pointer-events", "none")
      .style("top", 0)
      .style("opacity", 0)
      .style("background", "white")
      .style("border-radius", "5px")
      .style("box-shadow", "0 0 10px rgba(0,0,0,.25)")
      .style("padding", "10px")
      .style("line-height", "1.3")
      .style("font", "11px sans-serif");
  }
  zoomed() {
    //this.g1.attr("transform", d3.event.transform);
  }
  updateView(start: any, end: any) {
    start = (start * 600) / 300;
    end = (end * 800) / 400;
    this.viewData = this.filteredData.filter(function(d: any) {
      const bl =
        (d.start >= start && d.start <= end) ||
        (d.end >= start && d.end <= end) ||
        (d.end >= end && d.start <= start && d.preview != "nan");
      return bl;
    });
    this.newx = d3
      .scaleLinear()
      .domain([
        d3.min(this.viewData, (d: any) => d.start),
        d3.max(this.viewData, (d: any) => d.end)
      ])
      .range([0, this.width - this.margin.left - this.margin.right]);

    this.newXAxis = d3.axisBottom(this.newx);

    this.contex.selectAll("g.x.axis").call(this.newXAxis);

    this.x = this.newx;
    const civs = d3.selectAll(".civ");
    civs.remove();
    /*
      const civs = d3.selectAll(".civ")
      console.log(this.viewData)
      civs.data(this.viewData,)
      .transition()
      .delay((d,i)=>i*10)
      .ease(d3.easeCubic)
      .attr("transform", (d,i)=>`translate(0 ${this.y(d.age)})`)
      */

    this.groupsView = this.gView
      .selectAll("g")
      .data(this.viewData)
      .enter()
      .append("g")
      .attr("class", "civ");

    //this.groups.attr("transform", (d:any,i:any)=>`translate(0 ${this.y(i)})`);
    this.groupsView.attr(
      "transform",
      (d: any, i: any) => `translate(0,${this.y(d.age)})`
    );

    this.groupsView
      .each(this.getRectView)
      .attr("pointer-events", "all")
      .on("click", (d: any) => {
  
        this.div
          .transition()
          .duration(200)
          .style("opacity", 0.8);
        this.div
          .html(this.getTooltipContent(d))
          .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY - 28 + "px")
          .style("background", "#d3d3d3")
          .style("border-radius", "5px")
          .style("box-shadow", "0 0 100px rgba(100,0,0,.25)")
          .style("padding", "10px")
          .style("line-height", "2.3")
          .style("font", "14px sans-serif");;
      })
      .on("mouseover", (d: any, i: any, n: any) => {
        console.log(d.color)
        d3.select(n[i])
          .select("rect")
          .attr("fill", this.LightenDarkenColor(d.color, -20));
      })
      .on("mouseleave", (d: any, i: any, n: any) => {
        d3.select(n[i])
          .select("rect")
          .attr("fill", d.color);
        this.div.style("opacity", 0);
      });
  }
  brushed() {
    if (d3.event.sourceEvent && d3.event.sourceEvent.type === "click") return;
    if (d3.event.selection) {
      this.focus.property(
        "value",
        d3.event.selection.map(this.x.invert, this.x)
      );
      this.height = 1;
      this.updateView(d3.event.selection[0], d3.event.selection[1]);
      this.focus.dispatch("input");
    }
  }
  brushended() {
    if (!d3.event.selection) {
      this.gb.call(this.brush.move);
    }
  }

  getRectView(d: any, i: any, n: any) {
    const el = d3.select(n[i]);

    const sx = this.x(d.start);

    const w = this.x(d.end) - this.x(d.start);
    const isLabelRight = sx > this.width / 2 ? sx + w < this.width : sx - w > 0;

    el.style("cursor", "pointer");

    el.append("rect")
      .attr("x", sx)
      .attr("height", this.y.bandwidth()-40)
      .attr("width", w)
      .attr("rx", 5)								// how much to round corners - to be transitioned below
		  .attr("ry", 5)	
      .attr("fill", d.color)
      .style("opacity", 0.6)
      .attr("stroke", "black")
      .attr("stroke-width", "5.4");

    el.append("text")
      .text(d.text)
      .attr("x", sx + w / 2)
      .attr("y", 80.5)
      .attr("fill", "black")
      .style("text-anchor", "start")
      .style("dominant-baseline", "hanging")
      .style("font", "20px sans-serif");
  }
  viewData = this.data;
  tooltip: any;
  tooltip2: any;
  focus: any;
  contex: any;
  gb: any;
  x2: any;
  y2: any;
  g: any;
  newx: any;
  newy: any;
  newXAxis: any;
  newYAxis: any;
  div: any;

  createXY() {
    this.x = d3
      .scaleLinear()
      .domain([
        d3.min(this.data, (d: any) => d.start),
        d3.max(this.data, (d: any) => d.end)
      ])
      .range([0, this.width - this.margin.left - this.margin.right]);

    this.y = d3
      .scaleBand()
      .domain(
        this.data.map(function(d: any) {
          return d.age;
        })
      )
      .range([0, this.height])
      .padding(0.2);
    this.y2 = d3
      .scaleBand()
      .domain(
        this.data.map(function(d: any) {
          return d.age;
        })
      )
      .range([0, this.focusHeight])
      .padding(0.2);
  }
  axisTop: any;
  axisTop2: any;
  axisLeft: any;
  axisLeft2: any;
  axisBottom: any;
  gView: any;

  createAxises() {
    this.axisTop = d3.axisTop(this.x);
    this.axisTop2 = d3.axisTop(this.x);
    this.axisLeft = d3.axisLeft(this.y);
    this.axisLeft2 = d3.axisLeft(this.y2).tickPadding(2);
    //.tickFormat(formatDate)

    this.axisBottom = d3.axisBottom(this.x).tickPadding(2);
    //.tickFormat(formatDate)
  }

  mounted() {
    this.createXY();
   
    const colour:any= d3.scaleOrdinal()
    .domain(d3.map(this.data, function(d:any){return d.id;})
    .keys())
    .range(d3.schemeCategory10);
    
    this.data.forEach( data => data.color =  colour(data.id))





    this.data = this.data.map(function(d:any){
      if (d.end - d.start < 20){
        d.text = d.id.substring(0,1)+"..."
      }
      else
        d.text = d.id

      if (d.color == "#1f77b4")
        d.color = "#47a8dc"
      if (d.color == "#17becf")
        d.color = "#3ed0da"
      
      return d})

    const regions = d3
      .nest()
      .key((d: any) => d.age)
      .entries(this.data)
      .map(d => d.key);
    const color = d3.scaleOrdinal(d3.schemeSet2).domain(regions);

    this.createAxises();

    this.filteredData = this.data.sort((a: any, b: any) => a.start - b.start);

    this.parent = document.createElement("div");

    //CREATE FOCUS RELATED ELEMENTS

    this.svg = d3
      .select("#Events")
      .append("svg")
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom);

    this.focus = this.svg
      .append("g")
      .attr("class", "focus")
      .attr("transform", "translate(" + 60 + "," + this.margin.top + ")");

    this.focus
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + this.focusHeight + ")")
      .call(this.axisBottom);

    this.focus
      .append("g")
      .attr("class", "y axis")
      .call(this.axisLeft2);

    this.g = this.focus
      .append("g")
      .attr("transform", "translate(" + this.margin.left + "," + 0 + ")");

    this.brush = d3
      .brushX()
      .extent([
        [this.margin.left, 0.5],
        [this.width - this.margin.right, this.focusHeight + 0.5]
      ])
      .on("brush", this.brushed);

    //add zooming
    /*
    this.svg.call(d3.zoom()
    .extent([[0, 0], [this.width, this.height]])
    .scaleExtent([1, 8])
    .on("zoom", this.zoomed));
    */

    this.groups = this.g
      .selectAll("g")
      .data(this.filteredData)
      .enter()
      .append("g")
      .attr("class", "civ1");
    //this.line = this.focus.append("line").attr("y1", this.margin.top-10).attr("y2", this.focusHeight-this.margin2.bottom).attr("stroke", "black").style("pointer-events","none");

    //this.groups.attr("transform", (d:any,i:any)=>`translate(0 ${this.y(i)})`);
    this.groups.attr(
      "transform",
      (d: any, i: any) => `translate(0,${this.y2(d.age)})`
    );

    this.tooltip = d3
      .select(document.createElement("div"))
      .call(this.createTooltip);
    this.tooltip2 = d3
      .select("#Events")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    this.div = d3
      .select("#Events")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    /*
    this.focus.on("mousemove", (d:any)=> {

      let [x,y] = d3.mouse(d3.event.currentTarget);
      this.line.attr("transform", `translate(${x} 0)`);
      y +=20;
      if(x>this.width/2) x-= 0;

      this.tooltip
        .style("left", x + "px")
        .style("top", y + "px")
    });*/

    //.attr("transform", (d,i)=>`translate(0 ${this.y(i)})`)

    this.contex = this.svg
      .append("g")
      .attr("class", "context")
      .attr("transform", "translate(" + 60 + "," + this.margin.top  + ")");

    this.contex
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + this.height + ")")
      .call(this.axisBottom);
      

    this.contex
      .append("g")
      .attr("class", "y axis")
      .call(this.axisLeft);

    this.gView = this.focus
      .append("g")
      .attr("transform", "translate(" + this.margin.left + "," + 80 + ")");

    this.groupsView = this.gView
      .selectAll("g")
      .data(this.filteredData)
      .enter()
      .append("g")
      .attr("class", "civ");

    //this.groups.attr("transform", (d:any,i:any)=>`translate(0 ${this.y(i)})`);
    this.groupsView.attr(
      "transform",
      (d: any, i: any) => `translate(0,${this.y(d.age)})`
    );

    this.groups.each(this.getRect);

    this.groupsView
      .each(this.getRectView)
      .attr("pointer-events", "all")
      .on("click", (d: any) => {
        this.div
          .transition()
          .duration(200)
          .style("opacity", 0.9);
        this.div
          .html(this.getTooltipContent(d))
          .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY - 28 + "px");
      })
      .on("mouseover", (d: any, i: any, n: any) => {
        d3.select(n[i])
          .select("rect")
          .attr("fill", this.LightenDarkenColor(d.color, -20));
      })
      .on("mouseleave", (d: any, i: any, n: any) => {
        d3.select(n[i])
          .select("rect")
          .attr("fill", d.color);
        this.div.style("opacity", 0);
      });

    this.gb = this.focus
      .append("g")
      .call(this.brush)
      .call(this.brush.move, [300, 400]);
  }
}
