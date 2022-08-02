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
    const resultIsLoading = computed<boolean>(
      () => store.getters.resultLoading
    );
    onMounted(() => {
      store.dispatch("fetchCalcItems");
      store.dispatch("fetchMarkups");
    });
    return {
      calcItems,
      resultIsLoading,
    };
  },
});
</script>
<template>
  <div v-if="calcItems.length" class="calculator">
    <CalcSlider
      :calc-item="calcItems[0]"
      :result-is-loading="resultIsLoading"
    />
    <CalcSlider
      :calc-item="calcItems[1]"
      :result-is-loading="resultIsLoading"
    />
    <CalcInputNumber
      :calc-item="calcItems[2]"
      :result-is-loading="resultIsLoading"
    />
    <CalcInputNumber
      :calc-item="calcItems[3]"
      :result-is-loading="resultIsLoading"
    />
    <CalcSlider
      :calc-item="calcItems[4]"
      :result-is-loading="resultIsLoading"
    />
    <CalcRadioButtonGroupSelector
      :calc-item="calcItems[5]"
      :result-is-loading="resultIsLoading"
    />
    <CalcDynamicInputSelector
      :calc-item="calcItems[6]"
      :result-is-loading="resultIsLoading"
    />
    <CalcSwitchSelector
      :calc-item="calcItems[7]"
      :result-is-loading="resultIsLoading"
    />
    <CalcSwitchSelector
      :calc-item="calcItems[8]"
      :result-is-loading="resultIsLoading"
    />
    <CalcSwitchSelector
      :calc-item="calcItems[9]"
      :result-is-loading="resultIsLoading"
    />
    <CalcSwitchSelector
      :calc-item="calcItems[10]"
      :result-is-loading="resultIsLoading"
    />
    <CalcSwitchSelector
      :calc-item="calcItems[11]"
      :result-is-loading="resultIsLoading"
    />
    <CalcSwitchSelector
      :calc-item="calcItems[12]"
      :result-is-loading="resultIsLoading"
    />
    <CalcResult />
  </div>
</template>
<style lang="less">
.calculator {
  &__item {
    width: 600px;
    border: 1px solid rgba(@primary-color, 48%) !important;
    border-radius: @border-radius-base;
    position: relative;
    margin-bottom: 30px !important;

    &--active {
      border: 1px solid @primary-color !important;
      box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
    }
  }

  &__row {
    margin: 40px 0 20px;
    align-items: center;

    &--small {
      margin: 20px 0 0;
    }

    &--tile {
      padding: 0;
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

.breakpoint(mobile; {
  .calculator {
    width: 100%;
    padding: 5px;

    &__item {
      width: 100%;
    }

    &__label {
      margin-top: 0;
    }

    &__row {
      margin: 40px 0 10px;
    }
  }

  .calculator__row--tile {
    padding-left: 10px;
    padding-right: 25px;
  }
});
</style>
