/**
 * This is where all the authorization login is stored
 */
import Authorization from './../Services/Authorization'

export default function UserHasPermissions (router) {
  /**
   * Before each route we will see if the current user is authorized
   * to access the given route
   */
  router.beforeEach(({to, next, abort, redirect}) => {
    let authorized = false
    // let user = JSON.parse(window.localStorage.getItem('atiiv.auth-user'))

    /**
     * Remember that access object in the routes? Yup this why we need it.
     *
     */
    if (to.access !== undefined) {
      authorized = Authorization.authorize(
        to.access.requiresLogin,
        to.access.requiredPermissions,
        to.access.permissionType
      )

      if (authorized === 'loginIsRequired') {
        router.go({name: 'login'})
      }

      if (authorized === 'notAuthorized') {
        /**
         * Redirects to a "default" page
         */
        // router.go({/*...*/})
      }
    }
    /**
     * Everything is fine? Let's to the page then.
     */
    next()
  })
}
