<template>
  <router-view />
</template>

<script setup lang="ts">
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  background: #020918;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
}

#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  font-family: "Microsoft YaHei", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #eef8ff;
  font-size: 14px;
  line-height: 1.6;
}
</style>