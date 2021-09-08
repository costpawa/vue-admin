<template>
  <v-card>
    <CrudDataTable title="Role">
      <div slot="fields" class="tw-w-full">
        <v-col
          cols="12"
          sm="12"
          md="12"
        >
          <v-text-field
            v-model="$store.state.crudDataTable.editedItem.name"
            label="Role Name"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="12"
          md="12"
        >
          <v-select
            v-model="$store.state.crudDataTable.editedItem.permissions"
            :items="permissions"
            label="Permissions"
            multiple
            chips
            persistent-hint
          >
            <template v-slot:prepend-item>
              <v-list-item
                ripple
                @click="toggle"
              >
                <v-list-item-action>
                  <v-icon :color="$store.state.crudDataTable.editedItem.permissions.length > 0 ? 'indigo darken-4' : ''">
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
  import CrudDataTable from "@/components/CrudDataTable.vue";
  export default {
    name: 'Roles',
    data: () => ({
      e7: [],
      permissions: [
        'Show dashboard',
        'List users',
        'Show users',
        'Create users',
        'Update users',
        'Delete users',
        'List roles',
        'Show roles',
        'Create roles',
        'Update roles',
        'Delete roles',
      ],
    }),
    components: {
      CrudDataTable,
    },
    computed: {
      ...mapGetters([
        'crudDataTable/datas',
        'crudDataTable/editedItem',
      ]),
      allPermissions () {
        return this['crudDataTable/editedItem'].permissions.length === this.permissions.length
      },
      somePermissions () {
        return this['crudDataTable/editedItem'].permissions.length > 0 && !this.allPermissions
      },
      selectAllIcon () {
        if (this.allPermissions) return 'mdi-close-box'
        if (this.somePermissions) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'
      },
    },
    created () {
      let initialHeaders = [
        {
          text: 'ID',
          align: 'start',
          value: 'id',
        },
        { text: 'Role Name'   , value: 'name' },
        { text: 'Permissions' , value: 'permissions' },
        { text: 'Actions'     , value: 'actions', sortable: false },
      ]

      let initialDatas = [
        {
          id          : 1,
          name        : 'Admin',
          permissions : 'All',
        },
        {
          id          : 2,
          name        : 'Editor',
          permissions : '',
        },
        {
          id          : 3,
          name        : 'Member',
          permissions : '',
        },
      ]

      let initialDefaultItem = {
        id          : 1,
        name        : '',
        permissions : '',
        created_at  : '',
        updated_at  : '',
      }

      this.$store.dispatch('crudDataTable/changeHeaders', initialHeaders)
      this.$store.dispatch('crudDataTable/changeData', initialDatas)
      this.$store.dispatch('crudDataTable/changeEditedItem', initialDefaultItem)
      this.$store.dispatch('crudDataTable/changeDefaultItem', initialDefaultItem)
    },

    methods: {
      save () {
        let savingItem = {
          id          : this['crudDataTable/datas'][this['crudDataTable/datas'].length - 1].id + 1,
          name        : this['crudDataTable/editedItem'].name,
          permissions : this['crudDataTable/editedItem'].permissions,
          created_at  : new Date(Date.now()).toLocaleDateString(),
          updated_at  : new Date(Date.now()).toLocaleDateString(),
        }
        this.$store.dispatch('crudDataTable/save', savingItem)
        this.$store.dispatch('crudDataTable/changeEditedItemPermissions', [])
      },
      toggle () {
        this.$nextTick(() => {
          if (this.allPermissions) {
            this.$store.dispatch('crudDataTable/changeEditedItemPermissions', [])
          } else {
            this.$store.dispatch('crudDataTable/changeEditedItemPermissions', this.permissions.slice())
          }
        })
      },
    },
  }
</script>
