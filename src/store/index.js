import Vue from 'vue'
import Vuex from 'vuex'
import auth from "@/store/auth";
import crudDataTable from "@/store/crudDataTable";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    table: null,
    id: null,
    data: null,
    search: null,
  },

  getters: {
    table: state => {
      return state.table
    },

    id: state => {
      return state.id
    },

    data: state => {
      return state.data
    },

    search: state => {
      return state.search
    },

  },

  mutations: {
    get (state, data) {
      state.data = data
    },

    show (state, payload) {
      state.id = payload.id
      state.data = payload.data
    },

    create (state, data) {
      state.data = data
    },
    
    update (state, payload) {
      state.id = payload.id
      state.data = payload.data
    },

    delete (state, payload) {
      state.id = payload.id
      state.data = payload.data
    },

    deleteMultiple (state, payload) {
      state.id = payload.id
      state.data = payload.data
    },

    search (state, text) {
      state.search = text
    },

  },

  actions: {
    get ({ state, commit }, data) {
      // Todo: axios api get (list) actions
      commit('list', data)
    },
    
    show ({ state, commit }, payload) {
      // Todo: axios api show actions
      commit('show', payload)
    },

    create ({ state, commit }, data) {
      // Todo: axios api create actions
      commit('create', data)
    },
    
    update ({ state, commit }, payload) {
      // Todo: axios api update actions
      commit('update', payload)
    },
    
    delete ({ state, commit }, payload) {
      // Todo: axios api delete actions
      commit('delete', payload)
    },
    
    deleteMultiple ({ state, commit }, payload) {
      // Todo: axios api deleteMultiple actions
      commit('delete', payload)
    },
    
    search ({ state, commit }, text) {
      // Todo: axios api search actions
      commit('search', text)
    },

  },

  modules: {
    crudDataTable,
    auth,
  }
})
