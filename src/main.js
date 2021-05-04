import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import * as firebase from 'firebase';
import vuetify from './plugins/vuetify';
import store from '@/store';
import VueSession from 'vue-session';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import VueI18n from 'vue-i18n';
import languages from './translations/languages'

Vue.use(VueSession);
Vue.use(VueI18n);
firebase.analytics();
Vue.prototype.$firebase = firebase;
Vue.config.productionTip = false;
export default router;

const translator = new VueI18n({locale: 'ro', languages})

new Vue({
    router,
    store,
    vuetify,
    translator,
    firebase,
    render: h => h(App)
}).$mount('#app')
