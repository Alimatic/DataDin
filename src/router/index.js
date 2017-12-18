import Vue from 'vue'
import Router from 'vue-router'
import Divisiones from '@/components/Divisiones'
import Datadin from '@/components/Datadin'
import Filas from '@/components/Filas'
import Modelos from '@/components/Modelos'
import Empresas from '@/components/Empresas'

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
    },
    {
      path: '/filas',
      name: 'filas',
      component: Filas
    },
    {
      path: '/modelos',
      name: 'modelos',
      component: Modelos
    },
    {
      path: '/empresas',
      name: 'empresas',
      component: Empresas
    }
  ]
})
