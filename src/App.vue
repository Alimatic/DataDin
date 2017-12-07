<template>
  <div class="container" id="app">

    <SourceSelection v-on:monthChanged="monthChanged" v-on:yearChanged="yearChanged" v-on:reeupChanged="reeupChanged"
                     v-on:modeloChanged="modeloChanged"></SourceSelection>
    <Newslist v-bind:month="month" v-bind:year="year" v-bind:modelo="modelo" v-bind:reeup="reeup"></Newslist>

  </div>
</template>
<script>
  import Newslist from './components/Newslist'
  import SourceSelection from './components/SourceSelection'

  export default {
    name: 'app',
    components: {
      Newslist,
      SourceSelection
    },
    data () {
      return {
        month: '',
        year: 0,
        modelo: 0,
        reeup: ''
      }
    },
    methods: {
      monthChanged: function (month) {
        console.log('monthChanged App.vue')
        this.month = month
      },
      yearChanged: function (year) {
        console.log('yearChanged App.vue')
        this.year = year
      },
      modeloChanged: function (modelo) {
        console.log('modeloChanged App.vue')
        this.modelo = modelo
      },
      reeupChanged: function (reeup) {
        console.log('reeupChanged App.vue')
        this.reeup = reeup
      }
    }
  }
</script>
<style>
  #app {
    padding-top: 20px
  }
</style>
