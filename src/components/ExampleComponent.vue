<template>

  <div class="container" id="app" style="margin: 2em; width: auto;">

    <SourceSelectionEmpresas v-on:divitionChanged="divitionChanged"
                             v-on:grupoChanged="grupoChanged"></SourceSelectionEmpresas>
    <NewslistEmpresas v-bind:divition="divition" v-bind:grupo="grupo"></NewslistEmpresas>

  </div>
</template>
