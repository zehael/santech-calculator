<script lang="ts">
import { defineComponent, ref } from "vue";
import CalcSlider from "@/components/CalcSlider.vue";
import { ICalcItem, Measure } from "@/types/Calc";
import CalcInputNumber from "@/components/CalcInputNumber.vue";
import CalcRadioButtonGroupSelector from "@/components/CalcRadioButtonGroupSelector.vue";
import CalcSwitchSelector from "@/components/CalcSwitchSelector.vue";
import CalcDynamicInputSelector from "@/components/CalcDynamicInputSelector.vue";

export default defineComponent({
  components: {
    CalcDynamicInputSelector,
    CalcSwitchSelector,
    CalcRadioButtonGroupSelector,
    CalcInputNumber,
    CalcSlider,
  },
  setup() {
    const calcItems = ref<ICalcItem[]>([
      {
        id: 1,
        title: "Монтаж труб для холодной и горячей воды (монтаж + изоляция)",
        description: "Укажите метраж труб",
        min: 0,
        max: 40,
        step: 10,
        measure: Measure.MP,
        prices: [
          {
            id: 1,
            label: "до 20",
            amount: 7000,
            valueOfMax: 20,
          },
          {
            id: 1,
            label: "от 20 до 40",
            amount: 12000,
            valueOfMin: 20,
            valueOfMax: 40,
          },
          {
            id: 2,
            label: "более 40",
            amount: 250,
            valueOfMin: 40,
          },
        ],
      },
      {
        id: 2,
        title: "Монтаж труб для канализации",
        description: "Укажите метраж труб",
        min: 0,
        max: 40,
        step: 10,
        measure: Measure.MP,
        prices: [
          {
            id: 1,
            label: "Фиксированно за 1 м.п.",
            amount: 300,
            valueOfMin: 1,
          },
        ],
      },
      {
        id: 3,
        title: "Устройство штробы труб ХГВС",
        description: `Укажите ${Measure.MP}`,
        min: 0,
        max: 100,
        step: 5,
        measure: Measure.MP,
        prices: [
          {
            id: 1,
            label: "Фиксированно за 1 м.п.",
            amount: 330,
            valueOfMin: 1,
          },
        ],
      },
      {
        id: 4,
        title: "Устройство штробы труб для канализации",
        description: `Укажите ${Measure.MP}`,
        min: 0,
        max: 100,
        step: 5,
        measure: Measure.MP,
        prices: [
          {
            id: 1,
            label: "Фиксированно за 1 м.п.",
            amount: 330,
            valueOfMin: 1,
          },
        ],
      },
      {
        id: 5,
        title: "Шумоизоляция стояка до 3 м.",
        description: `Укажите количество стояков`,
        min: 0,
        max: 3,
        step: 1,
        measure: Measure.PCS,
        prices: [
          {
            id: 1,
            label: `Фиксированно за ${Measure.PCS}`,
            amount: 2800,
            valueOfMin: 1,
          },
        ],
      },
      {
        id: 6,
        title: "Монтаж смесителя",
        description: `Укажите количество`,
        min: 0,
        max: 100,
        step: 1,
        measure: Measure.PCS,
        prices: [
          {
            id: 1,
            label: "Встроенный",
            amount: 2800,
            valueOfMin: 1,
          },
          {
            id: 2,
            label: "Обычный",
            amount: 1500,
            valueOfMin: 1,
          },
        ],
      },
      {
        id: 7,
        title: "Монтаж точки потребления",
        description: `Укажите количество`,
        min: 0,
        max: 100,
        step: 1,
        measure: Measure.PCS,
        prices: [
          {
            id: 1,
            label: `Фиксированно за ${Measure.PCS}`,
            amount: 1500,
            valueOfMin: 1,
          },
        ],
      },
      {
        id: 8,
        title: "Монтаж блока гигиенического душа",
        description: `Укажите количество`,
        min: 0,
        max: 100,
        step: 1,
        measure: Measure.PCS,
        prices: [
          {
            id: 1,
            label: `Фиксированно за ${Measure.PCS}`,
            amount: 1500,
            valueOfMin: 1,
          },
        ],
      },
    ]);
    return {
      calcItems,
    };
  },
});
</script>
<template>
  <div class="calculator">
    <CalcSlider :calc-item="calcItems[0]" />
    <CalcSlider :calc-item="calcItems[1]" />
    <CalcInputNumber :calc-item="calcItems[2]" />
    <CalcInputNumber :calc-item="calcItems[3]" />
    <CalcSlider :calc-item="calcItems[4]" />
    <CalcRadioButtonGroupSelector :calc-item="calcItems[5]" />
    <CalcDynamicInputSelector :calc-item="calcItems[6]" />
    <CalcSwitchSelector :calc-item="calcItems[7]" />
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

    .ant-space-item {
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
