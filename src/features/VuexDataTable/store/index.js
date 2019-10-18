import tableData from "../../../assets/sample-data";
import _ from "lodash";

const state = {
  td: tableData
};

const mutations = {
  UPDATE_TABLE: (state, payload) => {
    _.assign(state.td, payload);
  }
};

const actions = {
  updateTable: ({ commit }, payload) => {
    console.log("update", payload);
    commit("UPDATE_TABLE", payload);
  }
};

const getters = {
  getTableData: state => state.td
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
