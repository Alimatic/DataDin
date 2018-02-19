export default function routes (router) {
  router.map({
    '/login': {
      name: 'login',
      component: require('./components/Auth/Login.vue')
    },

    '/example-component': {
      name: 'example-component',
      /**
       * vue-routes allow us to create custom objects in the routes files.
       *
       * This "access" object is created by us and will be used to check the
       * current logged in user permissions on every route change.
       */
      access: {
        requiresLogin: true,
        requiredPermissions: ['admin'],
        permissionType: 'AtLeastOne' // options: AtLeastOne, CombinationRequired
      },
      component: require('./components/ExampleComponent.vue')
    }
  })
}
