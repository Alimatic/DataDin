// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import middleware from './middleware'

Vue.use(VueResource)

Vue.config.productionTip = false

middleware(router)

Vue.http.interceptors.push((request, next) => {
  let token = window.localStorage.getItem('token')
  // request.headers.set('X-CSRF-TOKEN', token)
  request.headers.set('Authorization', 'Basic ' + token)
  // console.log(request)
  // request.headers.map.Authorization = 'Basic carlos'
  // request.method = 'POST'
  // request.headers.set('Authorization', 'Basic ' + token)
  next((response) => {
    if (response.status === 401) {
      router.go({name: 'login'})
    }
  })
})

/**
 * This code block can be directly in your main.js file if you keep it this simple
 * otherwise extract it to its own file and require it in main.js
 *
 * Don't forget that the code below will be executed within every request.
 *
 */
// Vue.http.interceptors.push((request, next) => {
//   /**
//    * Here we will fecth the token from local storage and
//    * attach it (if exists) to the Authorization header on EVERY request.
//    */
//   console.log('interceptors')
//   let token = window.localStorage.getItem('token')
//   if (token) {
//     console.log(token)
//     request.headers = request.headers || {}
//     request.headers.Authorization = `Basic ${token}`
//   }
//   /**
//    * Here is where we can refresh the token.
//    */
//   next((response) => {
//     /**
//      * If we get a 401 response from the API means that we are Unauthorized to
//      * access the requested end point.
//      * This means that probably our token has expired and we need to get a new one.
//      */
//     if (response.status === 401) {
//       return Vue.http.get('http://api.dev/refresh-token').then((result) => {
// // Save the new token on local storage
//         window.localStorage.setItem('token', result.data.token)
// // Resend the failed request whatever it was (GET, POST, PATCH) and return its resposne
//         return Vue.http(request).then((response) => {
//           return response
//         })
//       })
//         .catch(() => {
//           /**
//            * We weren't able to refresh the token so the best thing to do is
//            * logout the user (removing any user information from storage)
//            * and redirecting to login page
//            */
//           return router.go({name: 'login'})
//         })
//     }
//   })
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App},
  methods: {},
  created: function () {
  }
})
