<template>
  <div class="container">
    <calc-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CalcView from "@/components/CalcView.vue";

export default defineComponent({
  name: "App",
  components: {
    CalcView,
  },
});
</script>

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
  margin: 50px 0;
}
</style>
