<template>

  <div class="container" id="app" style="margin: 2em; width: auto;">

    <SourceSelection v-on:monthChanged="monthChanged" v-on:yearChanged="yearChanged" v-on:reeupChanged="reeupChanged"
                     v-on:divitionChanged="divitionChanged" v-on:grupoChanged="grupoChanged" v-on:dayChanged="dayChanged"
                     v-on:modeloChanged="modeloChanged"></SourceSelection>
    <Newslist v-bind:month="month" v-bind:year="year" v-bind:modelo="modelo" v-bind:reeup="reeup" v-bind:divition="divition" v-bind:grupo="grupo" v-bind:day="day"></Newslist>

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
        day: 1,
        modelo: 0,
        reeup: '',
        divition: '',
        grupo: ''
      }
    },
    methods: {
      monthChanged: function (month) {
        console.log('monthChanged App.vue')
        this.month = month
      },
      dayChanged: function (day) {
        console.log('dayChanged App.vue')
        this.day = day
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
