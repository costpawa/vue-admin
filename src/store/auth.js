const auth = {
  namespaced: true,

  state: () => ({
    dummyUser: {
      'id'          : 1,
      'username'    : 'hakan',
      'password'    : '123456',
      'email'       : 'costpawa2@gmail.com',
      'remember_me' : false,
      'roles'       : 'admin',
      'permissions' : 'all',
      'image'       : 'hakan.jpg',
    },
    login           : false,
    username        : null,
    password        : null,
    rememberMe      : false,
    errors          : [],
    loginAttempts   : {
      current : 0,
      captcha : 3,
      limit   : 5,
    },
  }),

  getters: {
    login: state => {
      return state.login
    },

    username: state => {
      return state.username
    },

    password: state => {
      return state.password
    },

    rememberMe: state => {
      return state.rememberMe
    },

    loginAttempts: state => {
      return state.loginAttempts.current
    },

    errors: state => {
      return state.errors
    },
  },

  mutations: {
    login(state, payload) {
      state.login = {
        'id'          : payload.id,
        'username'    : payload.username,
        'roles'       : payload.roles,
        'permissions' : payload.permissions,
        'image'       : payload.image,
      }
    },

    invalidLogin(state, payload) {
      state.errors = {
        'code'    : payload.code,
        'message' : payload.message,
      }
    },

    logout(state, payload) {
      state.login = false
    },

    errors(state, errors) {
      state.errors = errors
    },

    increaseLoginAttempt(state, payload) {
      state.loginAttempts.current ++
    },

    tooManyLoginAttempts(state, payload) {
      state.errors.push({
        'user'    : payload.user.id,
        'code'    : payload.code,
        'message' : payload.message,
      })
    },

    resetLoginAttempts(state, payload) {
      state.loginAttempts.current = 0
    },
  },

  actions: {
    login({ state, commit }, credentials) {
      return new Promise((resolve, reject) => {
        let user = state.dummyUser
        if((credentials.username === user.username || credentials.username === user.email) && credentials.password === user.password) {
          commit('resetLoginAttempts', user)
          commit('login', user)
          resolve('/')
        } else {
          let errors = {
            'code'    : 401,
            'message' : 'Invalid credentials',
          }
          commit('invalidLogin', errors)
          commit('increaseLoginAttempt', user)
          // console.log(errors)
          reject(errors)
        }
      })
    },

    logout({ commit }, user) {
      commit('logout', user)
    },

    pushError({ commit }, errors) {
      commit('errors', errors)
    },
  },
}

export default auth