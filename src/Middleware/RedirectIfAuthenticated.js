export default function RedirectIfAuthenticated (router) {
  /**
   * If the user is already authenticated he shouldn't be able to visit
   * pages like login, register, etc...
   */
  router.beforeEach(({to, next, abort, redirect}) => {
    let token = window.localStorage.getItem('token')
    // let user = JSON.parse(window.localStorage.getItem('auth-user'))

    /**
     * Checks if there's a token and the next page name is none of the following
     */
    if ((token) && (to.name === 'login' || to.name === 'register')) {
      // redirects according user role
      router.go({name: 'home'})
    }

    if (!token) {
      // Logout
    }

    next()
  })
}
