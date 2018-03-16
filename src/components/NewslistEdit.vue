<template>
  <div class="newslist">

    <div style="margin-bottom: 1em;" v-show="locked && records.length && isAdmin">
      <span class="btn btn-danger" v-on:click="unlockModel()">Bloqueado</span>
    </div>

    <div style="margin-bottom: 1em;" v-show="!locked && records.length && isAdmin">
      <span class="btn btn-success" v-on:click="lockModel()">Desbloqueado</span>
    </div>

    <button v-show="isAdmin && records.length" v-on:click="sendData()" style="margin-bottom: 1em;" class="btn btn-success">Importar...</button>
    <input style="visibility: hidden;" id="fileInput" type="file" v-on:change="importData"/>

    <div>
      <p><strong>Ocultar columna descripción</strong> <input v-model="hide_description" type="checkbox" value/></p>
    </div>
    <div class="container" v-if="records.length" style="padding: 0; margin: 0; width: auto;">
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

        <tr v-for="(record, index) in records">
          <td>{{record.RowId}}</td>
          <td v-show="!hide_description">{{rowsModel[index].Description}}</td>

          <th class="editable" style="text-align: right; cursor: pointer;" v-show="modeloX.ColumnCount > 0">
            <div v-show="record.C01Edit === false || locked === true ||  isAdmin === false">
              <label v-on:click="record.C01Edit = true">
                {{formatPrice(record.C01)}}
              </label>
            </div>
            <input v-show="record.C01Edit === true && locked === false && isAdmin === true" v-model="record.C01"
                   v-on:blur="record.C01Edit=false; $emit('update'); edit(record.RowId, 1, record.C01)"
                   @keyup.enter="record.C01Edit=false; $emit('update')"/>
          </th>

          <th class="editable" style="text-align: right; cursor: pointer;" v-show="modeloX.ColumnCount > 1">
            <div v-show="record.C02Edit === false || locked === true ||  isAdmin === false">
              <label v-on:click="record.C02Edit = true">
                {{formatPrice(record.C02)}}
              </label>
            </div>
            <input v-show="record.C02Edit === true && locked === false && isAdmin === true" v-model="record.C02"
                   v-on:blur="record.C02Edit=false; $emit('update'); edit(record.RowId, 2, record.C02)"
                   @keyup.enter="record.C02Edit=false; $emit('update')"/>
          </th>

          <th class="editable" style="text-align: right; cursor: pointer;" v-show="modeloX.ColumnCount > 2">
            <div v-show="record.C03Edit === false || locked === true ||  isAdmin === false">
              <label v-on:click="record.C03Edit = true">
                {{formatPrice(record.C03)}}
              </label>
            </div>
            <input v-show="record.C03Edit === true && locked === false && isAdmin === true" v-model="record.C03"
                   v-on:blur="record.C03Edit=false; $emit('update'); edit(record.RowId, 3, record.C03)"
                   @keyup.enter="record.C03Edit=false; $emit('update')"/>
          </th>

          <th class="editable" style="text-align: right; cursor: pointer;" v-show="modeloX.ColumnCount > 3">
            <div v-show="record.C04Edit === false || locked === true ||  isAdmin === false">
              <label v-on:click="record.C04Edit = true">
                {{formatPrice(record.C04)}}
              </label>
            </div>
            <input v-show="record.C04Edit === true && locked === false && isAdmin === true" v-model="record.C04"
                   v-on:blur="record.C04Edit=false; $emit('update'); edit(record.RowId, 4, record.C04)"
                   @keyup.enter="record.C04Edit=false; $emit('update')"/>
          </th>

          <th class="editable" style="text-align: right; cursor: pointer;" v-show="modeloX.ColumnCount > 4">
            <div v-show="record.C05Edit === false || locked === true ||  isAdmin === false">
              <label v-on:click="record.C05Edit = true">
                {{formatPrice(record.C05)}}
              </label>
            </div>
            <input v-show="record.C05Edit === true && locked === false && isAdmin === true" v-model="record.C05"
                   v-on:blur="record.C05Edit=false; $emit('update'); edit(record.RowId, 5, record.C05)"
                   @keyup.enter="record.C05Edit=false; $emit('update')"/>
          </th>

          <th class="editable" style="text-align: right; cursor: pointer;" v-show="modeloX.ColumnCount > 5">
            <div v-show="record.C06Edit === false || locked === true ||  isAdmin === false">
              <label v-on:click="record.C06Edit = true">
                {{formatPrice(record.C06)}}
              </label>
            </div>
            <input v-show="record.C06Edit === true && locked === false && isAdmin === true" v-model="record.C06"
                   v-on:blur="record.C06Edit=false; $emit('update'); edit(record.RowId, 6, record.C06)"
                   @keyup.enter="record.C06Edit=false; $emit('update')"/>
          </th>

          <th class="editable" style="text-align: right; cursor: pointer;" v-show="modeloX.ColumnCount > 6">
            <div v-show="record.C07Edit === false || locked === true ||  isAdmin === false">
              <label v-on:click="record.C07Edit = true">
                {{formatPrice(record.C07)}}
              </label>
            </div>
            <input v-show="record.C07Edit === true && locked === false && isAdmin === true" v-model="record.C07"
                   v-on:blur="record.C07Edit=false; $emit('update'); edit(record.RowId, 7, record.C07)"
                   @keyup.enter="record.C07Edit=false; $emit('update')"/>
          </th>

          <th class="editable" style="text-align: right; cursor: pointer;" v-show="modeloX.ColumnCount > 7">
            <div v-show="record.C08Edit === false || locked === true ||  isAdmin === false">
              <label v-on:click="record.C08Edit = true">
                {{formatPrice(record.C08)}}
              </label>
            </div>
            <input v-show="record.C08Edit === true && locked === false && isAdmin === true" v-model="record.C08"
                   v-on:blur="record.C08Edit=false; $emit('update'); edit(record.RowId, 8, record.C08)"
                   @keyup.enter="record.C08Edit=false; $emit('update')"/>
          </th>

          <th class="editable" style="text-align: right; cursor: pointer;" v-show="modeloX.ColumnCount > 8">
            <div v-show="record.C09Edit === false || locked === true ||  isAdmin === false">
              <label v-on:click="record.C09Edit = true">
                {{formatPrice(record.C09)}}
              </label>
            </div>
            <input v-show="record.C09Edit === true && locked === false && isAdmin === true" v-model="record.C09"
                   v-on:blur="record.C09Edit=false; $emit('update'); edit(record.RowId, 9, record.C09)"
                   @keyup.enter="record.C09Edit=false; $emit('update')"/>
          </th>
        </tr>
        </tbody>
      </table>
    </div>
    <p style="text-align: center; font-size: 2em;" v-else>{{status}}</p>
  </div>
