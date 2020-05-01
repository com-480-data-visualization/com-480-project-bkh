import { Component, Vue } from "vue-property-decorator";
import * as d3 from "d3";
import * as turf from "@turf/turf";
import $ from "jquery";

import { GeoProjection, GeoPath, GeoPermissibleObjects } from "d3";
import {
  calcRandomPoint,
  generateDistribution,
  selectRandomTriangleFromDistribution
} from "./Helper";

@Component
export default class Map extends Vue {
  svg!: d3.Selection<any, any, HTMLElement, any>;
  path!: GeoPath<any, GeoPermissibleObjects>;
  myProjection!: GeoProjection;
  def!: d3.Selection<any, any, HTMLElement, any>;

  drawLayer(features: GeoPermissibleObjects[], className: string) {
    const container = this.svg.append("g");
    const i = 0;
    container
      .selectAll("path")
      .data(features)
      .enter()
      .append("path")
      .attr("d", x => this.path(x as GeoPermissibleObjects))
      //.attr("id", x => { i++; return i;})
      .attr("class", className);
    //.attr("filter", "url(#mid-sepia)");
    // .attr("stroke-miterlimit",10)
    // .attr("stroke-width",1);
  }

  drawMap() {
    this.def = d3.select("#mapsvg").select("defs");

    this.svg = d3.select("#viewbox");

    const zoom = d3
      .zoom()
      .scaleExtent([1, 54])
      .translateExtent([
        [0, 0],
        [7850 - 300, 11200]
      ])
      .on("zoom", this.zoomed);

    this.svg.call(zoom);

    this.svg = this.svg
      .append("g")
      .attr("transform", "translate(0,0) scale(1)");

    d3.json(process.env.VUE_APP_PUBLIC_PATH + "/lotr_bg.geo.json").then(bg => {
      this.myProjection = d3
        .geoEquirectangular()
        .translate([0, 0])
        .scale(8400000);
      // this.myProjection.fitSize([width, height], bg);
      this.path = d3.geoPath().projection(this.myProjection);

      const promises = [
        d3.json(process.env.VUE_APP_PUBLIC_PATH + "/lotr_land.geo.json"),
        d3.json(process.env.VUE_APP_PUBLIC_PATH + "/lotr_trips.geo.json"),
        d3.json(process.env.VUE_APP_PUBLIC_PATH + "/lotr_forests.geo.json"),
        d3.json(process.env.VUE_APP_PUBLIC_PATH + "/lotr_rivers.geo.json"),
        d3.json(process.env.VUE_APP_PUBLIC_PATH + "/lotr_mountains.geo.json"),
        d3.json(process.env.VUE_APP_PUBLIC_PATH + "/lotr_text.geo.json"),
        d3.json(process.env.VUE_APP_PUBLIC_PATH + "/lotr_lake.geo.json"),
        d3.json(process.env.VUE_APP_PUBLIC_PATH + "/lotr_roads.geo.json"),
        d3.json(process.env.VUE_APP_PUBLIC_PATH + "/lotr_cities.geo.json"),
        d3.json(process.env.VUE_APP_PUBLIC_PATH + "/lotr_peaks.geo.json"),
        d3.json(process.env.VUE_APP_PUBLIC_PATH + "/lotr_castles.geo.json")
      ];
      Promise.all(promises).then(x => {
        this.drawLayer(x[0].features, "land");
        // this.drawLayer(x[4].features, "mountain");
        // this.drawLayer(x[2].features, "forest");

        const biomePromises = [
          this.fillBiome(x[4].features, 80, 80, 20, 20, "relief-mount-6"),
          this.fillBiome(x[2].features, 120, 120, 20, 20, "relief-deciduous-1")
        ];

        Promise.all(biomePromises).then(() => {
          this.drawLayer(x[3].features, "river");
          this.drawLayer(x[6].features, "lake");
          this.drawLayer(x[7].features, "road");
          this.drawCities(x[8].features);
          this.drawPeaks(x[9].features);
          this.drawCastles(x[10].features);

          this.drawLayer(x[1].features, "trip");

          const container = d3.select("defs").append("g");
          container
            .selectAll("path")

            .data(x[5].features)
            .enter()
            .append("path")
            .attr("d", x => this.path(x as GeoPermissibleObjects))
            .attr("id", (x: any) => x.properties.id);

          //.attr("fill", "red")

          const container1 = this.svg.append("text");
          container1
            .selectAll("textPath")

            .data(x[5].features)
            .enter()
            .append("textPath")
            //.attr("class", "text")
            .attr("class", function(d: any) {
              return (
                "text zoom" +
                d.properties.zoom +
                " " +
                " colorof" +
                d.properties.colorof
              );
            })
            .attr("href", (x: any) => "#" + x.properties.id)
            .append("tspan")
            .attr("font-size", (x: any) => x.properties.size_EN * 1.3)
            .text(function(d: any) {
              return d.properties.name_EN;
            });

          $(".zoom2").hide();
          $(".zoom3").hide();
          $(".zoom4").hide();
          $(".zoom5").hide();
        });

        //       bar.append("text")
        // .attr("x", function(d) { return x(d) - 3; })
        // .attr("y", barHeight / 2)
        // .attr("dy", ".35em")
        // .text(function(d) { return d; });
      });
    });
  }

