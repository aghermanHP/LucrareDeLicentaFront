import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from "../main"

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    user: null,
    allData: null,
    status: null,
    error: null

  },
  mutations: {

    setUser (state, payload) {
      state.user = payload
    },

    removeUser (state) {
      state.user = null
    },

    setStatus (state, payload) {
      state.status = payload
    },

    setError (state, payload) {
      state.error = payload
    }

  },
  actions: {
    signUpAction ({ commit }, payload) {
      commit('setStatus', 'loading')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then((response) => {
          alert('success')
          // response will have user
          // user will have uid will be updated to the state
          commit('setUser', response.user.uid)
          router.push({ name: "login" })
          commit('setStatus', 'success')
          commit('setError', null)
        })
        .catch((error) => {
          commit('setStatus', 'failure')
          commit('setError', error.message)
          alert(error.message)
        })
    },

    signInAction ({ commit }, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then((response) => {
          commit('setUser', response.user.uid)
          commit('setStatus', 'success')
          commit('setError', null)
          firebase.auth().currentUser.getIdToken(true).then(function(idToken){
            localStorage.setItem("token", idToken)
         }).catch(function (error) {
             //Handle error
         });
         router.push({ name: "home" })
        })
        .catch((error) => {
          commit('setStatus', 'failure')
          commit('setError', error.message)
        })
    },

    signOutAction ({ commit }) {
      firebase.auth().signOut()
        .then((response) => {
          commit('setUser', null)
          commit('removeUser')
          commit('setStatus', 'success')
          commit('setError', null)
          localStorage.removeItem("token")
        })
        .catch((error) => {
          commit('setStatus', 'failure')
          commit('setError', error.message)
        })
    },

    writeFormAction(payload){
      console.log(payload.organ)
    firebase.firestore().collection(payload.organ).doc(payload.idnp).set({
    comments: payload.comments,
    createdAt: payload.createdAt,
    finish: payload.finish,
    lasting: payload.lasting,
    name: payload.name,
    start: payload.start,
    surname: payload.surname
})
.then(function(){
  alert("item aded with succes!!")
  // router.push({ name: "home" })
})
.catch((e) => {
  alert(e.message)
})
}
  },

  getters: {

    status (state) {
      return state.status
    },

    user (state) {
      return state.user
    },

    error (state) {
      return state.error
    }
  }
})