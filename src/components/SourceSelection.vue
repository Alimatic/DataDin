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
            <h4>Empresas</h4>
            <select class="form-control" v-on:change="reeupChanged" v-model="reeup">
              <option value="">Todas</option>
              <option v-for="reeup in reeups" v-bind:value="reeup.Id">{{reeup.Name}}</option>
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
        <div class="row" style="padding-top: 1em">
          <label class="" style="margin-top: 1em; font-size: 1.2em">Filtrar por rango</label>
          <input v-model="range" type="checkbox" v-on:change="rangeChanged"/>

          <label class="" style="margin-top: 1em; font-size: 1.2em; margin-left: 1em;">Incluir datos parciales</label>
          <input v-model="realtimeC" type="checkbox" v-on:change="realTimeChanged"/>

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
        reeups: [],
        reeup: '',
        divitions: [],
        divition: '',
        grupos: [],
        grupo: '',
        range: false,
        realtimeC: false
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
          this.reeups = this.data.Enterprises
          this.reeup = ''
        } else {
          this.grupos = []
          this.grupo = ''
          for (var j = 0; j < this.data.Groups.length; ++j) {
            if (parseInt(this.data.Groups[j].DivisionId) === parseInt(this.divition)) {
              this.grupos.push(this.data.Groups[j])
            }
          }
          this.reeups = []
          this.reeup = ''
          for (var k = 0; k < this.data.Enterprises.length; ++k) {
            if (parseInt(this.data.Enterprises[k].DivisionId) === parseInt(this.divition)) {
              console.log(this.data.Enterprises[k].Nombre)
              this.reeups.push(this.data.Enterprises[k])
            }
          }
        }
        this.$emit('divitionChanged', this.divition)
        this.$emit('grupoChanged', this.grupo)
        this.$emit('reeupChanged', this.reeup)
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
          this.reeups = this.data.Enterprises
          this.grupo = ''
          this.reeup = ''
        } else {
          if (this.grupo === '') {
            this.reeups = []
            this.reeup = ''
            for (var p = 0; p < this.data.Enterprises.length; ++p) {
              if (parseInt(this.data.Enterprises[p].DivisionId) === parseInt(this.divition)) {
                this.reeups.push(this.data.Enterprises[p])
              }
            }
            this.reeup = ''
          } else {
            this.reeups = []
            for (var l = 0; l < this.data.Enterprises.length; ++l) {
              if (parseInt(this.data.Enterprises[l].GroupId) === parseInt(this.grupo) && parseInt(this.data.Enterprises[l].DivisionId) === parseInt(this.divition)) {
                this.reeups.push(this.data.Enterprises[l])
              }
            }
            this.reeup = ''
          }
        }
        this.$emit('reeupChanged', this.reeup)
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
      realTimeChanged: function (e) {
        console.log('realTimeChanged SourceSelection')
        this.$emit('realTimeChanged', e.target.value)
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
