import { Component, Vue } from "vue-property-decorator";

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
    this.headerItems.push(new HeaderItem("smth", "#"));
    this.headerItems.push(new HeaderItem("smth", "#"));
    this.headerItems.push(new HeaderItem("smth", "#"));
  }
}
