<template>
  <q-page class="q-ma-md">
    <base-input outlined v-model="form.email" label="Username" normalize-bottom/>
    <q-btn label="show" @click="dialog = true"/>
    <dialog-sample v-model="dialog">
      <div>hey</div>
      </dialog-sample>
  </q-page>
</template>

<script>
import BaseInput from "../../components/BaseInput.js";
import DialogSample from "../../components/DialogSample.js";
export default {
  components: {
    BaseInput,
    DialogSample
  },
  data() {
    return {
      form: {
        email: ""
      },
      dialog: false
    };
  }
};
</script>

<style>
</style>
