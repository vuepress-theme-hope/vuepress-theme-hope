<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ComponentOptions } from 'vue';

// Functional Component Hack
interface FunctionalComponentOptions extends ComponentOptions<Vue> {
  functional?: boolean;
}

@Component({
  name: 'MyBadge',
  functional: true,
  render(h, { props, slots }) {
    const options: Record<string, any> = {
      class: ['badge', props.type],
      style: { verticalAlign: props.vertical }
    };

    if (props.color) {
      options.class.push('diy');
      options.style.backgroundColor = props.color;
      options['data-color'] = props.color;
    }

    return h('span', options, props.text || slots().default);
  }
} as FunctionalComponentOptions)
export default class MyBadge extends Vue {
  /** 徽章类型 */
  @Prop({ type: String, default: 'tip' })
  private readonly type!: string;

  /** 徽章文字 */
  @Prop({ type: String, default: '' })
  private readonly text!: string;

  /** 徽章垂直对齐方式 */
  @Prop({ type: String, default: 'top' })
  private readonly vertical!: string;

  /** 徽章颜色 */
  @Prop({ type: String, default: '' })
  private readonly color!: string;
}
</script>

<style lang="stylus" scoped>
.badge
  display inline-block
  font-size 14px
  height 18px
  line-height 18px
  border-radius 3px
  padding 0 6px
  color white
  background-color #42b983

  &.tip, &.green
    background-color #42b983

  &.error
    background-color #DA5961

  &.warning, &.warn, &.yellow
    background-color darken(#ffe564, 35%)

  &.grey
    background-color #C2CBD2

  & + &
    margin-left 5px
</style>
