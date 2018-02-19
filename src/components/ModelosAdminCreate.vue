<template>
  <div class="newslist">
    <div class="container">
      <div class="panel panel-primary">
        <div class="panel-heading">
          Create a model
        </div>
        <div class="panel-body">
          <form v-on:submit.prevent="createModel">
            <div class="row">
              <div class="col-sm-3">
                <label for="Id">Id</label>
                <input name="Id" id="Id" class="form-control" type="text"/>
              </div>
              <div class="col-sm-3">
                <label for="RowCount">RowCount</label>
                <input name="RowCount" id="RowCount" class="form-control" type="text"/>
              </div>
              <div class="col-sm-3">
                <label for="ColumnCount">ColumnCount</label>
                <input name="ColumnCount" id="ColumnCount" class="form-control" type="text"/>
              </div>
              <div class="col-sm-3">
                <label for="FrequencyId">FrequencyId</label>
                <input name="FrequencyId" id="FrequencyId" class="form-control" type="text"/>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <label for="Description">Description</label>
                <textarea name="Description" id="Description" class="form-control" type="text"></textarea>
              </div>
            </div>
            <div class="row" style="margin-top: 2em;">
              <div class="col-sm-3">
                <button class="btn btn-primary">Create</button>
                <button class="btn btn-primary">Cancel</button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'newslist',
    data () {
      return {}
    },
    methods: {
      createModel: function (e) {
        console.log('send')
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
