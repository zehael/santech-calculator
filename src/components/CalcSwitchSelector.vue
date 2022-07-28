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
    const calcInputValue = ref<boolean>(false);
    const qty = ref<number>(1);
    const { defineAmount, removeItemFromResult } = useCalc(calcItem.value);
    watch(calcInputValue, (value) => {
      if (calcInputValue.value === false) {
        removeItemFromResult();
        return;
      }
      if (value) {
        defineAmount(qty.value);
      }
    });
    watch(qty, (value) => {
      if (calcInputValue.value && value) {
        defineAmount(value);
      }
    });
    return {
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
      <a-col class="calculator__col" :span="4">
        <a-form-item>
          <a-switch
            checked-children="Да"
            un-checked-children="Нет"
            v-model:checked="calcInputValue"
          />
        </a-form-item>
      </a-col>
      <a-col :span="20">
        <a-form-item
          class="calculator__col calculator__col--right"
          v-if="calcInputValue"
          label="Количество"
          label-align="right"
          :label-col="{ sm: { span: 12, offset: 6 } }"
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
