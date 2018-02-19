<template>
  <div>
    <form @submit.prevent="authenticate()" class="login-form" style="text-align: center;">
      <label>Usuario:</label>
      <input v-model="auth.email" type="text">

      <label>Password</label>
      <input v-model="auth.password" type="password">

      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
  import router from '../router'

  export default {
    data () {
      return {
        auth: {email: '', password: ''},
        user: {}
      }
    },
    methods: {
      /**
       * Attempts to authenticate the user
       *
       * @return {mixed}
       */
      authenticate () {
        let credentials = this.auth
        if ((credentials.email === 'geia' && credentials.password === 'geia*18') || (credentials.email === 'admin' && credentials.password === '123456')) {
          window.localStorage.setItem('token', credentials.email)

          router.replace({name: 'home'})
        } else {
          alert('Credenciales malas')
        }
        // this.$http.post('http://api.dev/login', credentials).then((response) => {
        //   /**
        //    * Now that we successfully retrieved the token and the user information
        //    * we have a couple of options:
        //    *
        //    *     1) Save the token in local storage
        //    *         - Keeps the token saved even when the browser is closed
        //    *     2) Save the token in session storage
        //    *         - Deletes the token when user closes the browser or even the tab
        //    *     3) Save the token in a cookie
        //    *
        //    *  Both local and session storage api are the same so I'll use the local storage
        //    *  for the sake of the example
        //    *
        //    */
        //   window.localStorage.setItem('token', response.data.token)
        //   window.localStorage.setItem('auth-user', JSON.stringify(response.data.user))
        //
        //   this.$route.router.go({name: 'edit'})
        // }).catch((errors) => {
        //   // catch errors
        // })
      }
    }
  }
</script>
