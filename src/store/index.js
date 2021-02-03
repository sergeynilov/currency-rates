import { createStore } from 'vuex'
import axios from 'axios'
import app from '@/main.js'

import { settingCredentialsConfig } from '@/app.settings.js'
import { /* getClone, showPopupMessage */ isEmpty } from '@/helpers/commonFuncs'

export default createStore({
  state () {
    return {
      status: '',
      token: localStorage.getItem('token') || '',
      user: null,
      avatarUrl: '',
    }
  }, // state

  mutations: {
    auth_request (state) {
      state.status = 'loading'
    },

    auth_success(state, data) {
      // console.log('auth_success data::')
      // console.log(data)

      state.status = 'success'
      state.token = data.token
      localStorage.setItem('token', data.token)

      if (typeof data.avatarUrl !== 'undefined') {
        state.avatarUrl = data.avatarUrl
        localStorage.setItem('avatarUrl', data.avatarUrl)
      }

      state.user = data.user
      localStorage.setItem('user', JSON.stringify(data.user)) //
    },

    auth_error (state) {
      state.status = 'error'
    },

    logout (state) {
      state.status = ''

      state.token = ''
      localStorage.setItem('token', '')

      state.avatar_url = ''
      localStorage.setItem('avatar_url', '')

      state.user = null
      localStorage.setItem('user', {})
      state.isLoggedIn = false
      // state.authStatus = ''
    },
  }, // mutations

  actions: {
    login ({ commit }, userCredentials) { // Login action
      return new Promise((resolve, reject) => {
        commit('auth_request')
        let apiUrl = process.env.VUE_APP_API_URL
/*
        console.log('+login userCredentials::')
        console.log(userCredentials)

        console.log('+login settingCredentialsConfig::')
        console.log(settingCredentialsConfig)

        console.log('+login apiUrl::')
        console.log(apiUrl)
*/

        axios.post(apiUrl + '/login', userCredentials, settingCredentialsConfig)
          .then((response) => {
            if (typeof response.data.access_token === 'undefined' || typeof response.data.user === 'undefined') {
              commit('auth_error') // call auth_error mutation to make changes to vuex store
              app.$emitter.emit('authLoggedError')
              return
            }

            const token = response.data.access_token
            const user = response.data.user
            let avatarUrl = ''
            if (typeof response.data.filenameData !== 'undefined') {
              avatarUrl = response.data.filenameData.avatarUrl
            }
            // axios.defaults.headeauth_successrs.common['Authorization'] = token
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', {
              token: token,
              user: user,
              avatarUrl: avatarUrl
            }) // call auth_success mutation to make changes to vuex store
            // app.$emitter.emit('authLoggedSuccess', user)
            // http://localhost:8080/admin/categories
            resolve(response)
          })
          .catch((error) => {
            commit('auth_error') // call auth_error mutation to make changes to vuex store
            localStorage.removeItem('token')
            app.$emitter.emit('authLoggedError')
            reject(error)
          })
      })
    }, // login ({ commit }, user) { // Login action

    logout ({ commit }) {
      return new Promise((resolve /* , reject */) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }, // logout ({ commit }) {

  }, // actions

  getters: {

    token (state) {
      if (state.token.length > 0) {
        return state.token
      }
      let token = localStorage.getItem('token')
      if (token != null && typeof token === 'string') {
        if (token.length > 0) {
          return token
        }
      }
      return ''
    }, // token(state) {

    isLoggedIn: state => !!state.token,
    // authStatus: state => state.status,

    user (state) {
      if (state.user != null && typeof state.user.email === 'string') {
        return state.user
      }
      let user = localStorage.getItem('user')
      if (user != null && user !== '') {
        if (isValidJsonString(user)) {
          let localStorageUser = JSON.parse(user)
          if (typeof localStorageUser === 'object') {
            return localStorageUser
          }
        }
      }
      return null
    }, // user(state) {

    avatarUrl (state) {
      if (state.avatarUrl.length > 0) {
        return state.avatarUrl
      }
      let avatarUrl = localStorage.getItem('avatarUrl')
      if (avatarUrl != null && typeof avatarUrl === 'string') {
        if (avatarUrl.length > 0) {
          return avatarUrl
        }
      }
      return ''
    }, // avatarUrl(state) {

  } // getters : {

}) // const store = createStore({

function isValidJsonString (str) {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}
