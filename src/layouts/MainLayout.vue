<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" reveal>
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left"/>

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>Title
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="right = !right"/>
      </q-toolbar>

      <q-tabs>
        <!-- <q-route-tab to="/example-form" label="Example Form" exact/> -->
        <q-route-tab to="/tabs" label="Tabs" exact/>
        <q-route-tab to="/inception" label="Inception" exact/>
        <q-route-tab to="/render" label="Render" exact/>
        <q-route-tab to="/dynamic-table" label="Table" exact/>
        <q-route-tab to="/vuex-data-table" label="Vuex Table" exact/>
        <!-- <q-route-tab to="/extend-samp" label="Extend Sample" exact/> -->
      </q-tabs>
    </q-header>

    <q-drawer v-model="left" side="left" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-drawer v-model="right" side="right" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view/>
      </keep-alive>
    </q-page-container>

    <q-footer elevated reveal>
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>Title
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      left: true,
      right: true
    };
  }
};
</script>