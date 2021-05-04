<template>
  <v-bottom-navigation
    :value="activeBtn"
    grow
    color="teal"
    class="filter-position"
  >
    <v-btn @click="sendCaEvent">
      <span>CA</span>
      <v-icon>mdi-brain</v-icon>
    </v-btn>

    <v-btn @click="sendCcEvent">
      <span>CC</span>
      <v-icon>mdi-account-multiple-check</v-icon>
    </v-btn>

    <v-btn @click="sendCslEvent">
      <span>CSL</span>
      <v-icon>mdi-map-marker</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
  export default {
      name: 'FilterComponent',
    data () {
      return {
        activeBtn: 0,
      }
    },
    created(){
       this.sendCaEvent()
    },
    methods: {
      sendCcEvent(){
          this.$emit('CC')
      },
      sendCaEvent(){
        this.$emit('CA')
      },
      sendCslEvent(){
        this.$emit('CSL')
      }
    }
  }
</script>
<style>
#filter-position{
    margin-top: 230px;
}
</style>