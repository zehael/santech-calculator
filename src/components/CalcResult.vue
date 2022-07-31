<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";
import { ICalcResult } from "@/types/CalcResult";
import LeadForm from "@/components/lead/LeadForm.vue";
import { DownCircleOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  components: { LeadForm, DownCircleOutlined },
  setup() {
    const store = useStore();
    const calcResult = computed<ICalcResult | null>(
      () => store.getters.calcResult
    );
    const resultIsLoading = computed<boolean>(
      () => store.getters.resultLoading
    );
    const showResultData = ref<boolean>(false);

    watch(calcResult, (value, oldValue) => {
      if (value !== oldValue) {
        showResultData.value = false;
      }
    });

    const displayResult = () => {
      store.commit("SET_RESULT_LOADING", true);
      showResultData.value = true;
      setTimeout(() => {
        const resultDataEl = document.getElementById("total");
        if (resultDataEl) {
          resultDataEl.scrollIntoView({ behavior: "smooth" });
        }
        store.commit("SET_RESULT_LOADING", false);
      }, 500);
    };
    return {
      calcResult,
      showResultData,
      resultIsLoading,
      displayResult,
    };
  },
});
</script>
<template>
  <div class="result">
    <div class="result__action">
      <a-button
        :loading="resultIsLoading"
        @click="displayResult"
        type="primary"
        size="large"
      >
        Рассчет стоимости
      </a-button>
    </div>
    <div v-if="calcResult && showResultData" class="result__info">
      <div id="total" class="result__total">
        <span>Рассчетная стоимость:</span>
        <div class="result__sum">
          <span>≈</span>
          <h4>
            {{
              calcResult.totalSum
                .toFixed(0)
                .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
            }}
            Руб
          </h4>
        </div>
      </div>
      <div class="result__description">
        * Итоговая сумма работ сформируется окончательно после ознакомления с
        объектом, с предоставлением сметы и заключением договора.
      </div>
      <div class="result__form">
        <h3>Получить консультацию бесплатно</h3>
        <a-divider style="border-color: #ffc900" dashed>
          <down-circle-outlined style="font-size: 24px; color: #ffc900" />
        </a-divider>
        <h4>
          Заполните форму и мы свяжемся с вами для уточнения деталей в самое
          ближайше время!
        </h4>
        <LeadForm :show-result-data="showResultData" />
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.result {
  max-width: @standard-width;
  margin-bottom: 4rem;

  &__description {
    color: @gray-color-500;
    font-size: 12px;
    font-style: italic;
    margin: 15px 0 25px;
    font-weight: 500;
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
    margin: 16px 0 50px;
    padding: 25px;
    font-size: 16px;
  }

  &__total {
    padding-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: @gray-color-650;
    font-size: 20px;
  }

  &__sum {
    display: flex;
    align-items: center;
    font-size: 28px;

    h4 {
      font-weight: 900;
      font-size: 28px;
      line-height: 1.25;
      margin: 0 0 0 14px;
      color: @dark-color-900;
    }
  }

  &__form {
    margin-top: 40px;

    h3 {
      font-size: 18px;
      text-align: center;
      font-weight: 500;
    }

    h4 {
      font-weight: 300;
    }
  }
}
</style>
