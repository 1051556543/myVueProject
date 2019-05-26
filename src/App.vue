<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
#app {
  width: 100%;
  height:1000px;
  font-family: '微软雅黑';
  text-align: center;
  color: #2c3e50;
  background: #E6E6E6;
  padding-top: 100px;
}
</style>