</template>
<script>
  // var Base64 = require('js-base64').Base64

  export default {
    name: 'newslist',
    props: ['year', 'month', 'reeup', 'modelo', 'grupo', 'divition', 'reload', 'day'],
    data () {
      return {
        modeloX: [],
        rowsAll: [],
        rowsModel: [],
        rows: 0,
        locked: false,
        records: [],
        modelos: [],
        status: '',
        hide_description: false
      }
    },
    methods: {
      importData: function () {
        var file = document.getElementById('fileInput').files[0]
        var reader = new FileReader()
        var self = this
        reader.onloadend = function (e) {
          var result = this.result
          console.log(result)
          // var result64 = Base64.encode(result)
          console.log(result)
          // self.$http.get('http://192.168.100.5:80/datadin2/template/import?Year=' + self.year + '&Month=' + self.month + '&Day=' + self.day + '&ModelId=' + self.modelo.Id + '&EnterpriseId=' + self.reeup + '&ImportData=' + result).then(response => {
          //   document.getElementById('fileInput').value = ''
            // self.updateList()
          // })
          self.$http.post('http://192.168.100.5:80/datadin2/template/import', {
            FileData: result,
            FileName: file.name,
            Year: self.year,
            Month: self.month,
            Day: self.day,
            ModelId: self.modelo.Id,
            EnterpriseId: self.reeup
          }).then(response => {
            self.updateList()
            document.getElementById('fileInput').value = ''
          })
        }

        // reader.readAsText(file)
        reader.readAsDataURL(file)
      },
      sendData: function () {
        document.getElementById('fileInput').click()
      },
      formatPrice: function (value) {
        if (value === undefined || value === null) {
          return 'null'
        }
        let val = (value / 1).toFixed(2).replace(',', '.')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      },
      reloadEvents: function () {
        // var els = document.getElementsByClassName('editable')
        // console.log(els)
        // for (var item of els) {
        //   console.log(item)
        // }
      },
      unlockModel: function () {
        console.log('unlockModel')
        this.$http.get('http://192.168.100.5:80/datadin2/template/lock?Year=' + this.year + '&Month=' + this.month + '&ModelId=' + this.modelo.Id + '&Day=' + this.day + '&Locked=' + false)
          .then(response => {
            this.updateList()
          })
      },
      lockModel: function () {
        console.log('lockModel')
        this.$http.get('http://192.168.100.5:80/datadin2/template/lock?Year=' + this.year + '&Month=' + this.month + '&ModelId=' + this.modelo.Id + '&Day=' + this.day + '&Locked=' + true)
          .then(response => {
            this.updateList()
          })
      },
      edit: function (rowId, column, val) {
        this.$http.get('http://192.168.100.5:80/datadin2/record/value/set?Year=' + this.year + '&Month=' + this.month + '&Day=' + this.day + '&Model=' + this.modeloX.Id + '&Enterprise=' + this.reeup + '&Row=' + rowId + '&Column=' + column + '&Value=' + val)
          .then(response => {
            // this.updateList()
          })
      },
      updateList: function () {
        this.status = 'Cargando...'
        this.records = []
        // var self = this
        // this.modelos.forEach(function (val) {
        //   if (parseInt(val.Id) === parseInt(self.modelo)) {
        //     self.rows = val.ColumnCount
        //   }
        // })
        console.log('updateList')
        this.rowsModel = []
        for (let i = 0; i < this.rowsAll.length; ++i) {
          if (parseInt(this.rowsAll[i].ModelId) === parseInt(this.modelo.Id)) {
            var element = this.rowsAll[i]
            element.edit = true
            this.rowsModel.push(element)
          }
        }
        if (parseInt(this.modelo.FrequencyId) === 2 && parseInt(this.day) !== 1) {
          this.status = 'Este modelo es mensual, debe seleccionar el dia 1'
          return
        }
        this.status = 'Cargando...'
        this.$http.get('http://192.168.100.5:80/datadin2/template/records?Year=' + this.year + '&Month=' + this.month + '&Day=' + this.day + '&ModelId=' + this.modelo.Id + '&EnterpriseId=' + this.reeup)
          .then(response => {
            this.records = response.data.Records
            this.locked = response.data.Template.Locked
            if (this.records.length === 0) {
              this.status = 'No hay datos que mostrar :('
            }
          })

        this.modeloX = this.modelo
      },
      updateMonth: function (month) {
        this.month = month
      },
      updateYear: function (year) {
        this.year = year
      },
      dayChanged: function (day) {
        this.day = day
      },
      updateReeup: function (reeup) {
        this.reeup = reeup
      },
      updateModelo: function (modelo) {
        this.modelo = modelo
        console.log(modelo)
        // this.modelos.forEach(function (val) {
        //   if (val.Id === modelo) {
        //     // this.rows = val.ColumnCount
        //   }
        // })
      },
      updateGrupo: function (grupo) {
        this.grupo = grupo
      },
      updateDivition: function (divition) {
        this.divition = divition
      },
      reloadRecords: function () {
      }
    },
    created: function () {
      this.isAdmin = window.localStorage.getItem('role') === 'admin'
      this.rows = 0
      this.$http.get('http://192.168.100.5:80/datadin2/models')
        .then(response => {
          this.modelos = response.data
        })
      this.$http.get('http://192.168.100.5:80/datadin2/rows')
        .then(response => {
          this.rowsAll = response.data
        })
      this.reloadEvents()
    },
    watch: {
      reload: function () {
        this.updateList()
      },
      modelos: function (val) {
        console.log('modelosYear Newslist.vue')
      },
      day: function (val) {
        console.log('dayChanged Newslist.vue')
        this.dayChanged(val)
      },
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
