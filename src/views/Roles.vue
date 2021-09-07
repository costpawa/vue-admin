<template>
  <v-data-table
    :headers="headers"
    :items="datas"
    :search="tableSearch"
    sort-by="id"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-text-field
          v-model="$store.state.tableSearch"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="$store.state.dialog"
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
              New Role
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
                      v-model="$store.state.editedItem.name"
                      label="Role Name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="$store.state.editedItem.permissions"
                      label="Permissions"
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
                @click="$store.dispatch('closeDialog')"
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
        <DeleteDialog title="role" />
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="$store.dispatch('editItem', item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="$store.dispatch('deleteItem', item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
  import { mapGetters } from "vuex";
  import DeleteDialog from "@/components/DeleteDialog.vue";
  export default {
    name: 'Roles',
    components: {
      DeleteDialog
    },
    computed: {
      ...mapGetters([
        'datas',
        'headers',
        'tableSearch',
        'editedIndex',
        'editedItem',
      ]),
      formTitle () {
        return this.editedIndex === -1 ? 'New Role' : 'Edit Role'
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

      this.$store.dispatch('changeHeaders', initialHeaders)
      this.$store.dispatch('changeData', initialDatas)
      this.$store.dispatch('changeEditedItem', initialDefaultItem)
      this.$store.dispatch('changeDefaultItem', initialDefaultItem)
    },

    methods: {
      save () {
        let savingItem = {
          id          : this.datas[this.datas.length - 1].id + 1,
          name        : this.editedItem.name,
          permissions : this.editedItem.permissions,
          created_at  : new Date(Date.now()).toLocaleDateString(),
          updated_at  : new Date(Date.now()).toLocaleDateString(),
        }
        this.$store.dispatch('save', savingItem)
      },
    },
  }
</script>
