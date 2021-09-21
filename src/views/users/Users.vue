<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="datas"
      :search="tableSearch"
      sort-by="id"
      dense
      class="elevation-1"
      :items-per-page="15"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-btn
            color="primary"
            dark
            class="mb-2"
            to="/users/new"
          >
            New User
          </v-btn>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="tableSearch"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <DeleteDialog title="role" />
        </v-toolbar>
      </template>
      <template v-slot:item.roles="{ item }">
        <v-chip
          v-for="(role, idx) in item.roles"
          :key="idx"
          :color="role.color"
          dark
        >
          {{ role.name }}
        </v-chip>
      </template>
      <template v-slot:item.permissions="{ item }">
        <span
          v-for="(permission, idx) in item.permissions"
          :key="idx"
          class="tw-bg-gray-200 tw-mx-1 tw-py-1 tw-px-2 tw-rounded-full"
        >
          {{ permission.name }}
        </span>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="$store.dispatch('edit', item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="$store.dispatch('dialogDelete', item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
  import { mapGetters } from "vuex";
  import Localbase from 'localbase'
  import DeleteDialog from "@/components/DeleteDialog.vue";
  let db = new Localbase('db')
  db.config.debug = false

  export default {
    name: 'Users',
    components: {
      DeleteDialog,
    },
    
    data: () => ({
      headers : [
        { text: 'ID',           value: 'id', align: 'start', },
        { text: 'Name',         value: 'name', },
        { text: 'Surname',      value: 'surname', },
        { text: 'Username',     value: 'username' },
        { text: 'Email',        value: 'email' },
        { text: 'Roles',        value: 'roles' },
        { text: 'Permissions',  value: 'permissions', sortable: false },
        { text: 'Actions',      value: 'actions',     sortable: false, align: 'right' },
      ],
      tableSearch : '',
    }),

    computed: {
      ...mapGetters([
        'data',
        'datas',
        'dataIndex',
      ]),
    },

    created () {
      this.$store.dispatch('table', 'users')
      this.$store.dispatch('getWithRelations', {
        table: 'users',
        relations: ['roles', 'permissions']
      })
    }
  }
</script>
