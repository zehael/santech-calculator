<script lang="ts">
import { defineComponent } from "vue";
import { CalcResultItem, ICalcResultItem, IMarkup } from "@/types/CalcResult";

export default defineComponent({
  props: {
    calcResultItem: {
      type: Object as () => CalcResultItem | ICalcResultItem,
      required: false,
    },
    markup: {
      type: Object as () => IMarkup,
      required: false,
    },
  },
  setup() {
    return {};
  },
});
</script>
<template>
  <a-row v-if="calcResultItem">
    <a-col :span="16">
      {{ calcResultItem.calcItem.title }}
    </a-col>
    <a-col :span="8">
      <div class="result__amount">
        {{
          `${calcResultItem.totalAmount
            ?.toFixed(0)
            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} руб.`
        }}
      </div>
    </a-col>
    <a-col v-if="calcResultItem.inputValues?.length" :span="24">
      <ul class="valuelist">
        <li
          v-for="inputValueItem in calcResultItem.inputValues"
          :key="inputValueItem.id"
        >
          {{
            `${inputValueItem.name} - ${inputValueItem.amount
              .toFixed(0)
              .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} руб.`
          }}
        </li>
      </ul>
    </a-col>
    <a-col v-if="calcResultItem.selectedPrice">
      <ul class="valuelist">
        <li>
          {{
            `${calcResultItem.selectedPrice?.label} - x${calcResultItem?.qty}`.trim()
          }}
        </li>
      </ul>
    </a-col>
  </a-row>
  <a-row> </a-row>
</template>
<style lang="less" scoped>
.result {
  &__item {
    margin-bottom: 20px;
  }

  &__amount {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}

.valuelist {
  margin: 0;
  color: #666;
}
</style>
