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
        modelos: [],
        modelo: ''
      }
    },
    methods: {
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
        })
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
