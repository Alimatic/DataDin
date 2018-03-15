<template>
  <div class="newslist">

    <div class="container">
      <button v-show="isAdmin" v-on:click.prevent="createModelOpen" class="btn btn-primary">Crear usuario ...</button>
    </div>

    <div class="container" id="create-model" v-show="create_model" style="margin-top: 1em; width: 95% !important;">
      <div class="panel panel-primary">
        <div class="panel-heading">
          Crear un usuario
        </div>
        <div class="panel-body">
          <form>
            <div class="row">
              <div class="col-sm-3">
                <label for="email">Email</label>
                <input name="email" id="email" class="form-control" type="text" v-model="email"/>
              </div>
              <div class="col-sm-3">
                <label for="password">Password</label>
                <input name="password" id="password" class="form-control" type="text" v-model="password"/>
              </div>
              <div class="col-sm-3">
                <label for="name">Nombre</label>
                <input name="name" id="name" class="form-control" type="text" v-model="name"/>
              </div>
              <div class="col-sm-3">
                <label for="empresa">Empresa</label>
                <input name="empresa" id="empresa" class="form-control" type="number" v-model="empresa"/>
              </div>
              <div class="col-sm-3">
                <label for="permiso">Permiso</label>
                <input name="permiso" id="permiso" class="form-control" type="number" v-model="permiso"/>
              </div>
              <div class="col-sm-3">
                <label for="seguridad">Seguridad</label>
                <input name="seguridad" id="seguridad" class="form-control" type="number" v-model="seguridad"/>
              </div>
              <div class="col-sm-3">
                <label for="cuenta">Cuenta</label>
                <input name="cuenta" id="cuenta" class="form-control" type="number" v-model="cuenta"/>
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
          <th>
            Email
          </th>
          <th style="text-align: right;">
            Nombre
          </th>
          <th style="text-align: right;">
            Empresa
          </th>
          <th style="text-align: right;">
            Cuenta
          </th>
          <th style="text-align: right;">
            Permiso
          </th>
          <th style="text-align: right;">
            Seguridad
          </th>
          <th style="text-align: center;">
            Acciones
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="model in models">
          <td>{{model.Id}}</td>
          <td style="text-align: right;">{{model.Email}}</td>
          <td style="text-align: right;">{{model.Name}}</td>
          <td style="text-align: right;">{{model.EnterpriseId}}</td>
          <td style="text-align: right;">{{model.AccountId}}</td>
          <td style="text-align: right;">{{model.Permission}}</td>
          <td style="text-align: right;">{{model.SecurityLevel}}</td>
          <td style="text-align: center;" v-show="isAdmin">
            <button class="btn btn-danger" v-on:click.prevent="deleteModel(model.Id)">Eliminar</button>
            <button class="btn btn-info" v-on:click="showModal(model)">Editar</button>
            <!--<button class="btn btn-success" v-on:click="showModalColumns(model)">Editar columnas</button>-->
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <p style="text-align: center; font-size: 2em;" v-else>{{status}}</p>

    <modaluser :model="model" v-show="isModalVisible" @close="closeModal"></modaluser>
    <!--<modalcolumns :model="model" v-show="isModalColumnsVisible" @close="closeModaColumnsl"></modalcolumns>-->
  </div>
</template>
<script>
  import modaluser from './modaluser'
  import modalcolumns from './modalcolumns'

  export default {
    name: 'newslist',
    components: {
      modaluser, modalcolumns
    },
    data () {
      return {
        model: [],
        isModalVisible: false,
        isModalColumnsVisible: false,
        create_model: false,
        models: [],
        frequencies: [],
        rows: [],
        status: 'Cargando...',
        IsFinalcial: false,
        name: '',
        email: '',
        password: '',
        empresa: '',
        permiso: 0,
        seguridad: 0,
        cuenta: ''
      }
    },
    created: function () {
      this.isAdmin = window.localStorage.getItem('role') === 'admin'
      this.create_model = false
      this.models = []
      this.frequencies = []
      this.rows = []
      this.$http.get('http://192.168.100.5:80/datadin2/user/list')
        .then(response => {
          this.models = response.data
          this.status = 'No hay datos que mostrar'
        })
    },
    methods: {
      showModal: function (model) {
        this.model = model
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
        if (this.seguridad === '') {
          this.seguridad = 0
        }
        if (this.permiso === '') {
          this.permiso = 0
        }
        this.$http.post('http://192.168.100.5:80/datadin2/user/create',
          {
            Email: this.email,
            Name: this.name,
            Password: this.password,
            EnterpriseId: this.empresa,
            Permission: this.permiso,
            SecurityLevel: this.seguridad,
            AccountId: this.cuenta
          })
          .then(response => {
            window.location.reload()
          })
      },
      deleteModel: function (modelId) {
        this.$http.post('http://192.168.100.5:80/datadin2/user/delete',
          {
            Id: modelId
          })
          .then(response => {
            this.$http.get('http://192.168.100.5:80/datadin2/user/list')
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
