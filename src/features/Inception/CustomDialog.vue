<template>
  <div>
    <q-dialog v-model="layout" v-bind="$attrs" ref="cdialog">
      <q-layout view="Lhh lpR fff" container class="bg-white">
        <q-header class="bg-primary">
          <q-toolbar>
            <q-btn flat @click="drawer = !drawer" round dense icon="menu"/>
            <q-toolbar-title>Dialog {{current}}</q-toolbar-title>
            <q-btn flat @click="drawerR = !drawerR" round dense icon="menu"/>
            <q-btn flat v-close-popup round dense icon="close"/>
          </q-toolbar>
        </q-header>

        <q-footer class="bg-black text-white">
          <q-toolbar inset>
            <q-toolbar-title>Footer</q-toolbar-title>
          </q-toolbar>
        </q-footer>

        <q-drawer
          bordered
          v-model="drawer"
          :width="200"
          :breakpoint="600"
          content-class="bg-grey-3 q-pa-sm"
        >
          <div v-for="n in 50" :key="n">Drawer {{ n }} / 50</div>
        </q-drawer>

        <q-drawer
          side="right"
          bordered
          v-model="drawerR"
          :width="200"
          :breakpoint="300"
          content-class="bg-grey-3 q-pa-sm"
        >
          <div v-for="n in 50" :key="n">Drawer {{ n }} / 50</div>
        </q-drawer>

        <q-page-container>
          <q-page padding>
            <q-btn label="Open Another" color="primary" @click="$emit('open-another', current)"/>
            <p v-for="n in contentSize" :key="n">{{ lorem }}</p>
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>
    <slot/>
  </div>
</template>

<script>
export default {
  name: "CustomDialog",
  inheritAttrs: false,
  props: {
    value: {},
    parent: Number
  },
  data() {
    return {
      layout: this.value,
      moreContent: true,
      drawer: false,
      drawerR: false,
      current: this.parent,

      lorem:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, ratione eum minus fuga, quasi dicta facilis corporis magnam, suscipit at quo nostrum!"
    };
  },
  methods: {
    show() {
      console.log("current", this.current);
      this.$refs.cdialog.show();
    }
  },

  computed: {
    contentSize() {
      return this.moreContent ? 150 : 5;
    }
  },
  mounted() {
    console.log("val", this.value, this.$attrs);
    console.log("parent", this.parent);
  }
};
</script>