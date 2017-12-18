import Vue from 'vue'
import Router from 'vue-router'
import Divisiones from '@/components/Divisiones'
import Datadin from '@/components/Datadin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/ef',
      name: 'Datadin',
      component: Datadin
    },
    {
      path: '/divisiones',
      name: 'divisiones',
      component: Divisiones
    }
  ]
})
