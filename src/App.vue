<template>
  <v-app>
    <v-content>
      <MainView/>
    </v-content>
  </v-app>
</template>

<script>
import MainView from './components/MainView';
import LoginView from './views/users/login';

export default {
  name: 'App',

  components: {
    MainView,
    LoginView
  }
}
</script>
