<template>
  <v-card>
    <CrudDataTable title="User" :itemsPerPage="15">
      <div slot="fields" class="tw-w-full">
        <v-row>
          <v-col
            cols="12"
            sm="12"
            md="6"
          >
            <v-text-field
              v-model="$store.state.data.email"
              label="Email"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="6"
          >
            <v-text-field
              v-model="$store.state.data.username"
              label="Username"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            cols="12"
            sm="12"
            md="6"
          >
            <v-text-field
              v-model="$store.state.data.password"
              label="Password"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="6"
          >
            <v-text-field
              v-model="$store.state.data.confirmPassword"
              label="Confirm Password"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            cols="12"
            sm="12"
            md="6"
          >
            <v-text-field
              v-model="$store.state.data.name"
              label="Name"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="6"
          >
            <v-text-field
              v-model="$store.state.data.surname"
              label="Surname"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            cols="12"
            sm="12"
            md="12"
          >
            <v-select
              label="Role"
              persistent-hint
              v-model="$store.state.data.roles"
              :items="selectRoles"
              item-text="name"
              item-value="id"
            >
            </v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="12"
            md="12"
          >
            <v-select
              label="Permissions"
              multiple
              chips
              hint="Select if you want to define additional permissions for this user"
              persistent-hint
              v-model="$store.state.data.permissions"
              :items="permissions"
              item-text="name"
              item-value="id"
            >
              <template v-slot:prepend-item>
                <v-list-item
                  ripple
                  @click="toggle"
                >
                  <v-list-item-action>
                    <v-icon :color="$store.state.data.permissions.length > 0 ? 'indigo darken-4' : ''">
                      {{ selectAllIcon }}
                    </v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>
                      Select All
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider class="mt-2"></v-divider>
              </template>
            </v-select>
          </v-col>
        </v-row>
      </div>
      <div slot="saveButton">
        <v-btn
          color="blue darken-1"
          text
          @click="save"
        >
          Save
        </v-btn>
      </div>
    </CrudDataTable>
  </v-card>
</template>

<script>
  import { mapGetters } from "vuex";
  import Localbase from 'localbase'
  import CrudDataTable from "@/components/CrudDataTable.vue";
  let db = new Localbase('db')
  db.config.debug = false

  export default {
    name: 'Users',
    components: {
      CrudDataTable,
    },
    
    data: () => ({
      selectRoles : [],
      permissions : [],
    }),

    computed: {
      ...mapGetters([
        'data',
        'datas',
        'dataIndex',
      ]),
      allPermissions () {
        return this.data.permissions.length === this.permissions.length
      },
      somePermissions () {
        return this.data.permissions.length > 0 && !this.allPermissions
      },
      selectAllIcon () {
        if (this.allPermissions) return 'mdi-close-box'
        if (this.somePermissions) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'
      },
    },

    created () {
      db.collection('roles').get().then(datas => {
        this.selectRoles = datas
      })
      db.collection('permissions').get().then(datas => {
        this.permissions = datas
      })
      let headers = [
        { text: 'ID',           value: 'id', align: 'start', },
        { text: 'Name',         value: 'name', },
        { text: 'Surname',      value: 'surname', },
        { text: 'Username',     value: 'username' },
        { text: 'Email',        value: 'email' },
        { text: 'Role(s)',      value: 'roles' },
        { text: 'Permissions',  value: 'permissions', sortable: false },
        { text: 'Actions',      value: 'actions',     sortable: false, align: 'right' },
      ]

      let defaultData = {
        id          : 1,
        name        : '',
        surname     : '',
        username    : '',
        email       : '',
        selectRoles : [],
        permissions : [],
      }

      this.$store.dispatch('headers', headers)
      this.$store.dispatch('data', defaultData)
      
      this.$store.dispatch('getWithRelations', {
        table: 'users',
        relations: ['roles']
      })
    },

    methods: {
      save () {
        // console.log(this.data)
        if (this.dataIndex > -1) {
          this.$store.dispatch('update', this.data)
        } else {
          this.data.id = this.datas.length === 0 ? 1 : (this.datas[this.datas.length - 1].id + 1)
          this.data.rememberMe = false
          this.$store.dispatch('create', this.data)
        }
      },
      toggle () {
        this.$nextTick(() => {
          if (this.allPermissions) {
            this.$store.dispatch('defaultData')
          } else {
            this.$store.dispatch('dataPermissions', this.permissions.slice())
          }
        })
      },
    }
  }
</script>
