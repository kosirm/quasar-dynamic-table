<template>
  <q-layout>
    <q-page-container>
      <q-page class="q-ma-md">
        <p class="caption">Samples</p>
        <q-btn label="home" to="/home" replace icon="home"/>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  mounted () {
    console.log('the Store', this.$store)
  }
};
</script>

<style>
</style>
