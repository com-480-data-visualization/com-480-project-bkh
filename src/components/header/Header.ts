import { Component, Vue } from "vue-property-decorator";
import $ from "jquery";

class HeaderItem {
  name: string;
  ref: string;
  constructor(name: string, ref: string) {
    this.ref = ref;
    this.name = name;
  }
}

@Component
export default class Header extends Vue {
  headerItems: Array<HeaderItem> = [];

  constructor() {
    super();
    this.headerItems.push(new HeaderItem("smth", "#"));
    this.headerItems.push(new HeaderItem("Map", "#MapAnchor"));
    this.headerItems.push(new HeaderItem("smth", "#"));
  }

  itemClicked(item: HeaderItem) {
    //var target = this.hash;
    const target = $(item.ref);
    const offset = target.offset()?.top;
    if (offset) {
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: offset - 72
          },
          900,
          "swing",
          function() {
            //window.location.hash = target;
          }
        );
    }
  }
}
