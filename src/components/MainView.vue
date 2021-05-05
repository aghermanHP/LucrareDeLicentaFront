<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app right>
      <v-list dense>
        <v-list-item link to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>{{ $t("menu.home") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

         <v-list-item link to="/list">
          <v-list-item-action>
            <v-icon>mdi-format-list-bulleted-square</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>{{ $t("menu.list") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link :to="{ name: 'form' }">
          <v-list-item-action>
            <v-icon>mdi-briefcase-plus</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>{{ $t('menu.add') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link :to="{ name: 'registration' }">
          <v-list-item-action>
            <v-icon>mdi-account-plus-outline</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>{{ $t('menu.register') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="logout">
          <v-list-item-action>
            <v-icon>mdi-logout-variant</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>{{ $t("menu.logout") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>


        <v-list-item>
          <v-list>
            <v-layout cols="12">
              <v-col md="1" class="m-0">
                <v-list-item-action>
                  <v-icon>mdi-cellphone-android</v-icon>
                </v-list-item-action>
              </v-col>
          <v-col md="11">
            <v-list-group>
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>{{ $t('menu.contacts') }}</v-list-item-title>
                </v-list-item-content>
              </template>

              <v-list-item>
              <v-list-item-action>
                  <v-icon>mdi-cellphone-android</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>078968596</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
              <v-list-item-action>
                  <v-icon>mdi-phone-classic</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>022-902-112</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
              <v-list-item-action>
                  <v-icon>mdi-fax</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>fax: 022-902-112</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
              <v-list-item-action>
                  <v-icon>mdi-email-mark-as-unread</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>112@moldova.com</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
          </v-col>
            </v-layout>
          </v-list>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="cyan"
      dark
    >
      <v-spacer />
      <v-toolbar-items>
        <language-filter/>
      </v-toolbar-items>
      <v-toolbar-title>JR</v-toolbar-title>

      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
    </v-app-bar>

    <v-content style="padding: 6px 6px 0px 0px;">
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col class="text-center">
            <router-view/>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-footer
      color="cyan"
      app
    >
      <v-spacer />

      <span class="white--text">&copy;  Reserved by JobRapide in 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import i18nFilter from "./i18nFilter";

  export default {
    name: 'MainView',
    props: {
      source: String,
    },
    components: {
      LanguageFilter : i18nFilter
    },
    data: () => ({
      drawer: false,
    }),
    methods:{
      logout(){
      this.$store.dispatch('signOutAction')
      this.$router.push({ name: "login" })
      return this.drawer = false
      }
    }
  }
</script>
<style scoped>
#main-router-view{
  margin-top: 30px;
  padding: 0%;
}
</style>