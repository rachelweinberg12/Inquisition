export default {
  props: {
    tag: Object,
  },
  template: `
    <button class='option' :class='{include: (tag.pref===1), exclude: (tag.pref===0)}' @click='tag.pref = (tag.pref + 1)%3'>
        {{ tag.name }}
    </button>
    `,
};
