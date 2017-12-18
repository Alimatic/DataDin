<template>
  <div class="newslist">
    <div>
      <p><strong>Ocultar columna descripción</strong> <input v-model="hide_description" type="checkbox" value/></p>
    </div>
    <div class="container" v-if="reports.length" style="padding: 0; margin: 0; width: auto;">
      <table class="table table-striped table-bordered table-hover">
        <thead>
        <tr>
          <th>
            Fila
          </th>
          <th v-show="!hide_description">
            Descripción
          </th>
          <th style="text-align: right">
            Apertura / Plan del año
          </th>
          <th style="text-align: right">
            Plan acumulado
          </th>
          <th style="text-align: right">
            Real hasta la fecha
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="report in reports">
          <td>{{report.Id}}</td>
          <td v-show="!hide_description">{{report.Descripcion}}</td>
          <td style="text-align: right">{{formatPrice(report.C1)}}</td>
          <td style="text-align: right">{{formatPrice(report.C2)}}</td>
          <td style="text-align: right">{{formatPrice(report.C3)}}</td>
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
    props: ['year', 'month', 'reeup', 'modelo', 'group', 'divition'],
    data () {
      return {
        reports: [],
        status: 'Cargando...',
        hide_description: false
      }
    },
    methods: {
      formatPrice: function (value) {
        let val = (value / 1).toFixed(2).replace(',', '.')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      },
      updateList: function (month, year, reeup, modelo, group, divition) {
        console.log('updateList')
        modelo = modelo === 0 ? 5920 : modelo
        year = year === 0 ? 2017 : year
        this.reports = []
        this.status = 'Cargando...'
        this.$http.get(encodeURI('http://192.168.43.65:29530/datadin/ef?Model=' + modelo + '&Year=' + year + '&Month=' + month + '&Reeup=' + reeup + '&Group=' + group + '&Divition=' + divition))
          .then(response => {
            this.reports = response.data
            if (this.reports.length === 0) {
              this.status = 'No hay datos que mostrar :('
            }
          })
      },
      updateMonth: function (month) {
        this.month = month
        this.updateList(this.month, this.year, this.reeup, this.modelo, this.group, this.divition)
      },
      updateYear: function (year) {
        this.year = year
        this.updateList(this.month, this.year, this.reeup, this.modelo, this.group, this.divition)
      },
      updateReeup: function (reeup) {
        this.reeup = reeup
        this.updateList(this.month, this.year, this.reeup, this.modelo, this.group, this.divition)
      },
      updateModelo: function (modelo) {
        this.updateList(this.month, this.year, this.reeup, this.modelo, this.group, this.divition)
      },
      updateGroup: function (group) {
        this.group = group
        this.updateList(this.month, this.year, this.reeup, this.modelo, this.group, this.divition)
      },
      updateDivition: function (divition) {
        this.divition = divition
        this.updateList(this.month, this.year, this.reeup, this.modelo, this.group, this.divition)
      }
    },
    created: function () {
      this.updateList(this.month, this.year, this.reeup, this.modelo, this.grupo, this.divition)
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
      },
      group: function (val) {
        console.log('updateGroup Newslist.vue')
        this.updateGroup(val)
      },
      divition: function (val) {
        console.log('updateDivition Newslist.vue')
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
