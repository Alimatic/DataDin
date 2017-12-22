<template>
  <div class="monthselection">
    <div>
      <div class="jumbotron">
        <h2><span class="glyphicon glyphicon-list-alt"></span>&nbsp;Datadin - Empresas</h2>
        <div class="row">
          <div class="col-sm-6">
            <h4>Division</h4>
            <select class="form-control" v-on:change="divitionChanged" v-model="divition">
              <option value="">Todas</option>
              <option v-for="divition in divitions" v-bind:value="divition.Id">{{divition.Nombre}}</option>
            </select>
          </div>
          <div class="col-sm-6">
            <h4>Grupo</h4>
            <select class="form-control" v-on:change="grupoChanged" v-model="grupo">
              <option value="">Todos</option>
              <option v-for="grupo in grupos" v-bind:value="grupo.Id">{{grupo.Nombre}}</option>
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
        divitions: [],
        divition: '',
        grupos: [],
        grupo: ''
      }
    },
    methods: {
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
          this.reeup = ''
          this.grupo = ''
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
            this.grupo = ''
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
      }
    },
    created: function () {
      this.data = null
      // this.$http.get('http://192.168.43.65:29530/datadin/data')
      this.$http.get('http://192.168.43.65:29530/datadin/data')
        .then(response => {
          this.data = response.data
          this.divitions = response.data.Divisiones
          this.grupos = response.data.Grupos
        })
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
