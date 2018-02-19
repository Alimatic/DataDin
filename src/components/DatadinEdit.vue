<template>

  <div class="container" id="app" style="margin: 2em; width: auto;">

    <SourceSelectionEdit v-on:monthChanged="monthChanged" v-on:dayChanged="dayChanged" v-on:yearChanged="yearChanged" v-on:reeupChanged="reeupChanged" v-on:editData="editData"
                     v-on:divitionChanged="divitionChanged" v-on:grupoChanged="grupoChanged"
                         v-on:modeloChanged="modeloChanged" v-bind:modelos="modelos"></SourceSelectionEdit>
    <NewslistEdit v-bind:reload="reload" v-bind:day="day" v-bind:modelos="modelos" v-bind:month="month" v-bind:year="year" v-bind:modelo="modelo" v-bind:reeup="reeup" v-bind:divition="divition" v-bind:grupo="grupo"></NewslistEdit>

  </div>
</template>
<script>
  import NewslistEdit from './NewslistEdit'
  import SourceSelectionEdit from './SourceSelectionEdit'

  export default {
    name: 'app',
    components: {
      NewslistEdit,
      SourceSelectionEdit
    },
    data () {
      return {
        month: (new Date()).getMonth() + 1,
        year: 1900 + new Date().getYear(),
        day: 1,
        modelo: 0,
        reeup: '',
        divition: '',
        grupo: '',
        modelos: [],
        reload: false
      }
    },
    methods: {
      dayChanged: function (day) {
        console.log('dayChanged App.vue')
        this.day = day
      },
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
      grupoChanged: function (grupo) {
        console.log('grupoChanged App.vue')
        this.grupo = grupo
      },
      modelosChanged: function (modelos) {
        console.log('modelosChanged App.vue')
        this.modelos = modelos
      },
      editData: function () {
        console.log('editData App.vue')
        this.reload = !this.reload
      }
    }
  }
</script>
<style>
  #app {
    padding-top: 20px
  }
</style>
