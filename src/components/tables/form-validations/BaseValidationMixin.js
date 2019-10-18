const replaceAll = (str, find, replace) =>
  str.replace(new RegExp(find, "g"), replace);
export default {
  props: {
    fieldName: String,
    localMessages: Object,
    asyncErrorMessage: {
      type: String,
      default: null
    },
    errorMessages: {
      type: Object,
      default: () => {
        return {
          required: "field is required.",
          minLength: "field requires minimum length of",
          maxLength: "field exceeds maximum length of",
          email: "field is an invalid email."
        };
      }
    }
  },
  methods: {
    replaceAll,
    getErrMessage(val) {
      // console.log('test', val)
      if (!val.$error) return "";
      const filteredVals =
        this.fieldName || Object.keys(val).filter(v => v.startsWith("_$"));
      if (filteredVals.length < 1) {
        return "";
      }
      const fieldname =
        this.fieldName ||
        replaceAll(filteredVals[0].replace("_$", ""), "_", " ");
      const message = this.localMessages || this.errorMessages;
      if (val.hasOwnProperty("required") && !val.required) {
        return `${fieldname} ${message.required}`;
      }
      if (val.hasOwnProperty("maxLength") && !val.maxLength) {
        return `${fieldname} ${message.maxLength} ${
          val.$params.maxLength.max
        }.`;
      }
      if (val.hasOwnProperty("minLength") && !val.minLength) {
        return `${fieldname} ${message.minLength} ${
          val.$params.minLength.min
        }.`;
      }
      if (val.hasOwnProperty("email") && !val.email) {
        return `${fieldname} ${message.email}`;
      }

      // console.log('validating =>', val)
      if (
        this.asyncErrorMessage !== null &&
        this.asyncErrorMessage !== "" &&
        !val.$pending
      ) {
        return this.asyncErrorMessage;
      }
      // if validator not covered on what described above
      // just extract all the message
      // get validator params
      if (Object.keys(message).length) {
        return `${fieldname} ${Object.keys(message)
          .map(v => (val[v] ? message[v] : ""))
          .join(" ")}`;
      }
      // else return an anoymous error message
      return `${fieldname} has invalid value.`;
    }
  }
};
