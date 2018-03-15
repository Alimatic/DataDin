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
          <th v-if="columns != null" style="text-align: right" v-for="n in columns">
            {{n}}
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(record, index) in reports">
          <td>{{record.RowId}}</td>
          <td v-show="!hide_description">{{rowsModel[index].Description}}</td>

          <th v-for="n in record.Values" class="editable" style="text-align: right; cursor: pointer;">
            <div>
              <label>
                {{formatPrice(n)}}
              </label>
            </div>
          </th>


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
    props: ['month', 'month1', 'modelo', 'grupo', 'divition', 'day', 'day1', 'range', 'loaddata'],
    data () {
      return {
        reports: [],
        rowsAll: [],
        rowsModel: [],
        status: 'Ponga los filtros correctos para cargar los datos',
        hide_description: false
      }
    },
    methods: {
      formatPrice: function (value) {
        let val = (value / 1).toFixed(2).replace(',', '.')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      },
      updateList: function () {
        console.log('updateList: function')
        if (this.modelo === null || this.modelo === undefined) {
          this.status = 'No hay datos que mostrar :('
          return
        }
        if (this.range === null || this.range === undefined) {
          this.range = false
        }
        this.rowsModel = []
        for (let i = 0; i < this.rowsAll.length; ++i) {
          if (parseInt(this.rowsAll[i].ModelId) === parseInt(this.modelo.Id)) {
            var element = this.rowsAll[i]
            element.edit = true
            this.rowsModel.push(element)
          }
        }
        console.log('updateList')
        this.year = 2018
        this.reports = []
        this.status = 'Cargando...'
        if (this.range) {
          this.$http.get(encodeURI('http://192.168.100.5:80/datadin2/computed/apaisados?Model=' + this.modelo.Id + '&Year=' + this.year + '&Month=' + this.month + '&Day=' + this.day + '&Month2=' + this.month1 + '&Day2=' + this.day1 + '&Group=' + this.grupo + '&Division=' + this.divition))
            .then(response => {
              this.reports = response.data.Records
              this.columns = response.data.Columns
              if (this.reports.length === 0) {
                this.status = 'No hay datos que mostrar :('
              }
            })
        } else {
          this.$http.get(encodeURI('http://192.168.100.5:80/datadin2/computed/apaisados?Model=' + this.modelo.Id + '&Year=' + this.year + '&Month=' + this.month + '&Day=' + this.day + '&Group=' + this.grupo + '&Division=' + this.divition))
            .then(response => {
              this.reports = response.data.Records
              this.columns = response.data.Columns
              if (this.reports.length === 0) {
                this.status = 'No hay datos que mostrar :('
              }
            })
        }
      },
      updateMonth: function (month) {
        this.month = month
      },
      updateModelo: function (modelo) {
        this.modelo = modelo
      },
      updateDay: function (day) {
        this.day = day
      },
      updateMonth1: function (month1) {
        this.month1 = month1
      },
      updateRange: function (range) {
        this.range = range
      },
      updateDay1: function (day1) {
        this.day1 = day1
      },
      updateGrupo: function (grupo) {
        this.grupo = grupo
      },
      updateDivition: function (divition) {
        this.divition = divition
      }
    },
    created: function () {
      this.$http.get('http://192.168.100.5:80/datadin2/rows')
        .then(response => {
          this.rowsAll = response.data
        })
    },
    watch: {
      day: function (val) {
        console.log('updateDay Newslist.vue')
        this.updateDay(val)
      },
      month: function (val) {
        console.log('updateMonth Newslist.vue')
        this.updateMonth(val)
      },
      loaddata: function () {
        console.log('loadData Newslist.vue')
        this.updateList()
      },
      range: function (val) {
        console.log('range Newslist.vue')
        this.updateRange(val)
      },
      day1: function (val) {
        console.log('updateDay1 Newslist.vue')
        this.updateDay1(val)
      },
      month1: function (val) {
        console.log('updateMonth1 Newslist.vue')
        this.updateMonth1(val)
      },
      modelo: function (val) {
        console.log('updateModelo Newslist.vue')
        this.updateModelo(val)
      },
      grupo: function (val) {
        console.log('updateGrupo Newslist.vue')
        this.updateGrupo(val)
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
