import { Component, Vue } from "vue-property-decorator";
import * as d3 from "d3";
import * as turf from "@turf/turf";
import $ from "jquery";
import Typeahead from "../typeahead/Typeahead.vue";

import { GeoProjection, GeoPath, GeoPermissibleObjects } from "d3";
import {
  calcRandomPoint,
  generateDistribution,
  selectRandomTriangleFromDistribution
} from "./Helper";

@Component({
  components: {
    Typeahead
  }
})
export default class LotrMap extends Vue {
  svg!: d3.Selection<any, any, HTMLElement, any>;
  path!: GeoPath<any, GeoPermissibleObjects>;
  myProjection!: GeoProjection;
  def!: d3.Selection<any, any, HTMLElement, any>;
  zoom!: d3.ZoomBehavior<any, any>;

  places: Array<any> = [];

  hobbitTrips: Array<any> = [
    { text: "Bilbo", value: "wp-bilbo", color: " rgba(208,	24,	49, 0.7)" },
    { text: "Thorin", value: "wp-thorin", color: "rgba(185,	2,	138, 0.7)" },
    { text: "Other Dwarfs", value: "wp-dwarfs", color: "rgba(150,	54,	1, 0.7)" },
    {
      text: "Gandalf",
      value: "wp-gandalf-hobbit",
      color: "rgba(68,	74,	230, 0.7)"
    }
  ];
  LotrTrips: Array<any> = [
    {
      text: "Frodo with Sam",
      value: "wp-frodo",
      color: " rgba(208,	24,	49, 0.7)"
    },
    { text: "Aragon", value: "wp-aragorn", color: "rgba(185,	2,	138, 0.7)" },
    {
      text: "Gandalf",
      value: "wp-gandalf-lotr",
      color: "rgba(68,	74,	230, 0.7)"
    },
    {
      text: "Legolas with Gimli",
      value: "wp-legogimli",
      color: "rgba(	73,	51,	63, 0.7)"
    },
    { text: "Merry", value: "wp-merry", color: "rgba(	238,	93,	21, 0.7)" },
    { text: "Pippin", value: "wp-pippin", color: "rgba(	254,	75,	135, 0.7)" },
    { text: "Boromir", value: "wp-boromir", color: "rgba(150,	54,	1, 0.7)" }
  ];

  hobbitTripsSelected: Array<string> = [];
  LotrTripsSelected: Array<string> = [];

  selectTrip() {
    Vue.nextTick(() => {
      this.changeTripsDisplay(this.hobbitTrips, this.hobbitTripsSelected);

      this.changeTripsDisplay(this.LotrTrips, this.LotrTripsSelected);
    });
  }

  changeTripsDisplay(trips: Array<any>, selectedTrips: Array<any>) {
    for (const trip of trips) {
      if (selectedTrips.indexOf(trip.value) != -1) {
        $("." + trip.value).css({ stroke: trip.color });
        $("." + trip.value).show();
      } else {
        let selector = "." + trip.value;
        for (const selected of selectedTrips)
          selector += ":not(." + selected + ")";
        $(selector).hide();
      }
    }
  }
  selectPlace(place: any) {
    const centroid = this.path.centroid(place as GeoPermissibleObjects);
    let x = centroid[0];
    let y = centroid[1];

    let k = 0;
    if (place.properties.zoom == 1) {
      k = 4;
    } else if (place.properties.zoom == 2) {
      k = 6;
    } else if (place.properties.zoom == 3) {
      k = 30;
    } else if (place.properties.zoom == 4) {
      k = 40;
    } else {
      k = 50;
    }

    const height = $("#mapsvg").height();
    const width = $("#mapsvg").width();

    if (height && width) {
      x = x - width / 7;
      y = y - height / 5;
      const transform = d3.zoomIdentity
        .translate(width / 2, height / 2)
        .scale(k)
        .translate(-x, -y);

      (d3.select("#mapsvg") as any).call(this.zoom.transform, transform);
    }
  }
  drawLayer(features: GeoPermissibleObjects[], className: string) {
    const container = this.svg.append("g");
    const i = 0;
    container
      .selectAll("path")
      .data(features)
      .enter()
      .append("path")
      .attr("d", x => this.path(x as GeoPermissibleObjects))
      .attr("class", className);
  }

