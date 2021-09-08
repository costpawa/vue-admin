import Vue from 'vue'
import Vuex from 'vuex'
import auth from "@/store/auth";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    datas: [],
    headers: [],
    dialog: false,
    dialogDelete: false,
    tableSearch: '',
    editedIndex: -1,
    editedItem: {},
    defaultItem: {},
  },

  getters: {
    datas: state => {
      return state.datas
    },

    headers: state => {
      return state.headers
    },

    dialog: state => {
      return state.dialog
    },

    dialogDelete: state => {
      return state.dialogDelete
    },

    tableSearch: state => {
      return state.tableSearch
    },

    editedIndex: state => {
      return state.editedIndex
    },

    editedItem: state => {
      return state.editedItem
    },

    defaultItem: state => {
      return state.defaultItem
    },
  },

  mutations: {
    editItem (state, item) {
      state.editedIndex = state.datas.indexOf(item)
      state.editedItem = Object.assign({}, item)
      state.dialog = true
    },

    deleteItem (state, item) {
      state.editedIndex = state.datas.indexOf(item)
      state.editedItem = Object.assign({}, item)
      state.dialogDelete = true
    },

    deleteItemConfirm (state) {
      state.datas.splice(state.editedIndex, 1)
    },

    closeDialog (state) {
      state.dialog = false
      state.editedItem = Object.assign({}, state.defaultItem)
      state.editedIndex = -1
    },

    closeDialogDelete (state) {
      state.dialogDelete = false
      state.editedItem = Object.assign({}, state.defaultItem)
      state.editedIndex = -1
    },

    changeData (state, item) {
      state.datas = item
    },

    updateItem (state) {
      Object.assign(state.datas[state.editedIndex], state.editedItem)
    },

    createItem (state, item) {
      state.datas.push(item)
    },

    editedItem (state, item) {
      state.editedItem = item
    },

    changeHeaders (state, item) {
      state.headers = item
    },

    changeEditedItem (state, item) {
      state.editedItem = item
    },

    changeDefaultItem (state, item) {
      state.defaultItem = item
    },

    save (state) {
      state.editedItem = {}
    },
  },

  actions: {
    editItem ({ commit }, item) {
      commit('editItem', item)
    },

    deleteItem ({ commit }, item) {
      commit('deleteItem', item)
    },

    deleteItemConfirm ({ commit, dispatch }) {
      commit('deleteItemConfirm')
      dispatch('closeDialogDelete')
    },

    closeDialog ({ commit }) {
      Vue.nextTick(() => {
        commit('closeDialog')
      })
    },

    closeDialogDelete ({ commit }) {
      Vue.nextTick(() => {
        commit('closeDialogDelete')
      })
    },

    changeData ({ commit }, item) {
      commit('changeData', item)
    },

    updateItem ({ commit }) {
      commit('updateItem')
    },

    createItem ({ commit }, item) {
      commit('createItem', item)
    },

    changeHeaders ({ commit }, item) {
      commit('changeHeaders', item)
    },

    changeEditedItem ({ commit }, item) {
      commit('changeEditedItem', item)
    },

    changeDefaultItem ({ commit }, item) {
      commit('changeDefaultItem', item)
    },
    
    save ({ commit, dispatch, state }, item) {
      if (state.editedIndex > -1) {
        dispatch('updateItem')
      } else {
        dispatch('createItem', item)
      }
      dispatch('closeDialog')
      commit('save')
    },
  },

  modules: {
    auth
  }
})
