<script lang="ts">
import { defineComponent, reactive, ref, toRefs, watch } from "vue";
import { ICalcItem } from "@/types/Calc";

export default defineComponent({
  props: {
    calcItem: {
      type: Object as () => ICalcItem,
    },
  },
  setup(props) {
    const { calcItem } = toRefs(props);
    const calcInputValue = ref<number>(0);
    const qty = ref<number>(1);
    const radioStyle = reactive({
      display: "flex",
      height: "30px",
      lineHeight: "30px",
    });

    watch(calcInputValue, () => {
      getSumByQuantity();
    });

    watch(qty, () => {
      getSumByQuantity();
    });

    const getSumByQuantity = () => {
      const priceItem = calcItem.value?.prices?.find(
        (item) => item.id === calcInputValue.value
      );
      if (priceItem) {
        const sum = parseFloat((priceItem.amount * qty.value).toFixed(2));
        console.log("sum is", sum);
      }
    };

    return {
      radioStyle,
      calcInputValue,
      qty,
    };
  },
});
</script>
<template>
  <div class="calculator__item">
    <h3>{{ calcItem?.title }}</h3>
    <a-row class="calculator__row calculator__row--small">
      <a-col class="calculator__col" :span="10">
        <a-form-item>
          <a-radio-group v-model:value="calcInputValue">
            <a-radio
              v-for="priceItem in calcItem.prices"
              :key="priceItem.id"
              :style="radioStyle"
              :value="priceItem.id"
            >
              {{ priceItem.label }}
            </a-radio>
          </a-radio-group>
        </a-form-item>
      </a-col>
      <a-col :span="14">
        <a-form-item
          class="calculator__col calculator__col--right"
          label="Количество"
          label-align="right"
          :label-col="{ sm: { span: 11, offset: 4 } }"
        >
          <a-input-number
            v-model:value="qty"
            :min="1"
            :max="calcItem.max"
            :step="calcItem.step"
          />
        </a-form-item>
      </a-col>
    </a-row>
  </div>
</template>
