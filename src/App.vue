<template>
  <section :class="bem('header')">
    <slot name="header"></slot>
  </section>
  <section :class="bem('toolbar')">
    <slot name="toolbar"></slot>
  </section>
  <div :class="bem('content')">
    <RouterView />
  </div>
</template>
<script setup>
import { RouterView } from 'vue-router'
import { createNamespace } from './utils/create.js'
const [ _, bem ] = createNamespace('app','hx')
</script>
<style lang="less">
html,
body{
  margin:0;
  padding:0;
  width: 100%;
  height: 100%;
}

#app{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #F7F7F9;
  padding-bottom: 20px;

  .hx-app-header{
    height: 65px;
  }

  .hx-app-toolbar{
    height: 60px;
  }

  .hx-app-content{
    flex: 1;
    overflow-y: auto;
  }
}


</style>
