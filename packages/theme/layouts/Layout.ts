import { Component, Vue } from "vue-property-decorator";
import BlogInfo from "@BlogInfo";
import BlogHome from "@BlogHome";
import Common from "@theme/components/Common.vue";
import Home from "@theme/components/Home.vue";
import Page from "@theme/components/Page.vue";

@Component({ components: { BlogInfo, BlogHome, Common, Home, Page } })
export default class Layout extends Vue {}
