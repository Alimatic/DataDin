<template>

  <div class="container" id="app" style="margin: 2em; width: auto;">

    <SourceSelectionFilas v-on:modeloChanged="modeloChanged"></SourceSelectionFilas>
    <NewslistFilas v-bind:modelo="modelo"></NewslistFilas>

  </div>
</template>
<script>
  import NewslistFilas from './NewslistFilas'
  import SourceSelectionFilas from './SourceSelectionFilas'

  export default {
    name: 'app',
    components: {
      NewslistFilas,
      SourceSelectionFilas
    },
    data () {
      return {
        modelo: ''
      }
    },
    methods: {
      modeloChanged: function (modelo) {
        console.log('modeloChanged App.vue')
        this.modelo = modelo
      }
    }
  }
</script>
<style>
  #app {
    padding-top: 20px
  }
</style>
