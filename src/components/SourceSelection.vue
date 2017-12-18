<template>
  <div class="monthselection">
    <div>
      <div class="jumbotron">
        <h2><span class="glyphicon glyphicon-list-alt"></span>&nbsp;Datadin - Estados Financieros</h2>
        <div class="row">
          <div class="col-sm-2">
            <h4>Mes</h4>
            <select class="form-control" v-on:change="monthChanged" v-model="month">
              <option value="">Todos</option>
              <option v-for="month in months" v-bind:value="month.id">{{month.name}}</option>
            </select>
          </div>
          <div class="col-sm-2">
            <h4>Año</h4>
            <select class="form-control" v-on:change="yearChanged" v-model="year">
              <option v-for="year in years" v-bind:value="year.id">{{year.name}}</option>
            </select>
          </div>
          <div class="col-sm-2">
            <h4>Division</h4>
            <select class="form-control" v-on:change="divitionChanged" v-model="divition">
              <option value="">Todas</option>
              <option v-for="divition in divitions" v-bind:value="divition.Id">{{divition.Nombre}}</option>
            </select>
          </div>
          <div class="col-sm-2">
            <h4>Grupo</h4>
            <select class="form-control" v-on:change="grupoChanged" v-model="grupo">
              <option value="">Todos</option>
              <option v-for="grupo in grupos" v-bind:value="grupo.Id">{{grupo.Nombre}}</option>
            </select>
          </div>
          <div class="col-sm-2">
            <h4>Empresas</h4>
            <select class="form-control" v-on:change="reeupChanged" v-model="reeup">
              <option value="">Todas</option>
              <option v-for="reeup in reeups" v-bind:value="reeup.Id">{{reeup.Nombre}}</option>
            </select>
          </div>
          <div class="col-sm-2">
            <h4>Modelo</h4>
            <select class="form-control" v-on:change="modeloChanged" v-model="modelo">
              <option v-for="modelo in modelos" v-bind:value="modelo.id">{{modelo.name}}</option>
            </select>
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
        months: [],
        month: '',
        years: [],
        year: 2017,
        modelos: [],
        modelo: 5920,
        reeups: [],
        reeup: '',
        divitions: [],
        divition: '',
        grupos: [],
        grupo: ''
      }
    },
    methods: {
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
          this.grupos = this.data.Grupos
          this.grupo = ''
          this.reeups = this.data.Empresas
          this.reeup = ''
        } else {
          this.grupos = []
          for (var j = 0; j < this.data.Grupos.length; ++j) {
            if (parseInt(this.data.Grupos[j].DivisionId) === parseInt(this.divition)) {
              this.grupos.push(this.data.Grupos[j])
            }
          }
          this.grupo = ''
          this.reeups = []
          for (var k = 0; k < this.data.Empresas.length; ++k) {
            if (parseInt(this.data.Empresas[k].DivisionId) === parseInt(this.divition)) {
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
        if (this.grupo === '') {
          if (this.divition === '') {
            this.reeups = this.data.Empresas
          } else {
            this.reeups = []
            for (var l = 0; l < this.data.Empresas.length; ++l) {
              if (parseInt(this.data.Empresas[l].DivisionId) === parseInt(this.divition)) {
                this.reeups.push(this.data.Empresas[l])
              }
            }
            this.reeup = ''
          }
        } else {
          this.reeups = []
          for (var k = 0; k < this.data.Empresas.length; ++k) {
            if (parseInt(this.data.Empresas[k].GrupoId) === parseInt(this.grupo)) {
              this.reeups.push(this.data.Empresas[k])
            }
          }
        }
        this.$emit('grupoChanged', e.target.value)
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
        for (var i = 0; i < this.modelos.length; i++) {
          if (this.modelos[i].id === e.target.value) {
            this.modelo = this.modelos[i]
          }
        }
        this.$emit('modeloChanged', e.target.value)
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
      this.years = [
        {id: 2013, name: 2013},
        {id: 2014, name: 2014},
        {id: 2015, name: 2015},
        {id: 2016, name: 2016},
        {id: 2017, name: 2017}
      ]
      this.modelos = [
        {id: 5920, name: 5920},
        {id: 5921, name: 5921},
        {id: 5924, name: 5924},
        {id: 5925, name: 5925},
        {id: 5926, name: 5926}
      ]
      this.data = null
      this.$http.get('http://192.168.43.65:29530/datadin/data')
        .then(response => {
          this.data = response.data
          this.reeups = response.data.Empresas
          this.divitions = response.data.Divisiones
          this.grupos = response.data.Grupos
        })
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
