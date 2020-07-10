import { Component, Vue } from "vue-property-decorator";
import BlogInfo from "@BlogInfo";
import BlogPage from "@BlogPage";
import Common from "@theme/components/Common.vue";
import Home from "@theme/components/Home.vue";
import Page from "@theme/components/Page.vue";

// eslint-disable-next-line @typescript-eslint/naming-convention
@Component({ components: { BlogInfo, BlogPage, Common, Home, Page } })
export default class Layout extends Vue {}
