<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";
import { ICalcResult } from "@/types/CalcResult";
import CalcResultItem from "@/components/CalcResultItem.vue";

export default defineComponent({
  components: { CalcResultItem },
  setup() {
    const store = useStore();
    const calcResult = computed<ICalcResult | null>(
      () => store.getters.calcResult
    );
    const showResultData = ref<boolean>(false);

    watch(calcResult, (value, oldValue) => {
      if (value !== oldValue) {
        showResultData.value = false;
      }
    });

    const displayResult = () => {
      showResultData.value = true;
      setTimeout(() => {
        const resultDataEl = document.getElementById("total");
        if (resultDataEl) {
          resultDataEl.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    };
    return {
      calcResult,
      showResultData,
      displayResult,
    };
  },
});
</script>
<template>
  <div class="result">
    <div class="result__action">
      <a-button @click="displayResult" type="primary" size="large">
        Рассчет стоимости
      </a-button>
    </div>
    <div v-if="calcResult && showResultData" class="result__info">
      <div v-for="item in calcResult.items" :key="item.calcItem?.id">
        <CalcResultItem :calc-result-item="item" />
        <a-divider />
      </div>
      <div id="total" class="result__total">
        <span>Итого:</span>
        <span>
          <strong>
            {{
              calcResult.totalSum
                .toFixed(0)
                .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
            }}
            Руб
          </strong>
        </span>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.result {
  &__action {
    margin: 40px 0 25px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  &__info {
    border: @primary-color 1px solid;
    border-radius: @border-radius-base;
    margin: 16px 0;
    padding: 25px;
    font-size: 16px;
  }

  &__total {
    border-top: 2px dashed @primary-color;
    padding-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
