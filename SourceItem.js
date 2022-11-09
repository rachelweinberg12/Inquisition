export default {
  props: {
    source: Object,
  },
  template: `
    <button class='option' :class='{include: source.pref, exclude: !source.pref}' @click='source.pref = !source.pref'>
        {{ source.name }}
    </button>
    `,
};
