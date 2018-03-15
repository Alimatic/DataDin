import Vue from 'vue'
import Router from 'vue-router'
import Divisiones from '@/components/Divisiones'
import Datadin from '@/components/Datadin'
import DatadinEdit from '@/components/DatadinEdit'
import Filas from '@/components/Filas'
import Modelos from '@/components/Modelos'
import Empresas from '@/components/Empresas'
import HomePage from '@/components/HomePage'
import ModelosAdminList from '@/components/ModelosAdminList'
import ModelosAdminCreate from '@/components/ModelosAdminCreate'
import Login from '@/components/Login'
import Usuarios from '@/components/Usuarios'
import Apaisado from '@/components/Apaisado'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresLogin: false
      }
    },
    {
      path: '/ef',
      name: 'Datadin',
      component: Datadin,
      meta: {
        requiresLogin: true,
        requiredPermissions: ['admin', 'manager'],
        permissionType: 'AtLeastOne' // options: AtLeastOne, CombinationRequired
      }
    },
    {
      path: '/ap',
      name: 'Apaisado',
      component: Apaisado,
      meta: {
        requiresLogin: true,
        requiredPermissions: ['admin', 'manager'],
        permissionType: 'AtLeastOne' // options: AtLeastOne, CombinationRequired
      }
    },
    {
      path: '/divisiones',
      name: 'divisiones',
      component: Divisiones,
      meta: {
        requiresLogin: true,
        requiredPermissions: ['admin', 'manager'],
        permissionType: 'AtLeastOne' // options: AtLeastOne, CombinationRequired
      }
    },
    {
      path: '/filas',
      name: 'filas',
      component: Filas,
      meta: {
        requiresLogin: true,
        requiredPermissions: ['admin', 'manager'],
        permissionType: 'AtLeastOne' // options: AtLeastOne, CombinationRequired
      }
    },
    {
      path: '/modelos',
      name: 'modelos',
      component: Modelos,
      meta: {
        requiresLogin: true,
        requiredPermissions: ['admin', 'manager'],
        permissionType: 'AtLeastOne' // options: AtLeastOne, CombinationRequired
      }
    },
    {
      path: '/empresas',
      name: 'empresas',
      component: Empresas,
      meta: {
        requiresLogin: true,
        requiredPermissions: ['admin', 'manager'],
        permissionType: 'AtLeastOne' // options: AtLeastOne, CombinationRequired
      }
    },
    {
      path: '/edit',
      name: 'edit',
      component: DatadinEdit,
      inherit: true,
      meta: {
        requiresLogin: true,
        requiredPermissions: ['admin', 'manager'],
        permissionType: 'AtLeastOne' // options: AtLeastOne, CombinationRequired
      }
    },
    {
      path: '/modelosadmin/list',
      name: 'modelosadminlist',
      component: ModelosAdminList,
      inherit: true,
      meta: {
        requiresLogin: true,
        requiredPermissions: ['admin', 'manager'],
        permissionType: 'AtLeastOne' // options: AtLeastOne, CombinationRequired
      }
    },
    {
      path: '/modelosadmin/create',
      name: 'modelosadmincreate',
      component: ModelosAdminCreate,
      inherit: true,
      meta: {
        requiresLogin: true,
        requiredPermissions: ['admin', 'manager'],
        permissionType: 'AtLeastOne' // options: AtLeastOne, CombinationRequired
      }
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: Usuarios,
      inherit: true,
      meta: {
        requiresLogin: true,
        requiredPermissions: ['admin'],
        permissionType: 'AtLeastOne' // options: AtLeastOne, CombinationRequired
      }
    },
    {
      path: '*',
      name: 'home',
      component: HomePage,
      meta: {
        requiresLogin: true,
        requiredPermissions: ['admin', 'manager'],
        permissionType: 'AtLeastOne' // options: AtLeastOne, CombinationRequired
      }
    }
  ]
})
