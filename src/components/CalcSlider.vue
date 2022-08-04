<script lang="ts">
import { defineComponent, onMounted, ref, toRefs, watch } from "vue";
import { ICalcItem } from "@/types/Calc";
import useCalc from "@/hooks/useCalc";
import { useMediaQuery } from "@vueuse/core";

export default defineComponent({
  props: {
    calcItem: {
      type: Object as () => ICalcItem,
    },
    resultIsLoading: Boolean,
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
    const { defineAmount, itemInResult, removeItemFromResult } = useCalc(
      calcItem.value
    );
    const isMobile = useMediaQuery("(max-width: 575px)");

    onMounted(() => {
      createMarks();
    });

    watch(sliderValue, (value) => {
      if (!value) {
        removeItemFromResult();
        return;
      }
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
      itemInResult,
      isMobile,
    };
  },
});
</script>
<template>
  <a-card
    :bordered="false"
    :title="calcItem?.title"
    :body-style="{ paddingLeft: '36px' }"
    :loading="resultIsLoading"
    :class="
      itemInResult
        ? 'calculator__item calculator__item--active'
        : 'calculator__item'
    "
    :size="isMobile ? 'small' : 'default'"
  >
    <template #extra>
      <a-avatar
        v-if="itemInResult"
        :size="8"
        style="background-color: #87d068"
        shape="circle"
      />
      <a-avatar
        v-else
        :size="8"
        style="background-color: #d9d9d9"
        shape="circle"
      />
    </template>
    <a-row class="calculator__row">
      <a-col :xs="{ span: 24 }" :md="{ span: 20 }">
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
      <a-col :xs="{ span: 24 }" :md="{ span: 4 }">
        <a-form-item class="control__item">
          <a-input-number
            v-model:value="sliderValue"
            :min="calcItem.min"
            :max="calcItem.max + 100"
            :step="calcItem.step"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <div class="calculator__bottom-container">
      <span class="calculator__label">{{ calcItem?.description }}</span>
    </div>
  </a-card>
</template>
<style lang="less" scoped>
.control__item {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.calculator__row {
  margin: 0;
  margin-top: 0.5rem;
}

.calculator__label {
  margin-top: 0.5rem;
}

.breakpoint(mobile; {
  .calculator__row {
    margin-top: 2rem;
  }
});
</style>
