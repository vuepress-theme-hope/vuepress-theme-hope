import { Component, Mixins } from "vue-property-decorator";
import BlogInfo from "@BlogInfo";
import BlogPage from "@BlogPage";
import Common from "@theme/components/Common.vue";
import MyTransition from "@theme/components/MyTransition.vue";
import PageEncryptMixin from "@theme/util/pageEncryptMixin";
import Password from "@theme/components/Password.vue";

@Component({
  components: {
    BlogInfo,
    BlogPage,
    Common,
    MyTransition,
    Password,
  },
})
export default class Blog extends Mixins(PageEncryptMixin) {}
