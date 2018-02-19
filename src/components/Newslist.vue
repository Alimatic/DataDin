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
          <th v-if="modeloX.ColumnNames != null" style="text-align: right" v-for="n in modeloX.ColumnCount">
            {{modeloX.ColumnNames.split(',')[n-1]}}
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(record, index) in reports">
          <td>{{record.RowId}}</td>
          <td v-show="!hide_description">{{rowsModel[index].Description}}</td>

          <th class="editable" style="text-align: right; cursor: pointer;" v-show="modeloX.ColumnCount > 0">
            <div>
              <label>
                {{formatPrice(record.C01)}}
              </label>
            </div>
          </th>
          <th class="editable" style="text-align: right; cursor: pointer;" v-show="modeloX.ColumnCount > 1">
            <div>
              <label>
                {{formatPrice(record.C02)}}
              </label>
            </div>
          </th>
          <th class="editable" style="text-align: right; cursor: pointer;" v-show="modeloX.ColumnCount > 2">
            <div>
              <label>
                {{formatPrice(record.C03)}}
              </label>
            </div>
          </th>
          <th class="editable" style="text-align: right; cursor: pointer;" v-show="modeloX.ColumnCount > 3">
            <div>
              <label>
                {{formatPrice(record.C04)}}
              </label>
            </div>
          </th>
          <th class="editable" style="text-align: right; cursor: pointer;" v-show="modeloX.ColumnCount > 4">
            <div>
              <label>
                {{formatPrice(record.C05)}}
              </label>
            </div>
          </th>
          <th class="editable" style="text-align: right; cursor: pointer;" v-show="modeloX.ColumnCount > 5">
            <div>
              <label>
                {{formatPrice(record.C06)}}
              </label>
            </div>
          </th>
          <th class="editable" style="text-align: right; cursor: pointer;" v-show="modeloX.ColumnCount > 6">
            <div>
              <label>
                {{formatPrice(record.C07)}}
              </label>
            </div>
          </th>
          <th class="editable" style="text-align: right; cursor: pointer;" v-show="modeloX.ColumnCount > 7">
            <div>
              <label>
                {{formatPrice(record.C08)}}
              </label>
            </div>
          </th>
          <th class="editable" style="text-align: right; cursor: pointer;" v-show="modeloX.ColumnCount > 8">
            <div>
              <label>
                {{formatPrice(record.C09)}}
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
    props: ['year', 'month', 'reeup', 'modelo', 'grupo', 'divition', 'day'],
    data () {
      return {
        modeloX: [],
        reports: [],
        rowsAll: [],
        rowsModel: [],
        status: 'Cargando...',
        hide_description: false
      }
    },
    methods: {
      formatPrice: function (value) {
        let val = (value / 1).toFixed(2).replace(',', '.')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      },
      updateList: function (month, year, reeup, modelo, grupo, divition) {
        if (modelo === null || modelo === undefined) {
          this.status = 'No hay datos que mostrar :('
          return
        }
        this.rowsModel = []
        for (let i = 0; i < this.rowsAll.length; ++i) {
          if (parseInt(this.rowsAll[i].ModelId) === parseInt(modelo.Id)) {
            var element = this.rowsAll[i]
            element.edit = true
            this.rowsModel.push(element)
          }
        }
        console.log('updateList')
        modelo = modelo.Id
        year = year === 0 ? 2018 : year
        this.reports = []
        this.status = 'Cargando...'
        this.$http.get(encodeURI('http://192.168.43.46:80/datadin2/computed/records?Model=' + modelo + '&Year=' + year + '&Month=' + month + '&Day=' + this.day + '&Enterprise=' + reeup + '&Group=' + grupo + '&Division=' + divition))
          .then(response => {
            this.reports = response.data
            if (this.reports.length === 0) {
              this.status = 'No hay datos que mostrar :('
            }
          })

        this.modeloX = this.modelo
      },
      updateMonth: function (month) {
        this.month = month
        this.updateList(this.month, this.year, this.reeup, this.modelo, this.grupo, this.divition)
      },
      updateYear: function (year) {
        this.year = year
        this.updateList(this.month, this.year, this.reeup, this.modelo, this.grupo, this.divition)
      },
      updateDay: function (day) {
        this.day = day
        this.updateList(this.month, this.year, this.reeup, this.modelo, this.grupo, this.divition)
      },
      updateReeup: function (reeup) {
        this.reeup = reeup
        this.updateList(this.month, this.year, this.reeup, this.modelo, this.grupo, this.divition)
      },
      updateModelo: function (modelo) {
        this.modeloX = modelo
        this.updateList(this.month, this.year, this.reeup, this.modelo, this.grupo, this.divition)
      },
      updateGrupo: function (grupo) {
        this.grupo = grupo
        this.updateList(this.month, this.year, this.reeup, this.modelo, this.grupo, this.divition)
      },
      updateDivition: function (divition) {
        this.divition = divition
        this.updateList(this.month, this.year, this.reeup, this.modelo, this.grupo, this.divition)
      }
    },
    created: function () {
      this.$http.get('http://192.168.43.46:80/datadin2/rows')
        .then(response => {
          this.rowsAll = response.data
        })
      this.updateList(this.month, this.year, this.reeup, this.modelo, this.grupo, this.divition)
    },
    watch: {
      year: function (val) {
        console.log('updateYear Newslist.vue')
        this.updateYear(val)
      },
      day: function (val) {
        console.log('updateDay Newslist.vue')
        this.updateDay(val)
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
