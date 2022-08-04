<script lang="ts">
import { defineComponent, ref, toRefs, watch } from "vue";
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
    const calcInputValue = ref<boolean>(false);
    const qty = ref<number>(1);
    const { defineAmount, removeItemFromResult, itemInResult } = useCalc(
      calcItem.value
    );
    const isMobile = useMediaQuery("(max-width: 575px)");
    watch(calcInputValue, (value) => {
      if (calcInputValue.value === false) {
        removeItemFromResult();
        return;
      }
      if (value) {
        defineAmount(qty.value);
      } else {
        removeItemFromResult();
      }
    });
    watch(qty, (value) => {
      if (calcInputValue.value && value) {
        defineAmount(value);
      } else {
        removeItemFromResult();
      }
    });
    return {
      calcInputValue,
      qty,
      itemInResult,
      isMobile,
    };
  },
});
</script>
<template>
  <div></div>
  <a-card
    :title="calcItem?.title"
    :class="
      itemInResult
        ? 'calculator__item calculator__item--active'
        : 'calculator__item'
    "
    :loading="resultIsLoading"
    :size="isMobile ? 'small' : 'default'"
    :head-style="{ maxWidth: 300 }"
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
          <a-switch
            checked-children="Да"
            un-checked-children="Нет"
            v-model:checked="calcInputValue"
          />
        </a-form-item>
      </a-col>
      <a-col :xs="{ span: 12 }" :sm="{ span: 14 }">
        <div class="qty">
          <a-form-item v-if="calcInputValue" label="Количество">
            <a-input-number
              v-model:value="qty"
              :min="1"
              :max="calcItem.max"
              :step="calcItem.step"
            />
          </a-form-item>
        </div>
      </a-col>
    </a-row>
  </a-card>
</template>
<style lang="less">
.qty {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .ant-row {
    justify-content: flex-end;
    align-items: center;
  }

  .ant-form-item-control-input-content {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
