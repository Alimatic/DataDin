<template>

  <div class="container" id="app" style="margin: 2em; width: auto;">

    <SourceSelection v-on:realTimeChanged="realTimeChanged" v-on:monthChanged="monthChanged" v-on:month1Changed="month1Changed" v-on:loadData="loadData" v-on:reeupChanged="reeupChanged"
                     v-on:divitionChanged="divitionChanged" v-on:grupoChanged="grupoChanged" v-on:dayChanged="dayChanged" v-on:day1Changed="day1Changed"
                     v-on:modeloChanged="modeloChanged" v-on:rangeChanged="rangeChanged"></SourceSelection>
    <Newslist v-bind:loaddata="loaddata" v-bind:realtimeC="realtimeC" v-bind:month="month" v-bind:month1="month1" v-bind:modelo="modelo" v-bind:reeup="reeup" v-bind:divition="divition" v-bind:grupo="grupo" v-bind:day="day" v-bind:day1="day1" v-bind:range="range"></Newslist>

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
        month1: '',
        day: 1,
        day1: 1,
        modelo: '',
        reeup: '',
        divition: '',
        grupo: '',
        range: false,
        loaddata: false,
        realtimeC: false
      }
    },
    methods: {
      loadData: function (month) {
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
      },
      realTimeChanged: function (realtime) {
        console.log('realtimeChanged App.vue')
        this.realtimeC = !this.realtimeC
      }
    }
  }
</script>
<style>
  #app {
    padding-top: 20px
  }
</style>
