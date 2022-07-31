<script lang="ts">
import { defineComponent, onMounted, ref, toRefs, watch } from "vue";
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
    const sliderValue = ref<number>(0);
    const marks = ref<Record<number, string | any>>({
      0: "0°C",
      10: "26°C",
      20: "37°C",
      30: "37°C",
      40: {
        style: {
          color: "#f50",
        },
        label: "100°C",
      },
    });
    const { defineAmount } = useCalc(calcItem.value);

    onMounted(() => {
      createMarks();
    });

    watch(sliderValue, (value) => {
      defineAmount(value);
    });

    const createMarks = () => {
      const min = calcItem?.value?.min || 0;
      const max = calcItem.value?.max || 0;
      const step = calcItem.value?.step || 1;
      let marksObject: any = {};
      if (!calcItem.value?.marks) {
        for (let i = max; i >= min; i = i - step) {
          marksObject[i] = `${i} ${calcItem.value?.measure}`;
        }
      }

      if (calcItem.value?.marks?.length) {
        calcItem.value.marks.forEach((markNum) => {
          marksObject[markNum] = `${markNum} ${calcItem.value?.measure}`.trim();
        });
      }
      marks.value = marksObject;
    };

    const formatter = (value: number) => {
      if (value < sliderValue.value) {
        return `${sliderValue.value} ${calcItem.value?.measure}`;
      }
      return `${value} ${calcItem.value?.measure}`;
    };

    return {
      sliderValue,
      marks,
      formatter,
    };
  },
});
</script>
<template>
  <div class="calculator__item">
    <h3>{{ calcItem?.title }}</h3>
    <a-row class="calculator__row">
      <a-col span="20">
        <div class="calculator__slider">
          <a-slider
            :step="calcItem.step"
            :min="calcItem.min"
            :max="calcItem.max"
            :marks="marks"
            v-model:value="sliderValue"
            :tooltip-visible="true"
            :tip-formatter="formatter"
          />
        </div>
      </a-col>
      <a-col span="4">
        <a-input-number
          v-model:value="sliderValue"
          :min="calcItem.min"
          :max="calcItem.max + 100"
          :step="calcItem.step"
        />
      </a-col>
    </a-row>
    <div class="calculator__bottom-container">
      <span class="calculator__label">{{ calcItem?.description }}</span>
    </div>
  </div>
</template>
