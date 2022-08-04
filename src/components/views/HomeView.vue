<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import CalculatorView from "@/components/calculator/CalculatorView.vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  components: { CalculatorView },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const visible = ref<boolean>(false);

    watch(route, () => {
      checkRouter();
    });

    onMounted(() => {
      checkRouter();
    });

    const pushModalLink = () => {
      router.push("/#?calculator=true");
    };

    const removeModalLink = () => {
      router.push("/");
    };

    const checkRouter = () => {
      if (/calculator=true/gm.test(route.fullPath)) {
        showModal();
      } else {
        closeModal();
      }
    };

    const showModal = () => {
      visible.value = true;
    };

    const closeModal = () => {
      visible.value = false;
    };

    return {
      pushModalLink,
      removeModalLink,
      visible,
    };
  },
});
</script>
<template>
  <div class="home">
    <a-modal
      title="Калькулятор"
      width="100%"
      :visible="visible"
      @cancel="removeModalLink"
    >
      <div class="container">
        <calculator-view />
      </div>
      <template #footer>
        <a-button key="back" @click="removeModalLink">
          Закрыть калькулятор
        </a-button>
      </template>
    </a-modal>
  </div>
</template>
<style lang="less">
.home {
  .ant-modal-body {
    padding: 0 !important;
  }
}
</style>