  async fillBiome(
    features: GeoPermissibleObjects[],
    picWidth: number,
    picHeight: number,
    picOverlapWidth: number,
    picOverlapHeight: number,
    picName: string
  ) {
    const promises = [];
    for (const feature of features) {
      promises.push(
        this.generateRandomPointInsidePolygon(
          feature,
          picOverlapWidth,
          picOverlapHeight
        ).then(points => {
          //console.log("points");

          //console.log(points);
          for (const point of points) {
            //const projected = this.myProjection(point);
            //if (projected)
            this.svg
              .append("use")
              .attr("x", point[0] - picWidth / 2)
              .attr("y", point[1] - picHeight / 2)
              .attr("width", picWidth)
              .attr("height", picHeight)
              .attr("xlink:href", "#" + picName);
            //.attr("filter", "url(#pencilTexture4");
            //        <use xlink:href="#relief-mount-6" width="40" height="40"></use>
          }
        })
      );
    }
    await Promise.all(promises);
  }

  async generateRandomPointInsidePolygon(
    polygon: any,
    picOverlapWidth: number,
    picOverlapHeight: number
  ) {
    const area = d3.polygonArea(polygon.geometry.coordinates[0]);

    const promise = new Promise<Array<[number, number]>>((resolve, reject) => {
      let points: Array<[number, number]> = [];

      const triangles = turf.tesselate(polygon);
      const ar: Array<[turf.Position, turf.Position, turf.Position]> = [];

      for (let i = 0; i < triangles.features.length; i += 1) {
        const el = triangles.features[i];
        if (el.geometry)
          ar.push([
            el.geometry?.coordinates[0][0],
            el.geometry?.coordinates[0][1],
            el.geometry?.coordinates[0][2]
          ]);
      }

      // let limit = 30;
      // if (area >= 0.000002) limit = 300;
      const limit = area / 1.30406207e-9;
      const dist = generateDistribution(ar);
      for (let i = 0; i < limit; i += 1) {
        const tr = ar[selectRandomTriangleFromDistribution(dist)];
        const point = this.myProjection(calcRandomPoint(tr));
        if (point) points.push(point);
      }

      // const res = this.myProjection.invert([picWidth, picHeight])
      // picWidth = 0.00023
      // picHeight = 0.00015
      // console.log(res)

      for (let i = 0; i < points.length; i++) {
        points = points.filter(
          x =>
            points[i] == x ||
            !this.rectanglesIntersect(
              points[i][0],
              points[i][1],
              points[i][0] + picOverlapWidth,
              points[i][1] + picOverlapHeight,
              x[0],
              x[1],
              x[0] + picOverlapWidth,
              x[1] + picOverlapHeight
            )
        );
      }

      resolve(points);
    });

    return promise;
  }