  drawTrips(features: GeoPermissibleObjects[]) {
    const featureSplitted: GeoPermissibleObjects[] = [];
    for (const feature of features) {
      const events = (feature as any).properties.eventname.split(" ");
      for (const event of events) {
        const newObject = JSON.parse(JSON.stringify(feature));
        newObject.properties.eventname = event;
        featureSplitted.push(newObject);
      }
    }
    const container = this.svg.append("g");
    const i = 0;
    container
      .selectAll("path")
      .data(featureSplitted)
      .enter()
      .append("path")
      .attr("d", x => this.path(x as GeoPermissibleObjects))
      .attr("class", (x: any) => "trip " + x.properties.eventname);

    $(".trip").hide();
  }

  drawMap() {
    this.def = d3.select("#mapsvg").select("defs");

    this.svg = d3.select("#viewbox");

    const transform = d3.zoomIdentity.translate(-5300, 0).scale(2.5);

    this.zoom = d3
      .zoom()
      .scaleExtent([2.5, 54])
      .translateExtent([
        [700, 0],
        [6700, 4600]
      ])
      .on("zoom", this.zoomed);

    (d3.select("#mapsvg") as any)
      .call(this.zoom)
      .call(this.zoom.transform, transform);

    d3.json(process.env.VUE_APP_PUBLIC_PATH + "/lotr_bg.geo.json").then(bg => {
      this.myProjection = d3
        .geoEquirectangular()
        .translate([0, 0])
        .scale(8400000);

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

          this.drawTrips(x[1].features);

          this.places = x[5].features;

          this.places.map((z: any) => {
            let text = z.properties.name_EN.trim();
            if (
              (text[1] === " " && text[3] === " ") ||
              (text[1] === " " && text[2] === " ")
            ) {
              text = text.replace(/\s/g, "").toLowerCase();
              text = text.charAt(0).toUpperCase() + text.slice(1);
            }
            z.nameEnNormalized = text;
          });

          const result = [];
          const map = new Map();
          for (const item of this.places) {
            if (!map.has(item.nameEnNormalized)) {
              map.set(item.nameEnNormalized, true); // set any value to Map
              result.push(item);
            }
          }

          this.places = result;

          const container = d3.select("defs").append("g");
          container
            .selectAll("path")

            .data(x[5].features)
            .enter()
            .append("path")
            .attr("d", x => this.path(x as GeoPermissibleObjects))
            .attr("id", (x: any) => x.properties.id);

          const container1 = this.svg.append("text");
          container1
            .selectAll("textPath")

            .data(x[5].features)
            .enter()
            .append("textPath")
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
          for (const point of points) {
            this.svg
              .append("use")
              .attr("x", point[0] - picWidth / 2)
              .attr("y", point[1] - picHeight / 2)
              .attr("width", picWidth)
              .attr("height", picHeight)
              .attr("xlink:href", "#" + picName);
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

      const limit = area / 1.30406207e-9;
      const dist = generateDistribution(ar);
      for (let i = 0; i < limit; i += 1) {
        const tr = ar[selectRandomTriangleFromDistribution(dist)];
        const point = this.myProjection(calcRandomPoint(tr));
        if (point) points.push(point);
      }

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
    this.drawMap();

    this.mapResize();
    $(window).resize(() => {
      this.mapResize();
    });
  }

  mapResize() {
    const svgContainer = $("#mapsvg");
    const width = svgContainer.width();
    const height = svgContainer.height();
    if (width && height) {
      const aspect = width / height;
      const container = svgContainer.parent();
      const svg = d3.select("#mapsvg");

      const targetWidth = container.width();

      if (targetWidth) {
        svg.attr("width", targetWidth);
        svg.attr("height", Math.round(targetWidth / aspect));
      }
      if (this.myProjection)
        this.myProjection.translate([width / 2, height / 2]).scale(width);
    }
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
  zoomIn() {
    this.zoom.scaleBy(
      d3
        .select("#mapsvg")
        .transition()
        .duration(750),
      1.2
    );
  }
  zoomOut() {
    this.zoom.scaleBy(
      d3
        .select("#mapsvg")
        .transition()
        .duration(750),
      0.8
    );
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
}
