<script lang="ts">
import { defineComponent, ref, toRefs, watch } from "vue";
import { ICalcItem } from "@/types/Calc";
import useCalc from "@/hooks/useCalc";

export default defineComponent({
  props: {
    calcItem: {
      type: Object as () => ICalcItem,
    },
  },
  setup(props) {
    const { calcItem } = toRefs(props);
    const { defineAmount } = useCalc(calcItem.value);
    const calcInputValue = ref<number>(0);
    watch(calcInputValue, (value) => {
      const amount = defineAmount(value);
      console.log("amount for sliderValue", amount);
    });
    return {
      calcInputValue,
    };
  },
});
</script>
<template>
  <div class="calculator__item">
    <h3>{{ calcItem?.title }}</h3>
    <a-row class="calculator__row calculator__row--small">
      <a-col span="24">
        <a-input-number
          v-model:value="calcInputValue"
          :min="calcItem.min"
          :max="calcItem.max"
          :step="calcItem.step"
          size="large"
        >
          <template #addonAfter>
            <span style="width: 40px">{{ calcItem?.measure }}</span>
          </template>
        </a-input-number>
      </a-col>
    </a-row>
    <div class="calculator__bottom-container">
      <span class="calculator__label">{{ calcItem?.description }}</span>
    </div>
  </div>
</template>
