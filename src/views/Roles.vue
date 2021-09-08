<template>
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
        <v-text-field
          v-model="$store.state.crudDataTable.editedItem.permissions"
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
  </CrudDataTable> 
</template>

<script>
  import { mapState, mapGetters } from "vuex";
  import CrudDataTable from "@/components/CrudDataTable.vue";
  export default {
    name: 'Roles',
    components: {
      CrudDataTable,
    },
    computed: {
      ...mapGetters([
        'crudDataTable/datas',
        'crudDataTable/editedItem',
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
      },
    },
  }
</script>
