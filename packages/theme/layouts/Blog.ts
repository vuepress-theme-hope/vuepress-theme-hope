import { Component, Mixins } from "vue-property-decorator";
import BlogInfo from "@BlogInfo";
import BlogPage from "@BlogPage";
import Common from "@theme/components/Common.vue";
import PageEncryptMixin from "@theme/util/pageEncryptMixin";
import Password from "@theme/components/Password.vue";

@Component({ components: { BlogInfo, BlogPage, Common, Password } })
export default class Blog extends Mixins(PageEncryptMixin) {}
