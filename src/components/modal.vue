<script>
  export default {
    name: 'modal',
    props: ['rowsModal', 'model'],
    methods: {
      close: function () {
        this.$emit('close')
      },
      edit: function (rowId, modelId, description) {
        this.$http.get('http://192.168.43.46:80/datadin2/model/update/row?Id=' + rowId + '&ModelId=' + modelId + '&Description=' + description)
          .then(response => {
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
            Filas del modelo {{model.Id}}
          </slot>
        </header>
        <section
          class="modal-body"
          id="modalDescription" style="height: 22em; overflow-y: scroll;">
          <slot name="body">
            <table class="table table-striped table-bordered table-hover">
              <thead>
              <tr>
                <th>
                  Id
                </th>
                <th>
                  Modelo
                </th>
                <th>
                  Descripcion
                </th>
              </tr>
              <tr v-for="row in rowsModal">
                <td>{{row.Id}}</td>
                <td>{{row.ModelId}}</td>
                <th class="editable" style="text-align: right; cursor: pointer;">
                  <input v-model="row.Description"
                         v-on:blur="$emit('update'); edit(row.Id, row.ModelId, row.Description)"
                         @keyup.enter="$emit('update')"/>
                </th>
              </tr>
              </thead>
            </table>
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <button
              type="button"
              class="btn btn-danger"
              @click="close"
              aria-label="Close modal">Cerrar</button>
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
