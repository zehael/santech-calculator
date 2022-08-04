<script lang="ts"></script>
<template>
  <router-view />
</template>

<style lang="less">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 10px 0;
  overflow: hidden;
}

.breakpoint(mobile; {
  .container {
    margin: 0;
  }
});
</style>
