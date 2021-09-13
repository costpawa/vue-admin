<template>
  <div class="tw-flex tw-justify-between tw-gap-4">
    <div class="tw-w-3/12">
      <div class="tw-bg-red-100 tw-pt-6 tw-pb-4">
        <v-img src="@/assets/img/profile-big.jpeg" class="tw-w-52 tw-max-h-52 tw-rounded-full tw-mx-auto tw-border-5 tw-border-red-500"></v-img>
        <div class="tw-flex tw-flex-col tw-items-center tw-mt-6 tw-gap-1">
          <span class="tw-text-xl tw-font-bold">{{ $store.state.data.name + ' ' + $store.state.data.surname }}</span>
          <span class="tw-text-red-500 tw-font-semibold">{{ $store.state.data.role }}</span>
          <span>@{{ $store.state.data.username }}</span>
          <span>{{ $store.state.data.email }}</span>
        </div>
      </div>
      <div class="tw-bg-red-50 tw-p-6">
        <div class="tw-flex tw-justify-between tw-text-center">
          <UserRecords
            v-for="record in records"
            :key="record.id"
            :record="record"
          />
        </div>
      </div>
    </div>
    <v-card class="tw-w-9/12">
      <v-card-title>
        <span class="text-h5">Edit Profile</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              sm="12"
              md="6"
            >
              <v-text-field
                v-model="profileDatas.email"
                label="Email"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="12"
              md="6"
            >
              <v-text-field
                v-model="profileDatas.username"
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
                v-model="profileDatas.password"
                label="Password"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="12"
              md="6"
            >
              <v-text-field
                v-model="profileDatas.confirmPassword"
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
                v-model="profileDatas.name"
                label="Name"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="12"
              md="6"
            >
              <v-text-field
                v-model="profileDatas.surname"
                label="Surname"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col
              cols="12"
              sm="12"
              md="6"
            >
              <v-select
                v-model="profileDatas.role"
                :items="roles"
                label="Role"
                persistent-hint
              >
              </v-select>
            </v-col>
            <v-col
              cols="12"
              sm="12"
              md="6"
            >
              <v-select
                v-model="profileDatas.permissions"
                :items="permissions"
                label="Permissions"
                multiple
                chips
                hint="Select if you want to define additional permissions for this user"
                persistent-hint
              >
                <template v-slot:prepend-item>
                  <v-list-item
                    ripple
                    @click="toggle"
                  >
                    <v-list-item-action>
                      <v-icon :color="profileDatas.permissions.length > 0 ? 'indigo darken-4' : ''">
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
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" class="tw-mr-3" @click="save">Save</v-btn>
      </v-card-actions>
      <v-alert
        dense
        type="success"
        class="tw-mx-4 tw-mt-3"
        v-model="success"
        dismissible
      >
        Profile edited.
      </v-alert>
    </v-card>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import Localbase from 'localbase'
  import UserRecords from '@/components/UserRecords.vue';

  let db = new Localbase('db')
  db.config.debug = false
  
  export default {
    name: 'Profile',
    components: {
      UserRecords,
    },

    data: () => ({
      success: false,
      records: [
        {
          title: 'Posts',
          value: 15,
        },
        {
          title: 'Likes',
          value: 27,
        },
        {
          title: 'Comments',
          value: 6,
        },
      ],
      profileDatas: {
        id: 1,
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        name: '',
        surname: '',
        role: '',
        permissions: [],
      },
      roles: [],
      permissions: [],
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
        this.roles = datas.map(({ name }) => name)
      })
      db.collection('permissions').get().then(datas => {
        this.permissions = datas.map(({ name }) => name)
      })

      this.$store.dispatch('table', 'users')
      this.$store.dispatch('show', {
        table: 'users',
        id: 1,
      })
      setTimeout(() => {
        this.profileDatas.id                  = this.data.id
        this.profileDatas.email               = this.data.email
        this.profileDatas.username            = this.data.username
        this.profileDatas.password            = this.data.password
        this.profileDatas.confirmPassword     = this.data.confirmPassword
        this.profileDatas.name                = this.data.name
        this.profileDatas.surname             = this.data.surname
        this.profileDatas.role                = this.data.role
        this.profileDatas.permissions         = this.data.permissions
      }, 500)
    },

    methods: {
      save () {
        this.$store.dispatch('showUpdate', this.profileDatas)
        this.success = true
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