  public rectanglesIntersect(
    minAx: number,
    minAy: number,
    maxAx: number,
    maxAy: number,
    minBx: number,
    minBy: number,
    maxBx: number,
    maxBy: number
  ) {
    const aLeftOfB = maxAx < minBx;
    const aRightOfB = minAx > maxBx;
    const aAboveB = minAy > maxBy;
    const aBelowB = maxAy < minBy;

    return !(aLeftOfB || aRightOfB || aAboveB || aBelowB);
  }

  mounted() {
    const height = 1500;
    const width = 1500;
    this.drawMap();
  }

  g: any;

  zoomed() {
    const zoombuttonScale = d3.event.transform.k;
    this.svg
      // .transition()
      // .duration(500)
      .attr("transform", d3.event.transform);

    this.observeZoomingVisibility(".zoom1", 1, 4, zoombuttonScale);
    this.observeZoomingVisibility(".zoom2", 1.5, 8, zoombuttonScale);
    this.observeZoomingVisibility(".zoom3", 4, 54, zoombuttonScale);
    this.observeZoomingVisibility(".zoom4", 9, 54, zoombuttonScale);
    this.observeZoomingVisibility(".zoom5", 30, 54, zoombuttonScale);
  }

  observeZoomingVisibility(
    className: string,
    fromScale: number,
    toScale: number,
    zoombuttonScale: number
  ) {
    const state = $(className).css("display") == "none";
    if (zoombuttonScale >= fromScale && zoombuttonScale <= toScale) {
      if (state == true) {
        $(className).show();
      }
    } else {
      if (state == false) {
        $(className).hide();
      }
    }
  }

  drawCities(features: GeoPermissibleObjects[]) {
    const tempdefs = this.def.append("g").attr("id", "defs_city");
    tempdefs
      .append("pattern")
      .attr("id", "pattern_city0")
      .attr("width", "1.0")
      .attr("height", "1.0")
      .append("image")
      .attr("xlink:href", process.env.VUE_APP_PUBLIC_PATH + "/city.svg")
      .attr("width", 1.0)
      .attr("height", 1.0)
      .attr("x", 0)
      .attr("y", 0);
    tempdefs
      .append("pattern")
      .attr("id", "pattern_city1")
      .attr("width", "2")
      .attr("height", "2")
      .append("image")
      .attr("xlink:href", process.env.VUE_APP_PUBLIC_PATH + "/city.svg")
      .attr("width", 2)
      .attr("height", 2)
      .attr("x", 0)
      .attr("y", 0);
    tempdefs
      .append("pattern")
      .attr("id", "pattern_city2")
      .attr("width", "4")
      .attr("height", "4")
      .append("image")
      .attr("xlink:href", process.env.VUE_APP_PUBLIC_PATH + "/city.svg")
      .attr("width", 4)
      .attr("height", 4)
      .attr("x", 0)
      .attr("y", 0);
    tempdefs
      .append("pattern")
      .attr("id", "pattern_city3")
      .attr("width", "6")
      .attr("height", "6")
      .append("image")
      .attr("xlink:href", process.env.VUE_APP_PUBLIC_PATH + "/city.svg")
      .attr("width", 6)
      .attr("height", 6)
      .attr("x", 0)
      .attr("y", 0);

    this.svg
      .append("g")
      .attr("id", "point_city")
      .selectAll("path")
      .data(features)
      .enter()
      .append("path")
      .attr("class", function(d: any) {
        return "zoom" + d.properties.zoom;
      })
      .attr(
        "d",
        this.path.pointRadius((d: any) => {
          switch (d.properties.size) {
            case 0:
              return 0.5;
            case 1:
              return 1.0;
            case 2:
              return 2.0;
            case 3:
              return 3.0;
            default:
              return 0;
          }
        })
      )
      .attr("fill", (d: any) => {
        switch (d.properties.size) {
          case 0:
            return "url(#pattern_city0)";
          case 1:
            return "url(#pattern_city1)";
          case 2:
            return "url(#pattern_city2)";
          case 3:
            return "url(#pattern_city3)";
          default:
            return "";
        }
      });
  }

