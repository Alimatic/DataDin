<template>

  <div>

    <div class="container" id="app" style="margin: 2em; width: auto; text-align: center;">

      <a href="#ef" class="btn btn-success">Consulta</a>

      <a href="#ap" class="btn btn-success">Apaisado</a>

      <a href="#edit" class="btn btn-success">Edicion</a>

      <a href="#modelosadmin/list" class="btn btn-success">Modelos</a>

      <a href="#empresas" class="btn btn-success">Empresas</a>

      <a v-show="isAdmin" href="#usuarios" class="btn btn-success">Usuarios</a>

      <span class="btn btn-danger" v-on:click="logout()">Salir</span>

    </div>

    <div>

      <router-view></router-view>

    </div>

  </div>

</template>

<script>
  // import router from './router'

  export default {
    created: function () {
      this.isAdmin = window.localStorage.getItem('role') === 'admin'
    },
    methods: {
      logout () {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('role')
        window.location.reload()
      }
    }
  }
</script>
