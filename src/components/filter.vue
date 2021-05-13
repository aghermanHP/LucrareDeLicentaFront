<template>
  <v-bottom-navigation
    :value="activeBtn"
    grow
    color="teal"
    class="filter-position"
  >
    <v-btn @click="sendFullTimeEvent">
      <span>Full-time</span>
      <v-icon>mdi-account-clock-outline</v-icon>
    </v-btn>

    <v-btn @click="sendPartTimeEvent">
      <span>Part-time</span>
      <v-icon>mdi-briefcase-clock-outline</v-icon>
    </v-btn>

    <v-btn @click="sendFreelanceEvent">
      <span>Freelance</span>
      <v-icon>mdi-account-reactivate-outline</v-icon>
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
       this.sendFullTimeEvent()
    },
    methods: {
      sendPartTimeEvent(){
          this.$emit('PT')
      },
      sendFullTimeEvent(){
        this.$emit('FT')
      },
      sendFreelanceEvent(){
        this.$emit('FE')
      }
    }
  }
</script>

<style>
#filter-position{
    margin-top: 230px;
}
</style>