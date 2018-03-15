<template>
  <div class="container" style="margin: 2em; width: auto;">
    <div>
      <div class="jumbotron" style="margin: 0;">
        <h2><span class="glyphicon glyphicon-list-alt"></span>&nbsp;Datadin - Modelos</h2>
        <div class="row">
          <div class="col-sm-12">
            <div v-for="(modelo, index) in modelos">
              <div class="panel panel-primary">
                <div class="panel-heading">
                  <div style="font-size: 1.3em">
                    <span class="accordion-toggle" style="color: white">{{modelo.Id}}</span>
                  </div>
                </div>
              </div>
            </div>
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
        modelos: []
      }
    },
    created: function () {
      this.data = null
      this.$http.get('http://192.168.100.5:80/datadin2/data')
        .then(response => {
          this.data = response.data
          this.modelos = response.data.Models
        })
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
