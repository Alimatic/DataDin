<template>
  <div class="newslist">

    <div class="container">
      <button v-show="isAdmin" v-on:click.prevent="createModelOpen" class="btn btn-primary">Anadir modelo ...</button>
    </div>

    <div class="container" id="create-model" v-show="create_model" style="margin-top: 1em; width: 95% !important;">
      <div class="panel panel-primary">
        <div class="panel-heading">
          Create a model
        </div>
        <div class="panel-body">
          <form>
            <div class="row">
              <div class="col-sm-3">
                <label for="Id">Id de modelo</label>
                <input name="Id" id="Id" class="form-control" type="text" v-model="Id"/>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-3">
                <label for="RowCount">Cantidad de filas</label>
                <input name="RowCount" id="RowCount" class="form-control" type="text" v-model="RowCount"/>
              </div>
              <div class="col-sm-3">
                <label for="ColumnCount">Cantidad de columnas</label>
                <input name="ColumnCount" id="ColumnCount" class="form-control" type="text" v-model="ColumnCount"/>
              </div>
              <div class="col-sm-3">
                <label for="FrequencyId">Frecuencia</label>
                <select v-model="FrequencyId" name="FrequencyId" id="FrequencyId" class="form-control">
                  <option v-bind:value="frequencie.Id" v-for="frequencie in frequencies">{{frequencie.Name}}</option>
                </select>
              </div>
              <div class="col-sm-3">
                <label for="Id">Modelo EF</label>
                <input name="IsFinalcial" id="IsFinalcial" class="form-control" type="checkbox" v-model="IsFinalcial"/>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <label for="ColumnsName">Nombres de las columnas separados por comas</label>
                <textarea name="ColumnsName" id="ColumnsName" class="form-control" type="text"
                          v-model="ColumnsName"></textarea>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <label for="Description">Descripcion</label>
                <textarea name="Description" id="Description" class="form-control" type="text"
                          v-model="Descripcion"></textarea>
              </div>
            </div>
            <div class="row" style="margin-top: 2em;" v-show="isAdmin">
              <div class="col-sm-3">
                <button class="btn btn-primary" v-on:click.prevent="createModel">Create</button>
                <button class="btn btn-primary" v-on:click.prevent="cancelModelOpen">Cancel</button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>

    <div class="container" v-if="models.length" style="margin-top: 1em;">
      <table class="table table-striped table-bordered table-hover">
        <thead>
        <tr>
          <th>
            Id
          </th>
          <th style="text-align: right;">
            Cantidad de filas
          </th>
          <th style="text-align: right;">
            Cantidad de columnas
          </th>
          <th style="text-align: right;">
            Frecuencia
          </th>
          <th style="text-align: right;">
            Descripcion
          </th>
          <th style="text-align: right;">
            Nombres de las columnas
          </th>
          <th style="text-align: center;" v-show="isAdmin">
            Acciones
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="model in models">
          <td>{{model.Id}}</td>
          <td style="text-align: right;">{{model.RowCount}}</td>
          <td style="text-align: right;">{{model.ColumnCount}}</td>
          <td style="text-align: right;">{{model.FrequencyId}}</td>
          <td style="text-align: right;">{{model.Description}}</td>
          <td style="text-align: right;">{{model.ColumnNames}}</td>
          <td style="text-align: center;" v-show="isAdmin">
            <button class="btn btn-danger" v-on:click.prevent="deleteModel(model.Id)">Eliminar</button>
            <button class="btn btn-info" v-on:click="showModal(model)">Ver filas</button>
            <button class="btn btn-success" v-on:click="showModalColumns(model)">Editar columnas</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <p style="text-align: center; font-size: 2em;" v-else>{{status}}</p>

    <modal :rowsModal="rowsModal" :model="model" v-show="isModalVisible" @close="closeModal"></modal>
    <modalcolumns :model="model" v-show="isModalColumnsVisible" @close="closeModaColumnsl"></modalcolumns>
  </div>
</template>
<script>
  import modal from './modal'
  import modalcolumns from './modalcolumns'

  export default {
    name: 'newslist',
    components: {
      modal, modalcolumns
    },
    data () {
      return {
        model: null,
        filas: ['carlos'],
        isModalVisible: false,
        isModalColumnsVisible: false,
        create_model: false,
        models: [],
        frequencies: [],
        rows: [],
        rowsModal: [],
        status: 'Cargando...',
        IsFinalcial: false,
        Id: '',
        RowCount: '',
        ColumnCount: '',
        FrequencyId: '',
        ColumnsName: '',
        Descripcion: ''
      }
    },
    created: function () {
      this.isAdmin = window.localStorage.getItem('token') === 'admin'
      this.create_model = false
      this.models = []
      this.frequencies = []
      this.rows = []
      this.$http.get('http://192.168.43.46:80/datadin2/models')
        .then(response => {
          this.models = response.data
          this.status = 'No hay datos que mostrar'
        })
      this.$http.get('http://192.168.43.46:80/datadin2/frequencies')
        .then(response => {
          this.frequencies = response.data
          this.FrequencyId = 2
        })
      this.$http.get('http://192.168.43.46:80/datadin2/rows')
        .then(response => {
          this.rows = response.data
        })
    },
    methods: {
      showModal: function (model) {
        // console.log('model.Id       >> ' + model.Id)
        this.model = model
        this.rowsModal = []
        for (let i = 0; i < this.rows.length; ++i) {
          if (parseInt(this.rows[i].ModelId) === parseInt(model.Id)) {
            var element = this.rows[i]
            element.edit = true
            this.rowsModal.push(element)
          }
        }
        // console.log('this.rows      >> ' + this.this.rows)
        // console.log('this.rowsModal >> ' + this.rowsModal.length)
        this.isModalVisible = true
      },
      showModalColumns: function (model) {
        this.model = model
        this.isModalColumnsVisible = true
      },
      closeModal: function () {
        this.isModalVisible = false
      },
      closeModaColumnsl: function () {
        this.isModalColumnsVisible = false
      },
      createModel: function (e) {
        console.log(this.FrequencyId)
        this.$http.get('http://192.168.43.46:80/datadin2/model/create?Id=' + this.Id + '&RowCount=' + this.RowCount + '&ColumnCount=' + this.ColumnCount + '&FrequencyId=' + this.FrequencyId + '&IsEFModel=' + this.IsFinalcial + '&Description=' + this.Descripcion + '&ColumnNames=' + this.ColumnsName)
          .then(response => {
            window.location.reload()
            // this.Id = 0
            // this.RowCount = 0
            // this.ColumnCount = 0
            // this.FrequencyId = 2
            // this.IsFinalcial = false
            // this.create_model = false
            // this.ColumnsName = ''
            // this.Descripcion = ''
            // this.$http.get('http://192.168.43.46:80/datadin2/models')
            //   .then(response => {
            //     this.models = response.data
            //     this.status = 'No hay datos que mostrar'
            //   })
          })
      },
      deleteModel: function (modelId) {
        this.$http.get('http://192.168.43.46:80/datadin2/model/delete/?' + modelId)
          .then(response => {
            this.$http.get('http://192.168.43.46:80/datadin2/models')
              .then(response => {
                this.models = response.data
                this.status = 'No hay datos que mostrar'
              })
          })
      },
      createModelOpen: function (e) {
        this.create_model = !this.create_model
      },
      cancelModelOpen: function (e) {
        this.create_model = false
      }
    },
    watch: {}
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
