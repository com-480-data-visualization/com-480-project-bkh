import { Component, Vue } from "vue-property-decorator";
import * as d3 from "d3";
import { timeout } from "d3";

@Component
export default class TimelineNew extends Vue {
  startDate = 0;
  mounted() {
    // const recaptchaScript0 = document.createElement("script");
    // recaptchaScript0.setAttribute(
    //   "src",
    //   "http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"
    // );
    // document.head.appendChild(recaptchaScript0);

    const recaptchaScript = document.createElement("script");
    recaptchaScript.setAttribute(
      "src",
      "https://cdn.knightlab.com/libs/timeline/latest/js/storyjs-embed.js"
    );
    document.head.appendChild(recaptchaScript);

    // const recaptchaScript1 = document.createElement("script");
    // recaptchaScript1.textContent =
    //   `document.addEventListener("DOMContentLoaded", function(event) {
    //     createStoryJS({
    //         type:		'timeline',
    //         width:		'800',
    //         height:		'600',
    //         source:		"` +
    //   process.env.VUE_APP_PUBLIC_PATH +
    //   `/kingsNew.json",
    //         embed_id:	'TimelineNew'
    //     });
    // });`;
    // document.head.appendChild(recaptchaScript1);

    d3.json(process.env.VUE_APP_PUBLIC_PATH + "/kingsNew.json").then(x => {
      const timelineData: any = {
        headline: "Chronology of Kings of Gondor",
        type: "default"
      };
      timelineData.date = [];

      const kings = x.map((y: any) => {
        const event: any = {};
        event.type = "default";
        event.headline = y.name;
        event.startDate = y.start.toString();
        event.endDate = y.end.toString();
        event.text = y.biog;

        event.era = y.era;
        if (y.era === 0) {
          event.tag = "2nd Age";
        } else if (y.era === 1) {
          event.tag = "3rd Age";
        } else if (y.era === 2) {
          event.tag = "4th Age";
        }
        timelineData.date.push(event);
        return event;
      });
      console.log(timelineData);

      timeout(() => {
        (window as any).createStoryJS({
          type: "timeline",
          width: "100%",
          height: "500",
          source: { timeline: timelineData },

          embed_id: "TimelineNew" // eslint-disable-line
        });
      }, 5000);
    });

    // d3.json(process.env.VUE_APP_PUBLIC_PATH + "/kingsNew.json").then(x => {
    //   const kings = x.map((y: any) => {
    //     const event: any = {};
    //     event.title = y.name;
    //     event.dates = [
    //       new Date(y.start + 5000, 0, 1),
    //       new Date(y.end + 5000, 11, 31)
    //     ];
    //     return event;
    //   });
    //   console.log(kings);
    //   const timeline = new Chronoline($("#TimelineNew").get(0), kings, {
    //     markToday: false,
    //     labelFormat: "%Y",
    //     subLabel: null,
    //     subSubLabel: null,
    //     visibleSpan: 86400000 * 366 * 5,
    //     timelinePadding: (86400000 * 366) / 4,
    //     animated: true,
    //     draggable: true,
    //     tooltips: true,
    //     eventAttrs: {
    //       // attrs for the bars and circles of the events
    //       fill: "#ffa44f",
    //       stroke: "#ffa44f",
    //       "stroke-width": 1
    //     },
    //     eventHeight: 10,
    //     hashInterval: function(date: Date) {
    //       return date.getDate() === 1;
    //     },
    //     labelInterval: function(date: Date) {
    //       return date.getMonth() === 0 && date.getDate() === 1;
    //     },
    //     scrollLeft: function(date: Date) {
    //       return new Date(
    //         date.getFullYear() - 1,
    //         date.getMonth(),
    //         date.getDate()
    //       );
    //     },
    //     scrollRight: function(date: Date) {
    //       return new Date(
    //         date.getFullYear() + 1,
    //         date.getMonth(),
    //         date.getDate()
    //       );
    //     }
    //   }); // , {startDate:0, endDate: 3021}
    // });
    //console.log(Chronoline)
    // console.log((window as any))
  }
}
