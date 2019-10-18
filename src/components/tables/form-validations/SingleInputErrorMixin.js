/**
 * Javascript Implementation of the FVFieldValidator component
 * It is specificaly for quasar
 * @author Aldrin Marquez
 * @note if used as a plugin then you need to export this as Vue.extend()
 */
import BaseValidationMixin from "./BaseValidationMixin";
export default {
  mixins: [BaseValidationMixin],
  props: {
    val: {}
  },
  computed: {
    hasErrors() {
      return this.val ? this.val.$error : null;
    },
    errMessage() {
      return this.val ? this.getErrMessage(this.val) : null;
    }
  }
};
