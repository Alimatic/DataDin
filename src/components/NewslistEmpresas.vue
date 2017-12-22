<template>
  <div class="newslist">
    <div class="container"  style="padding: 0; margin: 0; width: auto;">
      <table class="table table-striped table-bordered table-hover">
        <thead>
        <tr>
          <th>
            Id
          </th>
          <th>
            Nombre
          </th>
          <th>
            Division
          </th>
          <th>
            Grupo
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="empresa in empresas">
          <td>{{empresa.Id}}</td>
          <td>{{empresa.NombreCompleto}}</td>
          <td>{{getDivisionNameById(empresa.DivisionId)}}</td>
          <td>{{getGrupoNameById(empresa.GrupoId, empresa.DivisionId)}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'newslistempresas',
    props: ['grupo', 'divition'],
    data () {
      return {
        empresas: [],
        status: 'Cargando...'
      }
    },
    methods: {
      getDivisionNameById: function (value) {
        for (var k = 0; k < this.data.Divisiones.length; ++k) {
          if (parseInt(this.data.Divisiones[k].Id) === parseInt(value)) {
            return this.data.Divisiones[k].Nombre
          }
        }
        return 'Sin nombre'
      },
      getGrupoNameById: function (value1, value2) {
        for (var k = 0; k < this.data.Grupos.length; ++k) {
          if (parseInt(this.data.Grupos[k].Id) === parseInt(value1) && parseInt(this.data.Grupos[k].DivisionId) === parseInt(value2)) {
            return this.data.Grupos[k].Nombre
          }
        }
        return 'Sin nombre'
      },
      updateList: function () {
        this.empresas = []
        if (this.grupo === '') {
          if (this.divition === '') {
            this.empresas = this.data.Empresas
          } else {
            console.log('2')
            for (var k = 0; k < this.data.Empresas.length; ++k) {
              if (parseInt(this.data.Empresas[k].DivisionId) === parseInt(this.divition)) {
                this.empresas.push(this.data.Empresas[k])
              }
            }
          }
        } else {
          console.log('3')
          if (this.divition === '') {
            this.grupo = ''
            this.empresas = this.data.Empresas
          } else {
            for (var j = 0; j < this.data.Empresas.length; ++j) {
              if (parseInt(this.data.Empresas[j].GrupoId) === parseInt(this.grupo) && parseInt(this.data.Empresas[j].DivisionId) === parseInt(this.divition)) {
                this.empresas.push(this.data.Empresas[j])
              }
            }
          }
        }
        console.log(this.empresas.length)
      },
      updateGrupo: function (grupo) {
        this.grupo = grupo
        this.updateList()
      },
      updateDivition: function (divition) {
        this.divition = divition
        this.updateList()
      }
    },
    created: function () {
      this.data = null
      this.$http.get('http://192.168.43.65:29530/datadin/data')
        .then(response => {
          this.data = response.data
          this.empresas = this.data.Empresas
        })
    },
    watch: {
      grupo: function (val) {
        console.log('updateGrupo NewslistEmpresas.vue')
        this.updateGrupo(val)
      },
      divition: function (val) {
        console.log('updateDivition NewslistEmpresas.vue')
        this.updateDivition(val)
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .media-object {
    width: 128px;
    padding: 10px;
  }

  .media {
    border-top: 1px solid lightgray;
    padding-top: 20px;
  }
</style>
