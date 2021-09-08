<template>
  <DataTable title="Role">
    <div slot="fields" class="tw-w-full">
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
  </DataTable> 
</template>

<script>
  import { mapGetters } from "vuex";
  import DataTable from "@/components/DataTable.vue";
  export default {
    name: 'Roles',
    components: {
      DataTable,
    },
    computed: {
      ...mapGetters([
        'datas',
        'editedItem',
      ]),
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
