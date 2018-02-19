<template>

  <div class="monthselection">
    <div>
      <div class="jumbotron">
        <h2><span class="glyphicon glyphicon-list-alt"></span>&nbsp;Datadin - Edit

        </h2>

        <div class="row">
          <div class="col-sm-2">
            <h4>Modelo</h4>
            <select class="form-control" v-on:change="modeloChanged" v-model="modelo">
              <option v-for="modelo in modelos" v-bind:value="modelo.Id">{{modelo.Id}}</option>
            </select>
          </div>
          <div class="col-sm-2">
            <h4>Año</h4>
            <select class="form-control" v-on:change="yearChanged" v-model="year">
              <option v-for="year in years" v-bind:value="year.id">{{year.name}}</option>
            </select>
          </div>
          <div class="col-sm-2">
            <h4>Mes</h4>
            <select class="form-control" v-on:change="monthChanged" v-model="month">
              <option value="">Todos</option>
              <option v-for="month in months" v-bind:value="month.id">{{month.name}}</option>
            </select>
          </div>
          <div class="col-sm-2">
            <h4>Dia</h4>
            <select class="form-control" v-on:change="dayChanged" v-model="day">
              <option v-for="day in days" v-bind:value="day.id">{{day.name}}</option>
            </select>
          </div>
          <div class="col-sm-2">
            <h4>Empresa</h4>
            <select class="form-control" v-on:change="reeupChanged" v-model="reeup">
              <option v-for="reeup in reeups" v-bind:value="reeup.Id">{{reeup.Name}}</option>
            </select>
          </div>
          <div class="col-sm-2">
            <h4></h4>
            <button v-on:click="editData()" class="btn btn-primary form-control" style="margin-top: 2em;">Mostrar datos
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'sourceselection',
    data () {
      return {
        days: [],
        day: 0,
        months: [],
        month: 0,
        years: [],
        year: 0,
        modelos: [],
        modelo: '',
        modeloFull: '',
        reeups: [],
        reeup: '',
        divitions: [],
        divition: '',
        grupos: [],
        grupo: '',
        records: []
      }
    },
    methods: {
      editData: function () {
        console.log('editData')
        this.$emit('editData')
      },
      yearChanged: function (e) {
        console.log('yearChanged SourceSelection')
        for (var i = 0; i < this.years.length; i++) {
          if (this.years[i].id === e.target.value) {
            this.year = this.years[i]
          }
        }
        this.$emit('yearChanged', e.target.value)
      },
      divitionChanged: function (e) {
        console.log('divitionChanged SourceSelection')
        for (var i = 0; i < this.divitions.length; i++) {
          if (this.divitions[i].id === e.target.value) {
            this.divition = this.divitions[i]
          }
        }
        if (this.divition === '') {
          this.grupos = []
          this.reeups = this.data.Empresas
        } else {
          this.grupos = []
          this.grupo = ''
          for (var j = 0; j < this.data.Grupos.length; ++j) {
            if (parseInt(this.data.Grupos[j].DivisionId) === parseInt(this.divition)) {
              this.grupos.push(this.data.Grupos[j])
            }
          }
          this.reeups = []
          for (var k = 0; k < this.data.Empresas.length; ++k) {
            if (parseInt(this.data.Empresas[k].DivisionId) === parseInt(this.divition)) {
              console.log(this.data.Empresas[k].Nombre)
              this.reeups.push(this.data.Empresas[k])
            }
          }
          this.reeup = ''
        }
        this.$emit('divitionChanged', e.target.value)
      },
      grupoChanged: function (e) {
        console.log('grupoChanged SourceSelection')
        for (var i = 0; i < this.grupos.length; i++) {
          if (this.grupos[i].id === e.target.value) {
            this.grupo = this.grupos[i]
          }
        }
        if (this.divition === '') {
          this.grupos = []
          this.reeups = this.data.Empresas
          this.grupo = ''
          this.reeup = ''
        } else {
          if (this.grupo === '') {
            this.reeups = []
            this.reeup = ''
            for (var p = 0; p < this.data.Empresas.length; ++p) {
              if (parseInt(this.data.Empresas[p].DivisionId) === parseInt(this.divition)) {
                this.reeups.push(this.data.Empresas[p])
              }
            }
            this.reeup = ''
          } else {
            this.reeups = []
            for (var l = 0; l < this.data.Empresas.length; ++l) {
              if (parseInt(this.data.Empresas[l].GrupoId) === parseInt(this.grupo) && parseInt(this.data.Empresas[l].DivisionId) === parseInt(this.divition)) {
                this.reeups.push(this.data.Empresas[l])
              }
            }
            this.reeup = ''
          }
        }
        this.$emit('grupoChanged', e.target.value)
      },
      dayChanged: function (e) {
        console.log('dayChanged SourceSelection')
        for (var i = 0; i < this.days.length; i++) {
          if (this.days[i].id === e.target.value) {
            this.day = this.days[i]
          }
        }
        this.$emit('dayChanged', e.target.value)
      },
      monthChanged: function (e) {
        console.log('monthChanged SourceSelection')
        for (var i = 0; i < this.months.length; i++) {
          if (this.months[i].id === e.target.value) {
            this.month = this.months[i]
          }
        }
        this.$emit('monthChanged', e.target.value)
      },
      reeupChanged: function (e) {
        console.log('reeupChanged SourceSelection')
        for (var i = 0; i < this.reeups.length; i++) {
          if (this.reeups[i].id === e.target.value) {
            this.reeup = this.reeups[i]
          }
        }
        this.$emit('reeupChanged', e.target.value)
      },
      modeloChanged: function (e) {
        console.log('modeloChanged SourceSelection')
        var modelFully = null
        for (var i = 0; i < this.modelos.length; i++) {
          if (parseInt(this.modelos[i].Id) === parseInt(e.target.value)) {
            this.modelo = this.modelos[i].Id
            modelFully = this.modelos[i]
          }
        }
        this.$emit('modeloChanged', modelFully)
      }
    },
    created: function () {
      this.isAdmin = window.localStorage.getItem('token') === 'admin'
      this.months = [
        {id: 1, name: 'Enero'},
        {id: 2, name: 'Febrero'},
        {id: 3, name: 'Marzo'},
        {id: 4, name: 'Abril'},
        {id: 5, name: 'Mayo'},
        {id: 6, name: 'Junio'},
        {id: 7, name: 'Julio'},
        {id: 8, name: 'Agosto'},
        {id: 9, name: 'Septiembre'},
        {id: 10, name: 'Octubre'},
        {id: 11, name: 'Noviembre'},
        {id: 12, name: 'Diciembre'}
      ]
      this.month = (new Date()).getMonth() + 1
      this.day = 1
      this.days = []
      for (let i = 1; i <= 31; ++i) {
        this.days.push({id: i, name: i})
      }
      this.years = [
        {id: 2013, name: 2013},
        {id: 2014, name: 2014},
        {id: 2015, name: 2015},
        {id: 2016, name: 2016},
        {id: 2017, name: 2017},
        {id: 2018, name: 2018}
      ]
      this.year = 1900 + new Date().getYear()
      this.modelos = []
      this.data = null
      this.$http.get('http://192.168.43.46:80/datadin2/data')
        .then(response => {
          this.data = response.data
          this.reeups = response.data.Enterprises
          this.divitions = response.data.Divisions
          this.modelos = response.data.Models
        })
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
