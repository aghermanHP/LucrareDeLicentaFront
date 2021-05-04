<template>
     <v-card
    class="mx-auto"
    max-width="auto"
  >
    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="card in cards"
          :key="card.title"
          :cols="card.flex"
        >
          <v-card>
            <v-img
              :src="card.src"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="card.title"></v-card-title>
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
import * as firebase from 'firebase'
import store from "../store";
export default {
    data(){ 
        return{
            cards: [
               { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12 },
               { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
               { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
             ],
            user : null,
            timerCounter: 60,
            userID: null
        }
    },
    mounted(){
      this.user = localStorage.getItem("token")
    },
    created(){
         firebase.auth().signInWithCustomToken(localStorage.getItem("token"))
        .then(function(){
            this.user = firebase.auth().currentUser.uid;
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        });
    },
    methods:{
        decrementItem: () =>{
                                this.timerCounter = this.timerCounter -1
                                return this.timerCounter
                            },
        getUser: () => {
            return store.getters.user
        }
    }
}
</script>