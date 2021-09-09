import Vue from 'vue'
import Vuex from 'vuex'
import Localbase from 'localbase'
import auth from "@/store/auth";
import crudDataTable from "@/store/crudDataTable";

let db = new Localbase('db')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    table: null,
    id: null,
    data: {},
    datas: [],
    dataIndex: -1,
    headers: {},
    search: null,
    dialog: false,
    dialogDelete: false,
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

    datas: state => {
      return state.datas
    },

    headers: state => {
      return state.headers
    },

    search: state => {
      return state.search
    },

  },

  mutations: {
    table (state, table) {
      state.table = table
    },

    id (state, id) {
      state.id = id
    },

    data (state, data) {
      state.data = data
    },

    headers (state, headers) {
      state.headers = headers
    },

    get (state, datas) {
      state.datas = datas
    },

    show (state, payload) {
      state.id = payload.id
      state.data = payload.data
    },

    create (state, data) {
      state.data = data
      state.dialog = false
    },
    
    edit (state, data) {
      state.data = data
      state.dialog = true
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

    dialog (state) {
      state.dialog = !state.dialog
    },

    dialogDelete (state, id) {
      state.id = id
      state.dialogDelete = !state.dialogDelete
    },

  },

  actions: {
    table ({ commit }, table) {
      // Todo: axios api table actions
      commit('table', table)
    },
    
    id ({ commit }, id) {
      // Todo: axios api item actions
      commit('id', id)
    },
    
    data ({ commit }, data) {
      // Todo: axios api item actions
      commit('data', data)
    },
    
    headers ({ commit }, headers) {
      // Todo: axios api item actions
      commit('headers', headers)
    },
    
    get ({ state, commit }) {
      // Todo: axios api get (list) actions
      db.collection(state.table).get().then(datas => {
        commit('get', datas)
      })
    },
    
    show ({ state, commit }, payload) {
      // Todo: axios api show actions
      commit('show', payload)
    },

    create ({ state, commit, dispatch }, data) {
      // Todo: axios api create actions
      db.collection(state.table).add(data)
      commit('create', data)
      Vue.nextTick(() => {
        dispatch('get')
      })
    },
    
    edit ({ commit }, data) {
      commit('edit', data)
    },
    
    update ({ state, commit }, payload) {
      // Todo: axios api update actions
      db.collection(state.table).doc({ id: payload.id }).update(payload.data)
      commit('update', payload)
    },
    
    delete ({ state, dispatch }, id) {
      // Todo: axios api delete actions
      db.collection(state.table).doc({ id: id }).delete()
      Vue.nextTick(() => {
        dispatch('dialogDelete')
        state.datas.splice(state.editedIndex, 1)
        // dispatch('get')
      })
    },
    
    deleteMultiple ({ state, commit }, payload) {
      // Todo: axios api deleteMultiple actions
      commit('delete', payload)
    },
    
    search ({ state, commit }, text) {
      // Todo: axios api search actions
      commit('search', text)
    },
    
    dialog ({ commit }) {
      commit('dialog')
    },
    
    dialogDelete ({ commit }, id) {
      commit('dialogDelete', id)
    },

  },

  modules: {
    crudDataTable,
    auth,
  }
})
