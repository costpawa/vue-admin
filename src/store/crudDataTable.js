const crudDataTable = {
  namespaced: true,

  state: () => ({
    datas: [],
    headers: [],
    dialog: false,
    dialogDelete: false,
    tableSearch: '',
    editedIndex: -1,
    editedItem: {},
    defaultItem: {},
  }),

  getters: {
    datas: state => {
      return state.datas
    },

    headers: state => {
      return state.headers
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
  },

  mutations: {
    editItem (state, item) {
      state.editedIndex = state.datas.indexOf(item)
      state.editedItem = Object.assign({}, item)
      state.dialog = true
    },

    deleteItem (state, item) {
      state.editedIndex = state.datas.indexOf(item)
      state.dialogDelete = true
    },

    deleteItemConfirm (state) {
      state.datas.splice(state.editedIndex, 1)
    },

    closeDialog (state) {
      state.dialog = false
      state.editedItem = {}
      state.editedIndex = -1
    },

    closeDialogDelete (state) {
      state.dialogDelete = false
      state.editedItem = {}
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

    changeEditedItemPermissions (state, array) {
      state.editedItem.permissions = array
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
      commit('closeDialog')
      commit('changeEditedItemPermissions', [])
    },

    closeDialogDelete ({ commit }) {
      commit('closeDialogDelete')
      commit('changeEditedItemPermissions', [])
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

    changeEditedItemPermissions ({ commit }, item) {
      commit('changeEditedItemPermissions', item)
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
}

export default crudDataTable