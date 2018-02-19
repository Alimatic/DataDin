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
              <option v-for="divition in divitions" v-bind:value="divition.Id">{{divition.Name}}</option>
            </select>
          </div>
          <div class="col-sm-6">
            <h4>Grupo</h4>
            <select class="form-control" v-on:change="grupoChanged" v-model="grupo">
              <option value="">Todos</option>
              <option v-for="grupo in grupos" v-bind:value="grupo.Id">{{grupo.Name}}</option>
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
          if (this.divitions[i].Id === e.target.value) {
            this.divition = this.divitions[i]
          }
        }
        if (this.divition === '') {
          this.grupos = []
          this.reeups = this.data.Enterprises
        } else {
          this.grupos = []
          this.grupo = ''
          for (var j = 0; j < this.data.Groups.length; ++j) {
            if (parseInt(this.data.Groups[j].DivisionId) === parseInt(this.divition)) {
              this.grupos.push(this.data.Groups[j])
            }
          }
          this.reeups = []
          for (var k = 0; k < this.data.Enterprises.length; ++k) {
            if (parseInt(this.data.Enterprises[k].DivisionId) === parseInt(this.divition)) {
              console.log(this.data.Enterprises[k].Nombre)
              this.reeups.push(this.data.Enterprises[k])
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
          this.reeups = this.data.Enterprises
          this.reeup = ''
          this.grupo = ''
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
            this.grupo = ''
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
        this.$emit('grupoChanged', e.target.value)
      }
    },
    created: function () {
      this.data = null
      // this.$http.get('http://192.168.43.46:80/datadin/data')
      this.$http.get('http://192.168.43.46:80/datadin2/data')
        .then(response => {
          this.data = response.data
          this.divitions = response.data.Divisions
          this.grupos = response.data.Groups
        })
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
