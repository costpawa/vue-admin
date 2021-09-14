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
    data: {},
    datas: [],
    dataIndex: -1,
    headers: {},
    search: null,
    tableSearch: '',
    dialog: false,
    dialogDelete: false,
    errors: [],
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

    errors: state => {
      return state.errors
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
      state.data = {}
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

    show (state, data) {
      state.data = data
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
    
    showUpdate (state, data) {
      state.data = data
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
      state.dataIndex = -1
    },

    dialogDelete (state, data) {
      state.data = data
      state.dataIndex = state.datas.indexOf(data)
      state.dialogDelete = !state.dialogDelete
      state.dataIndex = -1
    },

    dialogClose (state) {
      state.dialogDelete = false
      state.dialog = false
      state.dataIndex = -1
    },

    errors(state, errors) {
      state.errors = errors
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
      if(!table) {
        table = state.table
      }
      db.collection(table).get().then(datas => {
        commit('get', datas)
      })
    },
    
    getWithRelations ({ state, commit }, payload) {
      // Todo: axios api get (list) actions
      if(!payload.table) {
        payload.table = state.table
      }
      db.collection(payload.table).get().then(datas => {
        datas.forEach((data) => {
          let relations = String(payload.relations)
          db.collection(relations).doc({ id: data[relations] }).get().then(relationDatas => {
            data[relations] = relationDatas
          })
        })
        commit('get', datas)
      })
      console.log(state.data)
    },
    
    show ({ state, commit, dispatch }, payload) {
      // Todo: axios api show actions
      let table = payload.table
      let id = payload.id
      if(!table) {
        table = state.table
      }
      if(!id) {
        id = state.id
      }
      db.collection(table).doc({ id: id }).get().then(data => {
        commit('show', data)
      })
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
    
    showUpdate ({ state, commit }, data) {
      // Todo: axios api update actions
      db.collection(state.table).doc({ id: data.id }).update(data)
      commit('showUpdate', data)
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
    
    pushError({ commit }, errors) {
      commit('errors', errors)
    },

  },

  modules: {
    auth,
  }
})
