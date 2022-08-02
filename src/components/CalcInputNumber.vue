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
    const { defineAmount, removeItemFromResult, itemInResult } = useCalc(
      calcItem.value
    );
    const calcInputValue = ref<number>(0);
    const isMobile = useMediaQuery("(max-width: 575px)");
    watch(calcInputValue, (value) => {
      if (!value) {
        removeItemFromResult();
        return;
      }
      defineAmount(value);
    });
    return {
      calcInputValue,
      itemInResult,
      isMobile,
    };
  },
});
</script>
<template>
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
  </a-card>
</template>
