<template>
  <div>
    <form @submit.prevent="authenticate()">
      <label>Usuario:</label>
      <input v-model="auth.email" type="text">

      <label>Contrasena</label>
      <input v-model="auth.password" type="password">

      <button type="submit">Iniciar</button>
    </form>
  </div>
</template>

<script>
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
        window.localStorage.setItem('token', credentials.email)
      }
    }
  }
</script>
