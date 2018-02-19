<template>

  <div>

    <div class="container" id="app" style="margin: 2em; width: auto; text-align: center;">

      <a href="#ef" class="btn btn-success">Consulta</a>

      <a href="#edit" class="btn btn-success">Edicion</a>

      <a href="#modelosadmin/list" class="btn btn-success">Modelos</a>

      <!--<a href="#filas" class="btn btn-success">Filas</a>-->

      <a href="#empresas" class="btn btn-success">Empresas</a>

      <!--<a href="#divisiones" class="btn btn-success">Divisiones - Grupo</a>-->

      <a href="#logout" class="btn btn-danger">Logout</a>

    </div>

    <div>

      <router-view></router-view>

    </div>

  </div>

</template>
