<template>
  <q-page padding class="row justify-center">
    <q-search v-model="terms" placeholder="Start typing a country name">
      <q-autocomplete @search="search" @selected="selected" />
    </q-search>
    <div v-if="false" style="width: 500px; max-width: 90vw;">
      <p class="caption">Click on names & calories cells.</p>
      <q-table
        v-if="false"
        ref="dataTable"
        :data="tableData"
        :columns="columns"
        row-key="__index"
      >
        <q-tr slot="body" slot-scope="props" :props="props">
          <q-td key="desc" :props="props">
            {{ props.row.name }}
            <q-popup-edit
              v-model="props.row.name"
              :ref="'pe-' + props.key"
              @show="shown(props, props.cols[0].label);"
              @hide="hidden(props.row);"
              @save="saveName($event, $refs['pe-' + props.key], props);"
              @cancel="canceled($refs['pe-' + props.key]);"
            >
              <q-field count> <q-input v-model="props.row.name" /> </q-field>
            </q-popup-edit>
          </q-td>
          <q-td key="calories" :props="props">
            {{ props.row.calories }}
            <q-popup-edit
              v-model="props.row.calories"
              title="Update calories"
              buttons
              v-close-overlay
              @save="caloriePopupEditHidden(props);"
              @show="caloriePopupEditShown(props);"
              @hide="caloriePopupEditHidden(props);"
            >
              <q-input type="number" v-model="props.row.calories" />
            </q-popup-edit>
          </q-td>
          <q-td
            key="fat"
            :props="props"
            class="cursor-pointer"
            @click.native="openModal(props, props.cols[2]);"
            >{{ props.row.fat }}</q-td
          >
          <q-td key="carbs" :props="props">{{ props.row.carbs }}</q-td>
          <q-td key="protein" :props="props">{{ props.row.protein }}</q-td>
          <q-td key="sodium" :props="props">{{ props.row.sodium }}</q-td>
          <q-td key="calcium" :props="props">{{ props.row.calcium }}</q-td>
          <q-td key="iron" :props="props">{{ props.row.iron }}</q-td>
        </q-tr>
      </q-table>
      <div>{{ message }}</div>
    </div>
    <q-modal ref="editModal" v-model="opened" minimized>
      <div class="q-pa-md">
        <q-input
          ref="modalContent"
          v-model="toBeEdited"
          @input="updateRowValue"
          @keyup.enter="
            alert('1st');
            saveVal();
            $refs.editModal.hide();
          "
        ></q-input>
      </div>
    </q-modal>

    <div class="q-ma-md" ref="yourDataTable">
      <q-table
        ref="dataTable"
        :data="tableData"
        :columns="columns"
        row-key="__index"
      >
        <q-tr slot="body" slot-scope="props" :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
            <q-popup-edit
              v-model="props.row[col.field]"
              buttons
              label-set="Ok"
              label-cancel="Cancelar"
            >
              <q-input
                hide-underline
                class="bg-blue-1"
                v-model="props.row[col.field]"
                @input="sumatori(props.row);"
              />
            </q-popup-edit>
          </q-td>
        </q-tr>
      </q-table>
    </div>
  </q-page>
</template>
<script>
import tableData from "../assets/table-data";
import countries from "../assets/autocomplete.json";
export default {
  data() {
    return {
      toBeEdited: "",
      oldValBeforeEdit: "",
      rowToUpdate: {},
      opened: false,
      tableData,
      oldValue: "",
      newValue: "",
      row: "",
      col: "",
      columns: [
        {
          name: "desc",
          required: true,
          label: "Dessert (100g serving)",
          align: "left",
          field: "name",
          sortable: true
        },
        {
          name: "calories",
          label: "Calories",
          field: "calories",
          sortable: true
        },
        {
          name: "fat",
          label: "Fats",
          field: "fat",
          sortable: true
        }
      ]
    };
  },
  computed: {
    message() {
      return this.oldValue !== this.newValue
        ? `Value at row ${this.row} column ${this.col} has changed from ${
            this.oldValue
          } to ${this.newValue}`
        : "";
    }
  },
  methods: {
    sumatori(row) {
      console.log("sumatori", row);
    },
    saveVal() {
      if (this.oldValBeforeEdit !== this.toBeEdited) {
        this.$refs.dataTable.data[this.rowToUpdate.row][
          this.rowToUpdate.col
        ] = this.toBeEdited;
      }
    },
    alert(e) {
      alert(e);
    },
    canceled(val, initval) {
      console.log("canceled", val);
    },
    updateRowValue(e) {
      console.log(e);
      // console.log("update data", this.rowToUpdate);
      // this.$refs.dataTable.data[this.rowToUpdate.row][this.rowToUpdate.col] = e;
    },
    openModal(data, label) {
      this.oldValBeforeEdit = data.row[label.field];
      console.log("data", data);
      console.log("label", label);
      console.log("modal", this.$refs.editModal);
      this.$refs.editModal.show();
      console.log("content", this.$refs.modalContent);
      this.toBeEdited = data.row[label.field];
      this.rowToUpdate = { row: data.key, col: label.field };
      console.log("datatable", this.$refs.dataTable);
    },
    saveName(e, ref, props) {
      console.log("props", props);
      console.log("e", e);
      console.log("e2", ref);
      this.newValue = props.row.name;
    },
    save(val, initVal) {
      console.log("val", val, "initVal", initVal);
    },
    shown(props, colname) {
      console.log("on show row.name = ", props.row);
      this.oldValue = props.row.name;
      this.row = props.row.__index;
      this.col = colname;
    },
    hidden(row) {
      console.log("on hide row.name = ", row.name);
    },
    caloriePopupEditShown(row) {
      console.log("calorie shown row =", row);
    },
    caloriePopupEditHidden(row) {
      console.log("calorie hidden row =", row);
    }
  }
};
</script>
