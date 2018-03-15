<template>
  <div class="monthselection">
    <div>
      <div class="jumbotron">
        <h2><span class="glyphicon glyphicon-list-alt"></span>&nbsp;Datadin - Filas</h2>
        <div class="row">
          <div class="col-sm-12">
            <h4>Modelo</h4>
            <select class="form-control" v-on:change="modeloChanged" v-model="modelo">
              <option value="">Seleccionar modelo</option>
              <option v-for="modelo in modelos" v-bind:value="modelo.Id">{{modelo.Id}}</option>
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
        modelos: [],
        modelo: ''
      }
    },
    methods: {
      modeloChanged: function (e) {
        console.log('modeloChanged SourceSelection')
        for (var i = 0; i < this.modelos.length; i++) {
          if (this.modelos[i].Id === e.target.value) {
            this.modelo = this.modelos[i]
          }
        }
        this.$emit('modeloChanged', e.target.value)
      }
    },
    created: function () {
      this.modelos = []
      this.data = null
      this.$http.get('http://192.168.100.5:80/datadin2/data')
        .then(response => {
          this.data = response.data
          this.modelos = this.data.Models
        })
    }
  }
</script>
<style scoped>
</style>
