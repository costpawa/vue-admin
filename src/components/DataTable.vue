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
              New {{title}}
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle + title }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <slot name="fields"></slot>
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
              <slot name="saveButton"></slot>
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
    name: 'DataTable',
    components: {
      DeleteDialog,
    },
    props: ['title'],
    computed: {
      ...mapGetters([
        'datas',
        'headers',
        'tableSearch',
        'editedIndex',
      ]),
      formTitle () {
        return this.editedIndex === -1 ? 'New ' : 'Edit '
      },
    },
  }
</script>
