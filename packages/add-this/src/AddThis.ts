/* global PUB_ID */
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AddThis extends Vue {
  private pubid = PUB_ID;
}
