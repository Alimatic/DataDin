export default function RedirectIfAuthenticated (router) {
  /**
   * If the user is already authenticated he shouldn't be able to visit
   * pages like login, register, etc...
   */
  router.beforeEach((to, from, next) => {
    // console.log(to)
    // console.log(from)
    // console.log(next)
    let token = window.localStorage.getItem('token')
    // let user = JSON.parse(window.localStorage.getItem('auth-user'))

    /**
     * Checks if there's a token and the next page name is none of the following
     */
    if ((token) && to.name === 'login') {
      // redirects according user role
      console.log('router.go({name: \'home\'})')
      router.go({name: 'home'})
    }

    if (!token && to.name !== 'login') {
      console.log('router.go({name: \'login\'})')
      router.go({name: 'login'})
    }

    next()
  })
}
