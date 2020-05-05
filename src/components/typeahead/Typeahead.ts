import { Component, Vue, Prop, PropSync, Emit } from "vue-property-decorator";
import VueBootstrapTypeahead from "vue-bootstrap-typeahead";

@Component({
  components: {
    VueBootstrapTypeahead
  },
  model: {
    prop: "model",
    event: "update:model"
  }
})
export default class Typeahead extends Vue {
  @Prop({ default: null, type: String })
  searchFieldName!: string;

  @PropSync("model", { type: Array })
  modelVal!: Array<any>;

  searchText = "";

  get searchData() {
    console.log(this.modelVal.map(x => x[this.searchFieldName]));
    return this.modelVal.map(x => x[this.searchFieldName]);
  }

  @Emit()
  select(selectedData: any) {
    const index = this.searchData.indexOf(selectedData);
    return this.modelVal[index];
  }
}
