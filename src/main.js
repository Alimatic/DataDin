// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'

Vue.use(VueResource)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  console.log(to)
  let token = window.localStorage.getItem('token')
  console.log('token >> ' + token)
  console.log('requiresLogin === true  >> ' + (to.meta.requiresLogin === true))
  console.log('token === undefined     >> ' + (typeof token === 'undefined'))
  console.log('token === null          >> ' + (token === null))
  if ((to.meta.requiresLogin === true) && ((typeof token === 'undefined') || (token === null))) {
    router.replace({name: 'login'})
  } else {
    next()
  }
})

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
