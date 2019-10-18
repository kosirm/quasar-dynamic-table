<template>
  <q-page class="q-pa-md">
    <q-table
      v-if="data"
      :data="data"
      :columns="columns"
      title="QDataTable with QPopupEdit"
      :rows-per-page-options="[]"
      wrap-cells
      :loading="loading"
      row-key="name"
      selection="multiple"
      :selected.sync="selected"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-checkbox v-model="props.selected"/>
          </q-td>
          <q-td key="desc" :props="props">
            {{ props.row.name }}
            <!-- <q-popup-edit
              v-model="props.row.name"
              @save="(v,i) => { sav(v, i, props.row, 'name'); }"
              @input="callInput"
            >
            <q-input v-model="props.row.name" dense autofocus counter/>-->
            <!-- if you use lazy or the :value prop way you also need to listen
              for the @cancel event to revert the value if you cancel or clicked
            outside of the q-popup-edit-->
            <q-popup-edit
              :value="props.row.name"
              @save="(v,i) => { sav(v, i, props.row, 'name'); }"
              @cancel="(v,i) => { cancelled(v, i, props.row, 'name'); }"
            >
              <q-input
                :value="props.row.name"
                dense
                autofocus
                counter
                @input="v => {props.row.name = v}"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="comment" :props="props">
            {{ props.row.comment }}
            <!-- <q-popup-edit
              v-model="props.row.comment"
              @save="(v,i) => { instSav(v, i, props.row, 'comment'); }"
              buttons
            >
              <q-input
                type="textarea"
                v-model="props.row.comment"
                autofocus
                counter
                @keyup.enter.stop
            />-->
            <q-popup-edit
              :value="props.row.comment"
              @save="(v,i) => { sav(v, i, props.row, 'comment'); }"
              @cancel="(v,i) => { cancelled(v, i, props.row, 'name'); }"
              buttons
            >
              <q-input
                type="textarea"
                :value="props.row.comment"
                @input="v => {props.row.comment = v}"
                autofocus
                counter
                @keyup.enter.stop
              />
            </q-popup-edit>
          </q-td>
          <q-td key="calories" :props="props">
            {{ props.row.calories }}
            <q-popup-edit v-model="props.row.calories">
              <q-input v-model="props.row.calories" dense autofocus/>
            </q-popup-edit>
          </q-td>
          <q-td key="fat" :props="props">
            <div class="text-pre-wrap">{{ props.row.fat }}</div>
            <q-popup-edit v-model="props.row.fat">
              <q-input v-model="props.row.fat" dense autofocus/>
            </q-popup-edit>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-inner-loading :showing="loading">
      <q-spinner color="secondary" size="50px"/>
    </q-inner-loading>
  </q-page>
</template>

<script>
import { mapState } from "vuex";
import _ from "lodash";

export default {
  data() {
    return {
      columns: [
        {
          name: "desc",
          style: "min-width: 160px; width: 160px",
          align: "left",
          label: "Dessert (100g serving)",
          field: "name",
          sortable: true,
        },
        {
          name: "comment",
          style: "min-width: 200px; width: 200px",
          align: "left",
          label: "Comment",
          field: "comment"
        },
        {
          name: "calories",
          align: "center",
          label: "Calories",
          field: "calories"
        },
        { name: "fat", label: "Fat (g)", field: "fat" }
      ],
      loading: false,
      data: null, // local
      popEditShowing: false,
      selected: []
    };
  },
  computed: {
    ...mapState("vuexDataTable", ["td"])
    // updateTable: {
    //   set(val) {
    //     console.log("set", val);
    //     this.$store.commit("vuexDataTable/UPDATE_TABLE", val);
    //     console.log("state changed", this.td);
    //   },
    //   get() {
    //     return _.cloneDeep(this.td);
    //   }
    // }
  },

  watch: {
    // updateTable(newValue) {
    //   console.log("update", newValue);
    //   this.data = newValue;
    // },
    data: {
      deep: true,
      handler(newVal, initVal) {
        console.log("@data=>changed");
      }
    }
  },
  methods: {
    sav(val, initVal, data, colname) {
      this.loading = true;
      // set initial value
      data[colname] = initVal;
      // emulate an api call
      setTimeout(() => {
        // commit changes after 1 second
        data[colname] = val;
        // this.updateTable(this.data)
        this.$store.commit("vuexDataTable/UPDATE_TABLE", this.data);
        console.log("state changed", this.td);
        // this.updateTable = this.data;
        this.loading = false;
      }, 1000);
    },
    cancelled(val, initVal, data, colname) {
      data[colname] = initVal;
      console.log("cancelled", initVal);
    },
    instSav(val, initVal, data, colname) {
      data[colname] = val;
    },
    callInput(val) {
      console.log("callInput", val);
    },
    shown() {
      console.log("popup shown");
    }
  },
  created() {
    console.log("init td values", this.td);
    this.data = _.cloneDeep(this.td);
  }
};
</script>

<style>
</style>
