<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      class="tw-bg-sideBar-700 tw-border-r-1 tw-border-sideBar-400"
    >
      <v-list-item class="tw-h-16 tw-bg-sideBar-800 tw-border-b-0">
        <v-list-item-content>
          <router-link to="/" class="logo-link">
            <v-list-item-title class="logo-text-lg tw-transition-all tw-text-white tw-text-xl">
              Vue Admin
            </v-list-item-title>
            <v-list-item-subtitle class="logo-text-sm tw-transition-all tw-text-trueGray-550 tw-text-xs">
              An open source cms panel
            </v-list-item-subtitle>
          </router-link>
        </v-list-item-content>
      </v-list-item>

      <v-list
        dense
        nav
        class="tw-pt-0"
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.link"
          link
          class="menu-links tw-text-trueGray-550 tw-my-2 tw-h-auto"
        >
          <v-list-item-icon class="tw-bg-sideBar-800 tw-h-auto tw-p-1.5 tw-rounded-md tw-my-1 tw-mr-2">
            <v-icon class="menu-icons tw-text-trueGray-550 tw-font-extralight">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="menu-texts tw-text-sm tw-transition-all">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      absolute
      class="tw-h-16 tw-bg-sideBar-800 tw-text-trueGray-550"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" color="grey"></v-app-bar-nav-icon>

      <v-toolbar-title class="tw-pl-0 tw-text-base">
        <Breadcrumbs />
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        icon
        color="grey"
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn
        icon
        color="grey" 
        @click="settings = !settings"
      >
        <v-icon >mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view class="tw-p-4"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumbs from '@/components/Breadcrumbs.vue';
export default {
  name: 'Layout',
  components: {
    Breadcrumbs,
  },
  data () {
    return {
      drawer: null,
      settings: null,
      items: [
        {
          title: 'Dashboard',
          link: '/dashboard',
          icon: 'mdi-monitor-dashboard'
        },
        {
          title: 'Users',
          link: '/users',
          icon: 'mdi-account-group'
        },
        {
          title: 'Roles',
          link: '/roles',
          icon: 'mdi-account-group'
        },
        {
          title: 'Permissions',
          link: '/permissions',
          icon: 'mdi-account-group'
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['auth/login']),
  },
  created() {
    if(this['auth/login'] === false) {
      // this.$router.push("/login")
    }
  }
};
</script>

<style scoped>
.v-application {
  font-family: Quicksand !important
}

.v-list-item--active .menu-texts, .v-list-item--active .menu-icons {
  color: #EF4444 !important;
}
</style>
