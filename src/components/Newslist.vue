<template>
  <div class="newslist">
    <div class="container">
      <table class="table table-striped table-bordered table-hover">
        <thead>
        <tr>
          <th>
            ID
          </th>
          <th>
            Descripción
          </th>
          <th>
            C1
          </th>
          <th>
            C2
          </th>
          <th>
            C3
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="report in reports">
          <td>{{report.Id}}</td>
          <td>{{report.Descripcion}}</td>
          <td>{{report.C1}}</td>
          <td>{{report.C2}}</td>
          <td>{{report.C3}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'newslist',
    props: ['year', 'month', 'reeup', 'modelo'],
    data () {
      return {
        reports: []
      }
    },
    methods: {
      updateList: function (month, year, reeup, modelo) {
        console.log('updateList')
        this.month = month
        this.year = year === 0 ? 2017 : year
        this.reeup = reeup
        this.modelo = modelo === 0 ? 5920 : modelo
        this.reports = []
        this.$http.get(encodeURI('http://127.0.0.1:29530/datadin/ef?Model=' + this.modelo + '&Year=' + this.year + '&Month=' + this.month + '&Reeup=' + this.reeup))
          .then(response => {
            this.reports = response.data
          })
      },
      updateMonth: function (month) {
        this.month = month
        this.updateList(this.month, this.year, this.reeup, this.modelo)
      },
      updateYear: function (year) {
        this.year = year
        this.updateList(this.month, this.year, this.reeup, this.modelo)
      },
      updateReeup: function (reeup) {
        this.reeup = reeup
        this.updateList(this.month, this.year, this.reeup, this.modelo)
      },
      updateModelo: function (modelo) {
        this.modelo = modelo
        this.updateList(this.month, this.year, this.reeup, this.modelo)
      }
    },
    created: function () {
      this.updateList(this.month, this.year, this.reeup, this.modelo)
    },
    watch: {
      year: function (val) {
        console.log('updateYear Newslist.vue')
        this.updateYear(val)
      },
      month: function (val) {
        console.log('updateMonth Newslist.vue')
        this.updateMonth(val)
      },
      reeup: function (val) {
        console.log('updateReeup Newslist.vue')
        this.updateReeup(val)
      },
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
