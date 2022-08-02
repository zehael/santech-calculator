<script lang="ts">
import { defineComponent, reactive, ref, toRefs, watch } from "vue";
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
    const calcInputValue = ref<number>(0);
    const qty = ref<number>(1);
    const radioStyle = reactive({
      display: "flex",
      height: "30px",
      lineHeight: "30px",
    });
    const {
      defineAmountWithSelectPriceAndQty,
      itemInResult,
      removeItemFromResult,
    } = useCalc(calcItem.value);
    const isMobile = useMediaQuery("(max-width: 575px)");

    watch(calcInputValue, (value) => {
      if (!value) {
        removeItemFromResult();
        return;
      }
      getSumByQuantity();
    });

    watch(qty, (value) => {
      if (!value) {
        removeItemFromResult();
        return;
      }
      getSumByQuantity();
    });

    const getSumByQuantity = () => {
      defineAmountWithSelectPriceAndQty(qty.value, calcInputValue.value);
    };

    return {
      radioStyle,
      calcInputValue,
      qty,
      itemInResult,
      isMobile,
    };
  },
});
</script>
<template>
  <a-card
    :title="calcItem?.title"
    :bodyStyle="{ marginBottom: 20 }"
    :class="
      itemInResult
        ? 'calculator__item calculator__item--active'
        : 'calculator__item'
    "
    :loading="resultIsLoading"
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
    <a-row class="calculator__row calculator__row--small calculator__row--tile">
      <a-col class="calculator__col" :xs="{ span: 12 }" :sm="{ span: 10 }">
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
      <a-col :xs="{ span: 12 }" :sm="{ span: 14 }">
        <div class="qty">
          <a-form-item label="Количество:">
            <a-input-number
              v-model:value="qty"
              :min="0"
              :max="calcItem.max"
              :step="calcItem.step"
            />
          </a-form-item>
        </div>
      </a-col>
    </a-row>
  </a-card>
</template>
