import { QInput, QIcon } from "quasar";
/**
 * Javascript Implementation of Quasar QInput component with Vuelidate form Validation
 * It is specificaly for quasar
 * @author Aldrin Marquez
 * @note if used as a plugin then you need to export this as Vue.extend()
 */
import SingleInputErrorMixin from "./form-validations/SingleInputErrorMixin";
export default {
  name: "BaseInput",
  mixins: [SingleInputErrorMixin],
  inheritAttrs: false,
  props: {
    value: {},
    hideShowPassword: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: () => "text"
    },
    normalizeBottom: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isPwShown: false
    };
  },
  render(h) {
    return h(QInput, {
      props: {
        error: this.val ? this.hasErrors : null,
        errorMessage: this.val ? this.errMessage : null,
        value: this.value,
        type:
          this.type === "password"
            ? this.isPwShown
              ? "text"
              : this.type
            : this.type,
        bottomSlots: this.normalizeBottom || this.hasErrors,
        ...this.$attrs
      },
      on: {
        ...this.$listeners
      },
      scopedSlots: {
        append: () => {
          return this.type === "password" &&
            this.hideShowPassword &&
            this.$scopedSlots.append === void 0
            ? h(QIcon, {
                class: "cursor-pointer relative-position",
                props: {
                  name: this.isPwShown ? "mdi-eye" : "mdi-eye-off"
                },
                on: {
                  click: () => {
                    this.isPwShown = !this.isPwShown;
                  }
                },
                directives: [
                  {
                    name: "ripple",
                    value: true
                  }
                ]
              })
            : null;
        },
        ...this.$scopedSlots
      }
    });
  }
};
