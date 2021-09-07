<template>
  <v-data-table
    :headers="headers"
    :items="users"
    :search="search"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >

        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>

        <v-spacer></v-spacer>

        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New User
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="editedItem.username"
                      label="Username"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="editedItem.password"
                      label="Password"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      search: '',
      headers: [
        {
          text: '#',
          align: 'start',
          value: 'no',
        },
        { text: 'ID'        , value: 'id' },
        { text: 'Username'  , value: 'username' },
        { text: 'Email'     , value: 'email' },
        { text: 'Created At', value: 'created_at' },
        { text: 'Updated At', value: 'updated_at' },
        { text: 'Actions'   , value: 'actions', sortable: false },
      ],
      users: [],
      editedIndex: -1,
      editedItem: {
        no: 1,
        id: 1,
        username: '',
        email: '',
        created_at: '',
        updated_at: '',
      },
      defaultItem: {
        no: 1,
        id: 1,
        username: '',
        email: '',
        created_at: '',
        updated_at: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New User' : 'Edit User'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.users = [
          {
            no: 1,
            id: 1,
            username: 'admin',
            email: 'admin@hotmail.com',
            created_at: '2021-09-06',
            updated_at: '2021-09-06',
          },
          {
            no: 2,
            id: 2,
            username: 'hakan',
            email: 'hakan_dnz_000@hotmail.com',
            created_at: '2021-09-06',
            updated_at: '2021-09-06',
          },,
          {
            no: 3,
            id: 3,
            username: 'editor',
            email: 'editor@hotmail.com',
            created_at: '2021-09-06',
            updated_at: '2021-09-06',
          },
        ]
      },

      editItem (item) {
        this.editedIndex = this.users.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.users.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.users.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.users[this.editedIndex], this.editedItem)
        } else {
          this.editedItem.no = this.users.length
          this.editedItem.id = this.users.length
          this.editedItem.created_at = new Date(Date.now()).toLocaleDateString()
          this.editedItem.updated_at = new Date(Date.now()).toLocaleDateString()
          this.users.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>
