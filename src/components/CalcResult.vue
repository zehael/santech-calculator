<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";
import { ICalcResult } from "@/types/CalcResult";

export default defineComponent({
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
      <a-button @click="displayResult" type="primary" size="large"
        >Рассчет стоимости
      </a-button>
    </div>
    <div v-if="calcResult && showResultData" class="result__info">
      <a-row
        class="result__item"
        v-for="item in calcResult.items"
        :key="item.calcItem?.id"
      >
        <a-col span="16">
          {{ item.calcItem.title }}
        </a-col>
        <a-col span="8">
          <div class="result__amount">
            {{
              item.totalAmount?.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")
            }}
            Руб.
          </div>
        </a-col>
      </a-row>
      <div id="total" class="result__total">
        <span>Итого:</span>
        <span
          ><strong
            >{{
              calcResult.totalSum
                .toFixed(0)
                .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
            }}
            Руб</strong
          ></span
        >
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.result {
  &__item {
    margin-bottom: 20px;
  }

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

  &__amount {
    display: flex;
    align-items: center;
    justify-content: flex-end;
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
