import Vue from "vue";
import Router from "vue-router";
import Main from "../views/Home";
import store from "../store";
// import {token} from "../plugins/tokenVariabel";

Vue.use(Router);
export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
      {
        path: "/",
        name: "home",
        component: Main,
      },
      {
        path: "/login",
        name: "login",
        component: () => import(/* webpackChunkName: "about" */ '../views/users/login.vue'),
        beforeEnter: (to, from, next) => {
          if (to.name !== 'login') {next({ name: 'home' })}
          else next()
        }
      },
      {
        path: "/list",
        name: "list",
        component: () => import(/* webpackChunkName: "about" */ '../views/organs/list.vue'),
			},
			{
        path: "/form",
        name: "form",
        component: () => import(/* webpackChunkName: "about" */ '../views/organs/AddForm.vue'),
        beforeEnter: (to, from, next) => {
          if (to.name !== 'login' && (localStorage.getItem("token") == null || localStorage.getItem("token") == undefined)) next({ name: 'login' })
          else next()
        }
			},
			{
        path: "/registration",
        name: "registration",
        component: () => import(/* webpackChunkName: "about" */ '../views/users/RegistrationPage.vue')
			}
    ]
});