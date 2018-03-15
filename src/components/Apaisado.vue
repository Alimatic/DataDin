<template>

  <div class="container" id="app" style="margin: 2em; width: auto;">

    <SourceSelectionApaisado v-on:monthChanged="monthChanged"
                             v-on:month1Changed="month1Changed"
                             v-on:loadData="loadData"
                             v-on:divitionChanged="divitionChanged"
                             v-on:grupoChanged="grupoChanged"
                             v-on:dayChanged="dayChanged"
                             v-on:day1Changed="day1Changed"
                             v-on:modeloChanged="modeloChanged"
                             v-on:rangeChanged="rangeChanged"></SourceSelectionApaisado>
    <NewslistApaisado v-bind:loaddata="loaddata"
                      v-bind:month="month"
                      v-bind:month1="month1"
                      v-bind:modelo="modelo"
                      v-bind:divition="divition"
                      v-bind:grupo="grupo"
                      v-bind:day="day"
                      v-bind:day1="day1"
                      v-bind:range="range"></NewslistApaisado>

  </div>
</template>
<script>
  import NewslistApaisado from './NewslistApaisado'
  import SourceSelectionApaisado from './SourceSelectionApaisado'

  export default {
    name: 'app',
    components: {
      NewslistApaisado,
      SourceSelectionApaisado
    },
    data () {
      return {
        month: '',
        month1: '',
        day: 1,
        day1: 1,
        modelo: '',
        divition: '',
        grupo: '',
        range: false,
        loaddata: false
      }
    },
    methods: {
      loadData: function () {
        console.log('loadData App.vue')
        this.loaddata = !this.loaddata
      },
      monthChanged: function (month) {
        console.log('monthChanged App.vue')
        this.month = month
      },
      dayChanged: function (day) {
        console.log('dayChanged App.vue')
        this.day = day
      },
      month1Changed: function (month1) {
        console.log('month1Changed App.vue')
        this.month1 = month1
      },
      day1Changed: function (day1) {
        console.log('day1Changed App.vue')
        this.day1 = day1
      },
      rangeChanged: function (range) {
        console.log('rangeChanged App.vue')
        this.range = range
      },
      modeloChanged: function (modelo) {
        console.log('modeloChanged App.vue')
        this.modelo = modelo
      },
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
