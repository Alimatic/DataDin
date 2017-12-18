<template>
  <div class="newslist">
    <div class="container" v-if="filas.length" style="padding: 0; margin: 0; width: auto;">
      <table class="table table-striped table-bordered table-hover">
        <thead>
        <tr>
          <th>
            Id
          </th>
          <th>
            Descripcion
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="fila in filas">
          <td>{{fila.Id}}</td>
          <td>{{fila.Descripcion}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <p style="text-align: center; font-size: 2em;" v-else>{{status}}</p>
  </div>
</template>
<script>
  export default {
    name: 'newslist',
    props: ['modelo'],
    data () {
      return {
        filas: [],
        status: 'Cargando...'
      }
    },
    methods: {
      updateModelo: function (modelo) {
        this.filas = []
        this.modelo = modelo
        if (modelo === '') {
          this.filas = this.data.Filas
        } else {
          for (var k = 0; k < this.data.Filas.length; ++k) {
            if (parseInt(this.data.Filas[k].ModeloId) === parseInt(this.modelo)) {
              this.filas.push(this.data.Filas[k])
            }
          }
        }
      }
    },
    created: function () {
      this.data = null
      this.$http.get('http://192.168.43.65:29530/datadin/data')
        .then(response => {
          this.data = response.data
          this.filas = this.data.Filas
        })
    },
    watch: {
      modelo: function (val) {
        console.log('updateModelo Newslist.vue')
        this.updateModelo(val)
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