  drawPeaks(features: GeoPermissibleObjects[]) {
    const tempdefs = this.def.append("g").attr("id", "defs_peaks");
    tempdefs
      .append("pattern")
      .attr("id", "pattern_peak1")
      .attr("width", "2")
      .attr("height", "2")
      .append("image")
      .attr("xlink:href", process.env.VUE_APP_PUBLIC_PATH + "/peak.svg")
      .attr("width", 2)
      .attr("height", 2)
      .attr("x", 0.5)
      .attr("y", 0.5);
    tempdefs
      .append("pattern")
      .attr("id", "pattern_peak2")
      .attr("width", "4")
      .attr("height", "4")
      .append("image")
      .attr("xlink:href", process.env.VUE_APP_PUBLIC_PATH + "/peak.svg")
      .attr("width", 4)
      .attr("height", 4)
      .attr("x", 1)
      .attr("y", 0.5);
    tempdefs
      .append("pattern")
      .attr("id", "pattern_peak3")
      .attr("width", "6")
      .attr("height", "6")
      .append("image")
      .attr("xlink:href", process.env.VUE_APP_PUBLIC_PATH + "/peak.svg")
      .attr("width", 6)
      .attr("height", 6)
      .attr("x", 1)
      .attr("y", 1);
    this.svg
      .append("g")
      .attr("id", "point_peak")
      .selectAll("path")
      .data(features)
      .enter()
      .append("path")
      .attr("class", (d: any) => {
        return "zoom" + d.properties.zoom;
      })
      .attr(
        "d",
        this.path.pointRadius((d: any) => {
          switch (d.properties.size) {
            case 1:
              return 1.5;
            case 2:
              return 3.0;
            case 3:
              return 4.0;
            default:
              return 0;
          }
        })
      )
      .attr("fill", (d: any) => {
        switch (d.properties.size) {
          case 1:
            return "url(#pattern_peak1)";
            break;
          case 2:
            return "url(#pattern_peak2)";
            break;
          case 3:
            return "url(#pattern_peak3)";
            break;
          default:
            return "";
        }
      });
  }

  drawCastles(features: GeoPermissibleObjects[]) {
    const tempdefs = this.def.append("g").attr("id", "defs_castles");
    tempdefs
      .append("pattern")
      .attr("id", "pattern_castle1")
      .attr("width", "2")
      .attr("height", "2")
      .append("image")
      .attr("xlink:href", process.env.VUE_APP_PUBLIC_PATH + "/castle.svg")
      .attr("width", 2)
      .attr("height", 2)
      .attr("x", 0.5)
      .attr("y", 0.5);
    tempdefs
      .append("pattern")
      .attr("id", "pattern_castle2")
      .attr("width", "4")
      .attr("height", "4")
      .append("image")
      .attr("xlink:href", process.env.VUE_APP_PUBLIC_PATH + "/castle.svg")
      .attr("width", 4)
      .attr("height", 4)
      .attr("x", 1)
      .attr("y", 0.5);
    tempdefs
      .append("pattern")
      .attr("id", "pattern_castle3")
      .attr("width", "6")
      .attr("height", "6")
      .append("image")
      .attr("xlink:href", process.env.VUE_APP_PUBLIC_PATH + "/castle.svg")
      .attr("width", 6)
      .attr("height", 6)
      .attr("x", 1)
      .attr("y", 1);
    this.svg
      .append("g")
      .attr("id", "point_castle")
      .selectAll("path")
      .data(features)
      .enter()
      .append("path")
      .attr("class", (d: any) => {
        return "zoom" + d.properties.zoom;
      })
      .attr(
        "d",
        this.path.pointRadius((d: any) => {
          switch (d.properties.size) {
            case 1:
              return 1.5;
            case 2:
              return 3.0;
            case 3:
              return 4.0;
            default:
              return 0;
          }
        })
      )
      .attr("fill", (d: any) => {
        switch (d.properties.size) {
          case 1:
            return "url(#pattern_castle1)";
          case 2:
            return "url(#pattern_castle2)";
          case 3:
            return "url(#pattern_castle3)";
          default:
            return "";
        }
      });
  }

  //draw cities, fortress, mountains

  // zoomed() {
  //   g
  //     .selectAll('path') // To prevent stroke width from scaling
  //     .attr('transform', d3.event.transform);
  // }
}
