import { QDialog } from "quasar";

export default {
  name: "DialogSample",
  inheritAttrs: false,
  props: {
    value: [Object, String, Boolean]
  },
  data() {
    return {};
  },
  render(h) {
    return h(
      QDialog,
      {
        props: this.$props,
        attrs: this.$attrs
      },
      this.$slot
    );
  }
};
