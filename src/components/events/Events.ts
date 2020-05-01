import { Component, Vue } from "vue-property-decorator";
import * as d3 from "d3";
//let parent = this
@Component
export default class Events extends Vue {

  timelines = ["A","B","C"];
  data = [{ id: "...", start: 0, end: 2, age: 1 , startLabel: "", endLabel: "",color:"#b861ef"},
    { id: "Meneldil", start: 2, end: 158, age: 1 , startLabel: "", endLabel: "",color:"#69b3a2"},
    { id: "Cemendur", start: 158, end: 238, age: 1 , startLabel: "", endLabel: "",color:"#b861ef"},
    { id: "Eärendil ", start: 238, end: 324, age: 1, startLabel: "", endLabel: "" ,color:"#69b3a2"},
    { id: "Anardil", start: 324, end: 411, age: 1, startLabel: "", endLabel: "",color:"#b861ef" },
    { id: "Ostoher", start: 411, end: 491, age: 1, startLabel: "", endLabel: "",color:"#69b3a2" },
    { id: "Rómendacil", start: 491, end: 541, age: 1, startLabel: "", endLabel: "" ,color:"#b861ef"},
    { id: "Turambar", start: 541, end: 667, age: 1, startLabel: "", endLabel: "",color:"#69b3a2" },
    { id: "Atanatar I", start: 667, end: 748, age: 1, startLabel: "", endLabel: "" ,color:"#b861ef"},
    { id: "Siriondil", start: 748, end: 830, age: 2 , startLabel: "", endLabel: "",color:"#69b3a2"},
    { id: "Tarannon", start: 830, end: 913, age: 1, startLabel: "", endLabel: "" ,color:"#b861ef"},
    { id: "...", start: 913, end: 913, age: 1, startLabel: "", endLabel: "" ,color:"#b861ef"}];
    height = 300;
    width  =1500;
    margin = ({top: 30, right: 30, bottom: 30, left: 30});
    x:any;
    y:any;
    filteredData:any;
    parent:any;
    svg:any;
    groups:any;
    g:any;
    line:any;
    getRect (d:any,i:any,n:any){
      const el = d3.select(n[i]);
  
       
      const sx = this.x(d.start);
      console.log(this.x)
   
      const w = this.x(d.end) - this.x(d.start);
      const isLabelRight =(sx > this.width/2 ? sx+w < this.width : sx-w>0);
    
      el.style("cursor", "pointer")
    
      el
        .append("rect")
        .attr("x", sx)
        .attr("height", this.y.bandwidth())
        .attr("width", w)
        .attr("fill", d.color);
    
      el
        .append("text")
        .text(d.id)
        .attr("x",isLabelRight ? sx-5 : sx+w+5)
        .attr("y", 2.5)
        .attr("fill", "black")
        .style("text-anchor", isLabelRight ? "end" : "start")
        .style("dominant-baseline", "hanging");
    };
    createTooltip (el:any) {
      el
        .style("position", "absolute")
        .style("pointer-events", "none")
        .style("top", 0)
        .style("opacity", 0)
        .style("background", "white")
        .style("border-radius", "5px")
        .style("box-shadow", "0 0 10px rgba(0,0,0,.25)")
        .style("padding", "10px")
        .style("line-height", "1.3")
        .style("font", "11px sans-serif")
    };
tooltip:any;
mounted()
{
  this.x = d3.scaleLinear()
      .domain([d3.min(this.data, (d:any) => d.start), d3.max(this.data, (d:any) => d.end)])
      .range([0, this.width - this.margin.left - this.margin.right]);

  this.y= d3.scaleBand()
    .domain(["one"])
    .range([0,this.height - this.margin.bottom - this.margin.top])
    .padding(0.2);
  console.log("Erdem")
  console.log(this.y)
  const regions = d3.nest().key((d:any)=>d.age).entries(this.data).map(d=>d.key);
  const color = d3.scaleOrdinal(d3.schemeSet2).domain(regions);
  const axisTop = d3.axisTop(this.x)
    .tickPadding(2);
    //.tickFormat(formatDate)
 


  const axisBottom = d3.axisBottom(this.x)
    .tickPadding(2)
    //.tickFormat(formatDate)

    this.filteredData = this.data.sort((a:any,b:any)=>  a.start-b.start);

    const parent = document.createElement("div");
    this.svg = d3.select("#Events").append("svg")
        .attr("width", this.width + this.margin.left + this.margin.right)
    .attr("height", this.height + this.margin.top + this.margin.bottom);

   this.g = this.svg.append("g")
    .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

     this.groups = this.g
    .selectAll("g")
    .data(this.filteredData)
    .enter()
    .append("g")
    .attr("class", "civ");
    this.line = this.svg.append("line").attr("y1", this.margin.top-10).attr("y2", this.height-this.margin.bottom).attr("stroke", "rgba(0,0,0,0.2)").style("pointer-events","none");

    //this.groups.attr("transform", (d:any,i:any)=>`translate(${this.y(i)})`);
    this.tooltip = d3.select(document.createElement("div")).call(this.createTooltip);
    function getTooltipContent (d:any) {
      return `<b>${d.id}</b>
      <br/>
      <b style="color:${"#888abf"}">${d.region}</b>
      <br/>
      ${d.start} - ${d.end}
      `
      };
    this.groups
    .each((this.getRect))
    .on("mouseover", (d:any,i:any,n:any) =>{
    d3.select(n[i]).select("rect").attr("fill", "#888abf")

    this.tooltip
        .style("opacity", 1)
        .html(getTooltipContent(d))
        })
        .on("mouseleave", (d:any,i:any,n:any)=> {
          d3.select(n[i]).select("rect").attr("fill", d.color)
          this.tooltip.style("opacity", 0)
    });

 

  
    this.svg
    .append("g")
    .attr("transform", (d:any,i:any)=>`translate(${this.margin.left} ${this.margin.top-10})`)
    .call(axisTop);

    this.svg
      .append("g")
      .attr("transform", (d:any,i:any)=>`translate(${this.margin.left} ${this.height-this.margin.bottom})`)
      .call(axisBottom);
    this.svg.on("mousemove", (d:any)=> {

      let [x,y] = d3.mouse(d3.event.currentTarget);
      this.line.attr("transform", `translate(${x} 0)`);
      y +=20;
      if(x>this.width/2) x-= 100;

      this.tooltip
        .style("left", x + "px")
        .style("top", y + "px")
    });
   
    

}


    
}