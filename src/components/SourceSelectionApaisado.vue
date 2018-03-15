<template>
  <div class="monthselection">
    <div>
      <div class="jumbotron">
        <h2><span class="glyphicon glyphicon-list-alt"></span>&nbsp;Consultas</h2>

        <div class="row">
          <div class="col-sm-3">
            <h4>Division</h4>
            <select class="form-control" v-on:change="divitionChanged" v-model="divition">
              <option value="">Todas</option>
              <option v-for="divition in divitions" v-bind:value="divition.Id">{{divition.Name}}</option>
            </select>
          </div>
          <div class="col-sm-3">
            <h4>Grupo</h4>
            <select class="form-control" v-on:change="grupoChanged" v-model="grupo">
              <option value="">Todos</option>
              <option v-for="grupo in grupos" v-bind:value="grupo.Id">{{grupo.Name}}</option>
            </select>
          </div>
          <div class="col-sm-3">
            <h4>Modelo</h4>
            <select class="form-control" v-on:change="modeloChanged" v-model="modelo">
              <option v-for="modelo in modelos" v-bind:value="modelo.Id">{{modelo.Id}}</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-3">
            <h4>Dia</h4>
            <select class="form-control" v-on:change="dayChanged" v-model="day">
              <option v-for="day in days" v-bind:value="day.id">{{day.name}}</option>
            </select>
          </div>
          <div class="col-sm-3">
            <h4>Mes</h4>
            <select class="form-control" v-on:change="monthChanged" v-model="month">
              <option value="">Todos</option>
              <option v-for="month in months" v-bind:value="month.id">{{month.name}}</option>
            </select>
          </div>

          <div class="col-sm-3" v-show="range">
            <h4>Dia (hasta)</h4>
            <select class="form-control" v-on:change="day1Changed" v-model="day1">
              <option v-for="day1 in days1" v-bind:value="day1.id">{{day1.name}}</option>
            </select>
          </div>
          <div class="col-sm-3" v-show="range">
            <h4>Mes (hasta)</h4>
            <select class="form-control" v-on:change="month1Changed" v-model="month1">
              <option value="">Todos</option>
              <option v-for="month1 in months1" v-bind:value="month1.id">{{month1.name}}</option>
            </select>
          </div>
        </div>
        <div class="row" style="padding-top: 1em;">
          <label class="" style="margin-top: 1em; font-size: 1.2em; display: none;">Filtrar por rango</label>
          <input v-model="range" type="checkbox" v-on:change="rangeChanged" style="display: none"/>

          <span style="float: right;" class="btn btn-success" v-on:click="loadData()">Cargar datos</span>
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
        day: '',
        months: [],
        month: '',
        days1: [],
        day1: '',
        months1: [],
        month1: '',
        modelos: [],
        modelo: null,
        divitions: [],
        divition: '',
        grupos: [],
        grupo: '',
        range: false
      }
    },
    methods: {
      loadData: function () {
        this.$emit('loadData')
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
          this.grupo = ''
        } else {
          this.grupos = []
          this.grupo = ''
          for (var j = 0; j < this.data.Groups.length; ++j) {
            if (parseInt(this.data.Groups[j].DivisionId) === parseInt(this.divition)) {
              this.grupos.push(this.data.Groups[j])
            }
          }
        }
        this.$emit('divitionChanged', this.divition)
        this.$emit('grupoChanged', this.grupo)
      },
      grupoChanged: function (e) {
        console.log('grupoChanged SourceSelection')
        this.$emit('grupoChanged', this.grupo)
      },
      month1Changed: function (e) {
        console.log('month1Changed SourceSelection')
        for (var i = 0; i < this.months1.length; i++) {
          if (this.months1[i].id === e.target.value) {
            this.month1 = this.months1[i]
          }
        }
        this.$emit('month1Changed', e.target.value)
      },
      day1Changed: function (e) {
        console.log('day1Changed SourceSelection')
        for (var i = 0; i < this.days1.length; i++) {
          if (this.days1[i].id === e.target.value) {
            this.day1 = this.days1[i]
          }
        }
        this.$emit('day1Changed', e.target.value)
      },
      rangeChanged: function (e) {
        console.log('rangeChanged SourceSelection')
        this.$emit('rangeChanged', e.target.value)
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
      dayChanged: function (e) {
        console.log('dayChanged SourceSelection')
        for (var i = 0; i < this.days.length; i++) {
          if (this.days[i].id === e.target.value) {
            this.day = this.days[i]
          }
        }
        this.$emit('dayChanged', e.target.value)
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
      this.months1 = [
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
      this.$emit('monthChanged', this.month)
      this.month1 = (new Date()).getMonth() + 1
      this.$emit('month1Changed', this.month1)
      this.day = 1
      this.$emit('dayChanged', this.day)
      for (let i = 1; i <= 31; ++i) {
        this.days.push({id: i, name: i})
      }
      this.day1 = 1
      this.$emit('day1Changed', this.day1)
      for (let i = 1; i <= 31; ++i) {
        this.days1.push({id: i, name: i})
      }
      this.modelos = []
      this.data = null
      this.$http.get('http://192.168.100.5:80/datadin2/data')
        .then(response => {
          this.data = response.data
          this.divitions = response.data.Divisions
          for (let i = 0; i < response.data.Models.length; ++i) {
            if (response.data.Models[i].IsEFModel === true) {
              this.modelos.push(response.data.Models[i])
            }
          }
        })
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
