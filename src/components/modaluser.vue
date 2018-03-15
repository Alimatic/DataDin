<script>
  export default {
    name: 'modaluser',
    props: ['model'],
    methods: {
      close: function () {
        this.$emit('close')
      },
      updateModel: function () {
        if (this.model.AccountId === null) {
          this.model.AccountId = ''
        }
        if (this.model.Password === null) {
          this.model.Password = ''
        }
        if (this.model.EnterpriseId === null) {
          this.model.EnterpriseId = ''
        }
        this.$http.post('http://192.168.100.5:80/datadin2/user/update',
          {
            Email: this.model.Email,
            Name: this.model.Name,
            Password: this.model.Password,
            EnterpriseId: this.model.EnterpriseId,
            Permission: this.model.Permission,
            SecurityLevel: this.model.SecurityLevel,
            AccountId: this.model.AccountId,
            Id: this.model.Id
          })
          .then(response => {
            this.$emit('close')
          })
      }
    }
  }
</script>
<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal" style="padding: 0px 20px;"
           role="dialog"
           aria-labelledby="modalTitle"
           aria-describedby="modalDescription">
        <header
          class="modal-header"
          id="modalTitle">
          <slot name="header">
          </slot>
        </header>
        <section
          class="modal-body"
          id="modalDescription" style="height: 22em; overflow-y: scroll;">
          <slot name="body">
            <div class="container" id="create-model" style="margin-top: 1em; width: 95% !important;">
              <div class="panel panel-primary">
                <div class="panel-heading">
                  Crear un usuario
                </div>
                <div class="panel-body">
                  <form>
                    <div class="row">
                      <div class="col-sm-3">
                        <label for="email">Email</label>
                        <input name="email" id="email" class="form-control" type="text" v-model="model.Email"/>
                      </div>
                      <div class="col-sm-3">
                        <label for="password">Password</label>
                        <input name="password" id="password" class="form-control" type="text" v-model="model.Password"/>
                      </div>
                      <div class="col-sm-3">
                        <label for="name">Nombre</label>
                        <input name="name" id="name" class="form-control" type="text" v-model="model.Name"/>
                      </div>
                      <div class="col-sm-3">
                        <label for="empresa">Empresa</label>
                        <input name="empresa" id="empresa" class="form-control" type="number"
                               v-model="model.EnterpriseId"/>
                      </div>
                      <div class="col-sm-3">
                        <label for="permiso">Permiso</label>
                        <input name="permiso" id="permiso" class="form-control" type="number"
                               v-model="model.Permission"/>
                      </div>
                      <div class="col-sm-3">
                        <label for="seguridad">Seguridad</label>
                        <input name="seguridad" id="seguridad" class="form-control" type="number"
                               v-model="model.SecurityLevel"/>
                      </div>
                      <div class="col-sm-3">
                        <label for="cuenta">Cuenta</label>
                        <input name="cuenta" id="cuenta" class="form-control" type="number" v-model="model.AccountId"/>
                      </div>
                    </div>
                    <div class="row" style="margin-top: 2em;">
                      <div class="col-sm-3">
                        <button class="btn btn-primary" v-on:click.prevent="updateModel">Actualizar</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <button
              type="button"
              class="btn btn-danger"
              @click="close"
              aria-label="Close modal">Cerrar
            </button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    width: 600px;
    margin-top: 5em;
    margin-left: auto;
    margin-right: auto;
    height: 30em;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    border: none;
    font-size: 20px;
    padding: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }
</style>
