<template>
  <div>
    <q-layout>
      <q-list highlight class="bg-white">
        <q-list-header>Details
          <q-btn color="green-5" @click="openAdd">Add New</q-btn>
        </q-list-header>
      </q-list>
    </q-layout>
    <my-dialog v-model="myDialog" @input="myDialog = $event"/>
  </div>
</template>

<script>
import MyDialog from "./QmodalExtension.vue";

export default {
  name: "app",
  components: {
    MyDialog
  },
  data() {
    return {
      layoutStore: {
        view: "lHh Lpr lFf",
        reveal: false,
        leftScroll: true,
        rightScroll: true,
        leftBreakpoint: 996,
        rightBreakpoint: 1200,
        hideTabs: false,
        addActive: ""
      },
      myDialog: false
    };
  },
  methods: {
    openAdd() {
      this.myDialog = true;
    }
  }
};
</script>
<style lang="stylus">
</style>