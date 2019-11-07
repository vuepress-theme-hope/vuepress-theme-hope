<script>
export default {
  functional: true,
  props: {
    type: {
      type: String,
      default: 'tip'
    },
    text: {
      type: String,
      default: ''
    },
    vertical: {
      type: String,
      default: 'top'
    },
    color: {
      type: String,
      default: ''
    }
  },
  render(h, { props, slots }) {
    const options = {
      class: ['badge', props.type],
      style: { verticalAlign: props.vertical }
    };

    if (props.color) {
      options.class.push('diy');
      options.style.backgroundcolor = props.color;
      options['data-color'] = props.color;
    }

    return h('span', options, props.text || slots().default);
  }
};
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
    background-color #DA5961 // #f66

  &.warning, &.warn, &.yellow
    background-color darken(#ffe564, 35%)

  &.grey
    background-color #C2CBD2

  & + &
    margin-left 5px
</style>
