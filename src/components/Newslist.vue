<template>
  <div class="newslist">
    <div style="padding-bottom: 1em;">
      <p style="margin-bottom: 1em;" v-show="reports.length"><strong>Ocultar columna descripción</strong> <input
        v-model="hide_description" type="checkbox" value/>
        <span style="float: right;" class="btn btn-success" v-on:click="showGraph()">Graficar</span></p>
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
          <th v-if="modelo.ColumnNames != null" style="text-align: right" v-for="(n, index) in modelo.ColumnCount">
            <input type="checkbox" value :id="'column' + index"/> {{modelo.ColumnNames.split(',')[n-1]}}
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(record, index) in reports">
          <td><input type="checkbox" value :id="'row' + index"/> {{record.RowId}}</td>
          <td :id="'des' + index" v-show="!hide_description">{{rowsModel[index].Description}}</td>

          <th class="editable" style="text-align: right; cursor: pointer;" v-show="modelo.ColumnCount > 0">
            <div>
              <label :id="'label_' + index + '_' + 0">
                {{formatPrice(record.C01)}}
              </label>
            </div>
          </th>
          <th class="editable" style="text-align: right; cursor: pointer;" v-show="modelo.ColumnCount > 1">
            <div>
              <label :id="'label_' + index + '_' + 1">
                {{formatPrice(record.C02)}}
              </label>
            </div>
          </th>
          <th class="editable" style="text-align: right; cursor: pointer;" v-show="modelo.ColumnCount > 2">
            <div>
              <label :id="'label_' + index + '_' + 2">
                {{formatPrice(record.C03)}}
              </label>
            </div>
          </th>
          <th class="editable" style="text-align: right; cursor: pointer;" v-show="modelo.ColumnCount > 3">
            <div>
              <label :id="'label_' + index + '_' + 3">
                {{formatPrice(record.C04)}}
              </label>
            </div>
          </th>
          <th class="editable" style="text-align: right; cursor: pointer;" v-show="modelo.ColumnCount > 4">
            <div>
              <label :id="'label_' + index + '_' + 4">
                {{formatPrice(record.C05)}}
              </label>
            </div>
          </th>
          <th class="editable" style="text-align: right; cursor: pointer;" v-show="modelo.ColumnCount > 5">
            <div>
              <label :id="'label_' + index + '_' + 5">
                {{formatPrice(record.C06)}}
              </label>
            </div>
          </th>
          <th class="editable" style="text-align: right; cursor: pointer;" v-show="modelo.ColumnCount > 6">
            <div>
              <label :id="'label_' + index + '_' + 6">
                {{formatPrice(record.C07)}}
              </label>
            </div>
          </th>
          <th class="editable" style="text-align: right; cursor: pointer;" v-show="modelo.ColumnCount > 7">
            <div>
              <label :id="'label_' + index + '_' + 7">
                {{formatPrice(record.C08)}}
              </label>
            </div>
          </th>
          <th class="editable" style="text-align: right; cursor: pointer;" v-show="modelo.ColumnCount > 8">
            <div>
              <label :id="'label_' + index + '_' + 8">
                {{formatPrice(record.C09)}}
              </label>
            </div>
          </th>
        </tr>
        </tbody>
      </table>
    </div>
    <p style="text-align: center; font-size: 2em;" v-else>{{status}}</p>
    <div
      style='position: absolute; top: 5%; left: 5%; width: 90%; height: 90%; z-index: 999999; background: white; border: 1px solid; padding: 1em;'
      v-show="show_graph">
      <div>
        <h1 style="text-align: center">Modelo: {{modelo.Id}}</h1>
        <div id="canvas_container">
          <canvas id="chart1" width="400" height="100"></canvas>
        </div>
        <div v-for="(ley, index) in leyenda">
          {{ley}}
        </div>
        <div style='bottom: 5%; float: right; position: absolute; right: 5%;'>
          <span class="btn btn-success" v-show="inversed" v-on:click="inverseGraph()">Normal</span>
          <span class="btn btn-success" v-show="!inversed" v-on:click="inverseGraph()">Invertir</span>
          <span class="btn btn-danger" v-on:click="show_graph = false">Cerrar</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  /* eslint-disable no-undef,no-unused-vars */

  export default {
    name: 'newslist',
    props: ['month', 'month1', 'reeup', 'modelo', 'grupo', 'divition', 'day', 'day1', 'range', 'loaddata', 'realtimeC'],
    data () {
      return {
        chartJS: null,
        reports: [],
        rowsAll: [],
        rowsModel: [],
        status: 'Ponga los filtros correctos y luego de click en "Cargar datos"',
        hide_description: false,
        show_graph: false,
        leyenda: [],
        inversed: false
      }
    },
    methods: {
      showGraphNormal: function () {
        this.leyenda = []
        let flag = false
        for (let i = 0; i < this.modelo.ColumnCount; ++i) {
          if (document.getElementById('column' + i).checked) {
            flag = true
          }
        }
        if (flag === false) {
          alert('Debe seleccionar al menos una columna')
          return
        }

        flag = false
        for (let i = 0; i < this.reports.length; ++i) {
          if (document.getElementById('row' + i).checked) {
            flag = true
          }
        }
        if (flag === false) {
          alert('Debe seleccionar al menos una fila')
          return
        }

        let labels = []
        for (let i = 0; i < this.reports.length; ++i) {
          if (document.getElementById('row' + i).checked) {
            let labelName = document.getElementById('des' + i).innerHTML
            labels.push('' + (i + 1))
            this.leyenda.push('Fila ' + (i + 1) + ': ' + labelName)
          }
        }
        let datasets = []

        let chartColors = [
          'rgb(255,  99, 132)',
          'rgb(255, 159,  64)',
          'rgb(255, 205,  86)',
          'rgb( 75, 192, 192)',
          'rgb( 54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
          'rgb(176, 128,  12)',
          'rgb(  0, 128,   0)'
        ]
        this.color = Chart.helpers.color
        for (let j = 0; j < this.modelo.ColumnCount; ++j) {
          if (document.getElementById('column' + j).checked) {
            let data = []
            let backgroundColor = []
            let borderColor = []
            console.log(chartColors.length)
            console.log(this.modelo.ColumnCount)
            console.log(chartColors[j % chartColors.length])
            console.log('-------')
            for (let i = 0; i < this.reports.length; ++i) {
              if (document.getElementById('row' + i).checked) {
                backgroundColor.push(this.color(chartColors[j % chartColors.length]).alpha(0.5).rgbString())
                borderColor.push(chartColors[j % chartColors.length])
                data.push(parseFloat(document.getElementById('label_' + i + '_' + j).innerText.replace(/,/g, '')))
              }
            }
            datasets.push({
              label: this.modelo.ColumnNames.split(',')[j],
              data: data,
              backgroundColor: backgroundColor,
              borderColor: borderColor,
              borderWidth: 1
            })
          }
        }
        var data = {
          labels: labels,
          datasets: datasets
        }
        var options = {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
        this.resetCanvas()
        let ctx = document.getElementById('chart1')
        this.chartJS = new Chart(ctx, {
          type: 'bar',
          data: data,
          options: options
        })
        this.show_graph = true
      },
      inverseGraph: function () {
        if (this.inversed) {
          this.showGraphNormal()
        } else {
          this.showGraphInversed()
        }
        console.log(this.inversed)
        this.inversed = !this.inversed
      },
      showGraphInversed: function () {
        this.leyenda = []
        let flag = false
        for (let i = 0; i < this.modelo.ColumnCount; ++i) {
          if (document.getElementById('column' + i).checked) {
            flag = true
          }
        }
        if (flag === false) {
          alert('Debe seleccionar al menos una columna')
          return
        }

        flag = false
        for (let i = 0; i < this.reports.length; ++i) {
          if (document.getElementById('row' + i).checked) {
            flag = true
          }
        }
        if (flag === false) {
          alert('Debe seleccionar al menos una fila')
          return
        }
        let labels = []
        for (let i = 0; i < this.modelo.ColumnCount; ++i) {
          if (document.getElementById('column' + i).checked) {
            let labelName = this.modelo.ColumnNames.split(',')[i] // document.getElementById('des' + i).innerHTML
            labels.push('' + (i + 1))
            this.leyenda.push('Columna ' + (i + 1) + ': ' + labelName)
          }
        }
        let datasets = []

        let chartColors = [
          'rgb(255,  99, 132)',
          'rgb(255, 159,  64)',
          'rgb(255, 205,  86)',
          'rgb( 75, 192, 192)',
          'rgb( 54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
          'rgb(176, 128,  12)',
          'rgb(  0, 128,   0)'
        ]

        //
        this.color = Chart.helpers.color
        for (let j = 0; j < this.reports.length; ++j) {
          if (document.getElementById('row' + j).checked) {
            let data = []
            let backgroundColor = []
            let borderColor = []
            for (let i = 0; i < this.modelo.ColumnCount; ++i) {
              if (document.getElementById('column' + i).checked) {
                backgroundColor.push(this.color(chartColors[i % chartColors.length]).alpha(0.5).rgbString())
                borderColor.push(chartColors[i % chartColors.length])
                data.push(parseFloat(document.getElementById('label_' + j + '_' + i).innerText.replace(/,/g, '')))
              }
            }
            datasets.push({
              label: document.getElementById('des' + j).innerHTML,
              data: data,
              backgroundColor: backgroundColor,
              borderColor: borderColor,
              borderWidth: 1
            })
          }
        }
        var data = {
          labels: labels,
          datasets: datasets
        }
        var options = {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
        this.resetCanvas()
        let ctx = document.getElementById('chart1')
        this.chartJS = new Chart(ctx, {
          type: 'bar',
          data: data,
          options: options
        })
        this.show_graph = true
      },
      showGraph: function () {
        this.showGraphNormal()
        this.inversed = false
      },
      resetCanvas: function () {
        $('#chart1').remove() // this is my <canvas> element
        $('#canvas_container').append('<canvas id="chart1" width="400" height="100"></canvas>')
      },
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
            let element = this.rowsAll[i]
            element.edit = true
            this.rowsModel.push(element)
          }
        }
        console.log('updateList')
        this.year = 2018
        this.reports = []
        this.status = 'Cargando...'
        if (this.range) {
          this.$http.get(encodeURI('http://192.168.100.5:80/datadin2/computed/records?Model=' + this.modelo.Id + '&Year=' + this.year + '&Month=' + this.month + '&Day=' + this.day + '&Month2=' + this.month1 + '&Day2=' + this.day1 + '&Enterprise=' + this.reeup + '&Group=' + this.grupo + '&Division=' + this.divition + '&PartialData=' + this.realtimeC))
            .then(response => {
              this.reports = response.data
              if (this.reports.length === 0) {
                this.status = 'No hay datos que mostrar :('
              }
            })
        } else {
          this.$http.get(encodeURI('http://192.168.100.5:80/datadin2/computed/records?Model=' + this.modelo.Id + '&Year=' + this.year + '&Month=' + this.month + '&Day=' + this.day + '&Enterprise=' + this.reeup + '&Group=' + this.grupo + '&Division=' + this.divition + '&PartialData=' + this.realtimeC))
            .then(response => {
              this.reports = response.data
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
        this.reports = []
        this.status = 'Ponga los filtros correctos y luego de click en "Cargar datos"'
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
      updateReeup: function (reeup) {
        this.reeup = reeup
      },
      updateGrupo: function (grupo) {
        this.grupo = grupo
      },
      updateDivition: function (divition) {
        this.divition = divition
      },
      updateRealtime: function (realtime) {
        this.realtimeC = realtime
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
      reeup: function (val) {
        console.log('updateReeup Newslist.vue')
        this.updateReeup(val)
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
      },
      realtimeC: function (val) {
        console.log('updateRealTime Newslist.vue')
        this.updateRealtime(val)
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
