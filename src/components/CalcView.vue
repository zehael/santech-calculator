<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import CalcSlider from "@/components/CalcSlider.vue";
import { ICalcItem } from "@/types/Calc";
import CalcInputNumber from "@/components/CalcInputNumber.vue";
import CalcRadioButtonGroupSelector from "@/components/CalcRadioButtonGroupSelector.vue";
import CalcSwitchSelector from "@/components/CalcSwitchSelector.vue";
import CalcDynamicInputSelector from "@/components/CalcDynamicInputSelector.vue";
import { useStore } from "vuex";
import CalcResult from "@/components/CalcResult.vue";

export default defineComponent({
  components: {
    CalcResult,
    CalcDynamicInputSelector,
    CalcSwitchSelector,
    CalcRadioButtonGroupSelector,
    CalcInputNumber,
    CalcSlider,
  },
  setup() {
    const store = useStore();
    const calcItems = computed<ICalcItem[]>(() => store.getters.calcItems);
    onMounted(() => {
      store.dispatch("fetchCalcItems");
      store.dispatch("fetchMarkups");
    });
    return {
      calcItems,
    };
  },
});
</script>
<template>
  <div v-if="calcItems.length" class="calculator">
    <CalcSlider :calc-item="calcItems[0]" />
    <CalcSlider :calc-item="calcItems[1]" />
    <CalcInputNumber :calc-item="calcItems[2]" />
    <CalcInputNumber :calc-item="calcItems[3]" />
    <CalcSlider :calc-item="calcItems[4]" />
    <CalcRadioButtonGroupSelector :calc-item="calcItems[5]" />
    <CalcDynamicInputSelector :calc-item="calcItems[6]" />
    <CalcSwitchSelector :calc-item="calcItems[7]" />
    <CalcSwitchSelector :calc-item="calcItems[8]" />
    <CalcSwitchSelector :calc-item="calcItems[9]" />
    <CalcSwitchSelector :calc-item="calcItems[10]" />
    <CalcSwitchSelector :calc-item="calcItems[11]" />
    <CalcSwitchSelector :calc-item="calcItems[12]" />
    <CalcResult />
  </div>
</template>
<style lang="less">
.calculator {
  &__item {
    width: 600px;
    border: 1px solid @primary-color;
    padding: 10px 40px 10px;
    border-radius: @border-radius-base;
    position: relative;
    margin-bottom: 20px;
  }

  &__row {
    margin: 40px 0 20px;
    align-items: center;

    &--small {
      margin: 20px 0 0;
    }
  }

  &__col {
    display: flex;
    align-items: center;

    &--right {
      justify-content: flex-end;
    }

    > .ant-space-item {
      width: 100% !important;
    }
  }

  &__slider {
    margin-right: 20px;
  }

  &__bottom-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__label {
    margin-top: 20px;
    text-transform: uppercase;
    font-weight: 400;
    color: #d9d9d9;
  }
}
</style>
