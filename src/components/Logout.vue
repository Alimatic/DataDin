<template>
  <div>
    Logout
  </div>
</template>

<script>
  import router from '../router'

  export default {
    created: function () {
      window.localStorage.removeItem('token')
      router.replace({name: 'login'})
    }
  }
</script>
