<template>
  <v-card
    max-width="1200"
    class="mx-auto"
  >
  
     <FilterComponent v-on:PT="getCouncils('partTime')"
    v-on:FT="getCouncils('Comisiei de Cenzori (CC)')"
    v-on:FE="getCouncils('Comisiei de Solutionare a Litigiilor (CSL)')"/>
    <v-list two-line>
                <v-progress-linear
          v-if="loader==true"
          indeterminate
          color="cyan"
          ></v-progress-linear>
      <v-list-item-group
        v-model="selected"
        multiple
      >
        <template v-for="(item, index) in items">
          <v-list-item :key="item.info">
            <template>
              <v-list-item-content>
                <v-list-item-title v-text="department"></v-list-item-title>
                <v-list-item-subtitle class="text--primary" v-text="'Nume: ' + item.info.name+' '+'Prenume: '+item.info.surname"></v-list-item-subtitle>
                <v-list-item-subtitle v-text="item.info.createdAt"></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text v-text="item.action"></v-list-item-action-text>
                <v-icon
                  v-if="!active"
                  color="grey lighten-1"
                >
                  mdi-star-outline
                </v-icon>

                <v-icon
                  v-else
                  color="yellow"
                >
                  mdi-star
                </v-icon>
                 <v-icon
                  color="yellow"
                >
                  mdi-card-account-details-outline
                </v-icon>
              </v-list-item-action>
            </template>
          </v-list-item>

          <v-divider
            v-if="index + 1 < items.length"
            :key="index"
          ></v-divider>
        </template>
      </v-list-item-group>
    </v-list>

    <DetailsOrgans/>
  </v-card>
</template>
<script>
  import FilterComponent from "../../components/filter"
  import DetailsOrgans from "./organDetails"
  export default {
    name: 'list',
    components: {
      FilterComponent,
      DetailsOrgans
    },
    data: () => ({
      x: false,
      items: null,
      selected: [2],
      department: "",
      dropdown: false,
      modal: false,
      loader: true
    }),
    methods: {
      async getCouncils(collectionTarget){
        console.log(collectionTarget)
        this.loader = true;
        let data = [];
        try{ 
          await this.$firebase.firestore().collection(collectionTarget)
          .get()
          .then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                  // doc.data() is never undefined for query doc snapshots 
                  let x = {idnp: doc.id, info: doc.data()}
                  data.push(x)
              });
          })
          .catch(function(error) {
              console.log("Error getting documents: ", error);
          })
          this.items = data
          this.loader = false
          this.department = collectionTarget
      } catch (e) {
        alert(e);
      }},
    }
  }
</script>