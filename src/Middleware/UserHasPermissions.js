/**
 * This is where all the authorization login is stored
 */
import Authorization from './../Services/Authorization'

/**
 * This is where all the authorization login is stored
 */

export default function UserHasPermissions (router) {
  /**
   * Before each route we will see if the current user is authorized
   * to access the given route
   */
  router.beforeEach((to, from, next) => {
    let authorized = false
    // let user = JSON.parse(window.localStorage.getItem('atiiv.auth-user'))
    /**
     * Remember that access object in the routes? Yup this why we need it.
     *
     */
    if (to.meta !== undefined) {
      authorized = Authorization.authorize(
        to.meta.requiresLogin,
        to.meta.requiredPermissions,
        to.meta.permissionType
      )
      if (authorized === 'loginIsRequired') {
        router.replace({name: 'login'})
      }
      if (authorized === 'notAuthorized') {
        /**
         * Redirects to a "default" page
         */
        window.location.href = ''
        // router.replace({name: 'home'})
      }
    }
    /**
     * Everything is fine? Let's to the page then.
     */
    next()
  })
}
