<template>

  <div class="container" id="app" style="margin: 2em; width: auto;">

    <SourceSelection v-on:monthChanged="monthChanged" v-on:yearChanged="yearChanged" v-on:reeupChanged="reeupChanged"
                     v-on:divitionChanged="divitionChanged" v-on:groupChanged="groupChanged"
                     v-on:modeloChanged="modeloChanged"></SourceSelection>
    <Newslist v-bind:month="month" v-bind:year="year" v-bind:modelo="modelo" v-bind:reeup="reeup" v-bind:divition="divition" v-bind:group="group"></Newslist>

  </div>
</template>
<script>
  import Newslist from './Newslist'
  import SourceSelection from './SourceSelection'

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
        reeup: '',
        divition: '',
        group: ''
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
      },
      divitionChanged: function (divition) {
        console.log('divitionChanged App.vue')
        this.divition = divition
      },
      groupChanged: function (group) {
        console.log('groupChanged App.vue')
        this.group = group
      }
    }
  }
</script>
<style>
  #app {
    padding-top: 20px
  }
</style>
