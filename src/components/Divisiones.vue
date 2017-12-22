<template>
  <div class="container" style="margin: 2em; width: auto;">
    <div>
      <div class="jumbotron" style="margin: 0;">
        <h2><span class="glyphicon glyphicon-list-alt"></span>&nbsp;Datadin - Divisiones - Grupo</h2>
        <div class="row">
          <div class="col-sm-12">
            <div v-for="(divition, index) in divitions">
              <div class="panel panel-primary">
                <div class="panel-heading">
                  <div style="font-size: 1.3em; cursor: pointer;">
                    <a class="accordion-toggle" style="color: white" data-toggle="collapse" :href="'#collapse' + index">{{divition.Id}} - {{divition.Nombre}}</a>
                  </div>
                </div>
                <div :id="'collapse' + index" class="collapse">
                  <div v-for="(group, index) in divition.Grupos">
                    <div class="" style="padding: 0.2em; margin-left: 1em;">
                      <h4>
                        {{group.Id}} - {{group.Nombre}}
                      </h4>
                    </div>
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
        divitions: []
      }
    },
    created: function () {
      this.data = null
      this.$http.get('http://192.168.43.65:29530/datadin/data')
        .then(response => {
          this.data = response.data
          this.divitions = response.data.Divisiones
        })
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
