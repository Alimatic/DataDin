<template>

  <div class="container" id="app" style="margin: 2em; width: auto;">

    <SourceSelectionEmpresas v-on:divitionChanged="divitionChanged" v-on:grupoChanged="grupoChanged"></SourceSelectionEmpresas>
    <NewslistEmpresas v-bind:divition="divition" v-bind:grupo="grupo"></NewslistEmpresas>

  </div>
</template>
<script>
  import NewslistEmpresas from './NewslistEmpresas'
  import SourceSelectionEmpresas from './SourceSelectionEmpresas'

  export default {
    name: 'app',
    components: {
      NewslistEmpresas,
      SourceSelectionEmpresas
    },
    data () {
      return {
        divition: '',
        grupo: ''
      }
    },
    methods: {
      divitionChanged: function (divition) {
        console.log('divitionChanged App.vue')
        this.divition = divition
      },
      grupoChanged: function (grupo) {
        console.log('grupoChanged App.vue')
        this.grupo = grupo
      }
    }
  }
</script>
<style>
  #app {
    padding-top: 20px
  }
</style>
