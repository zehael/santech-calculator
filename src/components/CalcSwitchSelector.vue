<script lang="ts">
import { defineComponent, ref } from "vue";
import { ICalcItem } from "@/types/Calc";

export default defineComponent({
  props: {
    calcItem: {
      type: Object as () => ICalcItem,
    },
  },
  setup() {
    const calcInputValue = ref<boolean>(false);
    const qty = ref<number>(1);
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
