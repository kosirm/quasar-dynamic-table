<template>
  <q-page style="width: 400px; max-width: 90vw;" class="q-pa-md">
    <p class="caption">Tab Panes below (shadow, animated, swipeable)</p>
    <q-card>
      <q-tabs
        align="justify"
        v-model="sampTabs"
        ref="tabs"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        narrow-indicator
      >
        <q-tab name="pik" slot="title" icon="book" label="home"/>
        <q-tab name="pak" slot="title" icon="book" label="home"/>
        <q-tab name="mails" slot="title" icon="mail" label="Email"/>
        <q-tab name="alarms" slot="title" icon="alarm" label="Username"/>
        <q-tab name="movies" slot="title" icon="movie" label="Password"/>
      </q-tabs>
      <q-separator/>
      <q-tab-panels animated v-model="sampTabs">
        <q-tab-panel keep-alive name="pik">PIK!</q-tab-panel>
        <q-tab-panel keep-alive name="pak">PAK!</q-tab-panel>
        <q-tab-panel keep-alive name="mails">
          <q-field
            icon="email"
            :error="errors.has('email')"
            :error-label="errors.first('email')"
            :count="10"
          >
            <q-input
              name="email"
              v-model="email"
              v-validate="'required|email'"
              type="email"
              float-label="Email"
            />
          </q-field>
        </q-tab-panel>
        <q-tab-panel keep-alive name="alarms">
          <q-field
            icon="person"
            :error="errors.has('username')"
            :error-label="errors.first('username')"
            :count="10"
          >
            <q-input
              name="username"
              v-model="username"
              v-validate="'required'"
              type="text"
              float-label="Username"
            />
          </q-field>
        </q-tab-panel>
        <q-tab-panel keep-alive name="movies">
          <q-field
            icon="lock"
            :error="errors.has('password')"
            :error-label="errors.first('password')"
            :count="10"
          >
            <q-input
              name="password"
              v-model="password"
              v-validate="'required|min:4'"
              type="password"
              float-label="Password"
            />
          </q-field>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
    <q-btn class="savebtn" flat label="Simulate Save" @click="save"/>
    <div>{{ dateRefresh }} {{ errors }}</div>
  </q-page>
</template>

<script>
export default {
  name: "model-example",
  data: () => ({
    email: "",
    password: "",
    username: "",
    sampTabs: "",
    dateRefresh: null,
    tabNames: ["pik", "pak", "mails", "alarms", "movies"],
    tab: "samp"
  }),
  methods: {
    // use @change="tabChange" at q-tabs if you
    // want to validate each time you change tab
    // tabChange(val) {
    //   console.log("tab", val);
    //   this.$nextTick(() => {
    //     this.$validator.validate().then(result => {
    //       if (!result) {
    //         console.log("validation result", result);
    //       }
    //     });
    //   });
    // },
    save() {
      this.dateRefresh = new Date();
      this.$validator.validate();
      console.log("errors", this.errors);
    },
    test() {
      let traversal = this.tabNames.reduce((promiseChain, item) => {
        return promiseChain.then(
          () =>
            new Promise(resolve => {
              //setTimeout(() => {
              console.log("done with", item);
              resolve();
              this.$refs.tabs.selectTab(item);
              //}, 0);
            })
        );
      }, Promise.resolve());
      traversal.then(() => {
        console.log("done");
        // go back to first tab
        // you can use selectTab(tabname).
        // calculated value is used in this example
        this.$refs.tabs.go(
          this.tabNames.length - (this.tabNames.length * 2 - 1)
        );
      });
    }
  },
  watch: {
    errors() {
      return this.$validator.errors;
    }
  },
  mounted() {
    this.test();
  }
};
</script>

<style>
.savebtn {
  border: solid 1px;
  max-resolution: 5px;
}
</style>
