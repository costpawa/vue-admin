import Vue from 'vue'
import Vuex from 'vuex'
import Localbase from 'localbase'
import auth from "@/store/auth";

let db = new Localbase('db')
db.config.debug = false

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    table: null,
    id: null,
    data: {
      permissions: [],
      color: '#000000FF'
    },
    datas: [],
    dataIndex: -1,
    headers: {},
    search: null,
    tableSearch: '',
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

    dataIndex: state => {
      return state.dataIndex
    },

    headers: state => {
      return state.headers
    },

    search: state => {
      return state.search
    },

    tableSearch: state => {
      return state.tableSearch
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

    defaultData (state) {
      state.data = {
        permissions: [],
        color: '#000000FF'
      }
    },

    dataPermissions (state, array) {
      state.data.permissions = array
    },

    headers (state, headers) {
      state.headers = headers
    },

    get (state, datas) {
      state.datas = datas
      // console.log(state.datas)
    },

    show (state, payload) {
      state.id = payload.id
      state.data = payload.data
    },

    create (state, data) {
      state.datas.push(data)
      state.dialog = false
    },
    
    edit (state, data) {
      state.dataIndex = state.datas.indexOf(data)
      state.data = Object.assign({}, data)
      state.dialog = true
    },
    
    update (state) {
      Object.assign(state.datas[state.dataIndex], state.data)
    },

    delete (state) {
      state.datas.splice(state.dataIndex, 1)
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

    dialogDelete (state, data) {
      state.data = data
      state.dataIndex = state.datas.indexOf(data)
      state.dialogDelete = !state.dialogDelete
    },

    dialogClose (state) {
      state.dialogDelete = false
      state.dialog = false
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
    
    defaultData ({ commit }, data) {
      // Todo: axios api item actions
      commit('defaultData', data)
    },

    dataPermissions ({ commit }, array) {
      commit('dataPermissions', array)
    },
    
    headers ({ commit }, headers) {
      // Todo: axios api item actions
      commit('headers', headers)
    },
    
    get ({ state, commit }, table) {
      // Todo: axios api get (list) actions
      if(!table) {table = state.table}
      db.collection(table).get().then(datas => {
        commit('get', datas)
      })
    },
    
    show ({ state, commit }, payload) {
      // Todo: axios api show actions
      commit('show', payload)
    },

    create ({ state, commit }, data) {
      // Todo: axios api create actions
      db.collection(state.table).add(data)
      Vue.nextTick(() => {
        commit('create', data)
        commit('defaultData')
      })
    },
    
    edit ({ commit }, data) {
      commit('edit', data)
    },
    
    update ({ state, commit }, data) {
      // Todo: axios api update actions
      db.collection(state.table).doc({ id: data.id }).update(data)
      Vue.nextTick(() => {
        commit('update')
        commit('defaultData')
        commit('dialogClose')
      })
    },
    
    delete ({ state, commit, dispatch }, data) {
      // Todo: axios api delete actions
      db.collection(state.table).doc({ id: data.id }).delete()
      Vue.nextTick(() => {
        commit('delete')
        dispatch('dialogDelete', data)
        commit('defaultData')
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
    
    dialogDelete ({ commit }, data) {
      commit('dialogDelete', data)
    },
    
    dialogClose ({ commit }) {
      commit('dialogClose')
      commit('defaultData')
    },

  },

  modules: {
    auth,
  }
})
