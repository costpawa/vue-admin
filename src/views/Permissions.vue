<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="permissions"
      item-key="name"
      sort-by="name"
      group-by="category"
      class="elevation-1"
      show-group-by
    ></v-data-table>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        headers: [
          {
            text: 'Permission',
            align: 'start',
            value: 'name',
            groupable: false,
          },
          { text: 'Slug', value: 'slug', groupable: false, },
          { text: 'Category', value: 'category', align: 'right' },
        ],
        permissions: [
          {
            name: 'Show dashboard',
            slug: 'show_dashboard',
            category: 'Dashboard',
          },

          // ---------------------
          
          {
            name: 'List users',
            slug: 'list_users',
            category: 'Users',
          },
          {
            name: 'Show users',
            slug: 'show_users',
            category: 'Users',
          },
          {
            name: 'Create users',
            slug: 'create_users',
            category: 'Users',
          },
          {
            name: 'Update users',
            slug: 'update_users',
            category: 'Users',
          },
          {
            name: 'Delete users',
            slug: 'delete_users',
            category: 'Users',
          },

          // ---------------------

          {
            name: 'List roles',
            slug: 'list_roles',
            category: 'Roles',
          },
          {
            name: 'Show roles',
            slug: 'show_roles',
            category: 'Roles',
          },
          {
            name: 'Create roles',
            slug: 'create_roles',
            category: 'Roles',
          },
          {
            name: 'Update roles',
            slug: 'update_roles',
            category: 'Roles',
          },
          {
            name: 'Delete roles',
            slug: 'delete_roles',
            category: 'Roles',
          },

        ],
      }
    },
  }
</script>
