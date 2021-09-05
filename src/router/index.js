import Vue from 'vue'
import VueRouter from 'vue-router'

import DashboardLayout from '../views/layouts/Dashboard.vue'
import AuthLayout from '../views/layouts/Auth.vue'

import Dashboard from '../views/Dashboard.vue'

import Login from '../views/auth/Login.vue'
import ForgetPassword from '../views/auth/ForgetPassword.vue'
import Logout from '../views/auth/Logout.vue'

import Users from '../views/users/Users.vue'
import ShowUser from '../views/users/Show.vue'

let users = {
  path: '/users',
  component: DashboardLayout,
  children: [
    {
      path: '',
      name: 'Users',
      component: Users
    },
    {
      path: ':id',
      name: 'ShowUser',
      component: ShowUser
    },
  ]
}

let auth = {
  path: '/',
  name: 'Auth',
  component: AuthLayout,
  children: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout,
    },
    {
      path: '/forget-password',
      name: 'ForgetPassword',
      component: ForgetPassword,
    }
  ]
}

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/dashboard',
  },
  {
    path: '/',
    component: DashboardLayout,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        components: { default: Dashboard },
      }
    ]
  },
  auth,
  users,
]

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

export default router
