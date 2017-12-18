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
        console.log('divitionChanged SourceSelectionEmpresas')
        if (this.divition === '') {
          this.grupos = this.data.Grupos
          this.grupo = ''
        } else {
          this.grupos = []
          for (var j = 0; j < this.data.Grupos.length; ++j) {
            if (parseInt(this.data.Grupos[j].DivisionId) === parseInt(this.divition)) {
              this.grupos.push(this.data.Grupos[j])
            }
          }
          this.grupo = ''
        }
        this.$emit('divitionChanged', e.target.value)
      },
      grupoChanged: function (e) {
        console.log('grupoChanged SourceSelectionEmpresas')
        this.$emit('grupoChanged', e.target.value)
      }
    },
    created: function () {
      this.data = null
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
