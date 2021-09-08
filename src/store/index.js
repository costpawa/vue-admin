import Vue from 'vue'
import Vuex from 'vuex'
import auth from "@/store/auth";
import crudDataTable from "@/store/crudDataTable";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },

  getters: {
  },

  mutations: {
  },

  actions: {
  },

  modules: {
    crudDataTable,
    auth,
  }
})
