<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  ref,
  toRefs,
  UnwrapRef,
  watch,
} from "vue";
import {
  CheckCircleOutlined,
  PhoneOutlined,
  SyncOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import type { Rule } from "ant-design-vue/lib/form";
import type { FormProps } from "ant-design-vue";
import { useStore } from "vuex";
import { FormState } from "@/types/Form";
import TelegramService from "@/services/telegram-service";
import { ICalcResult, IMarkup } from "@/types/CalcResult";

const telegramService = new TelegramService();

export default defineComponent({
  components: {
    PhoneOutlined,
    UserOutlined,
    SyncOutlined,
    CheckCircleOutlined,
  },
  props: {
    showResultData: {
      type: Boolean,
      required: false,
    },
  },
  setup(props) {
    const store = useStore();
    const resultIsLoading = computed<boolean>(
      () => store.getters.resultLoading
    );
    const formIsLoading = computed<boolean>(() => store.getters.formIsLoading);
    const calcResult = computed<ICalcResult>(() => store.getters.calcResult);
    const formSent = computed(() => store.getters.formSent);
    const markups = computed<IMarkup[]>(() => store.getters.markups);
    const formState: UnwrapRef<FormState> = reactive({
      phone: "",
      name: "",
    });
    const phoneRef = ref<HTMLInputElement>();
    const { showResultData } = toRefs(props);

    watch(resultIsLoading, (value) => {
      if (!value && showResultData.value === true) {
        phoneRef?.value?.focus();
      }
    });

    const validatePhone = async (_rule: Rule, value: string) => {
      const digs: string[] = value.replace(/\D+/gm, "").split("");
      if (!value) {
        return Promise.reject();
      } else if (digs.length < 11) {
        return Promise.reject();
      } else {
        return Promise.resolve();
      }
    };

    const rules: Record<string, Rule[]> = {
      phone: [{ required: true, validator: validatePhone, trigger: "change" }],
      name: [{ required: true, message: "", trigger: "change" }],
    };

    const handleFinish: FormProps["onFinish"] = async () => {
      store.commit("SET_FORM_IS_LOADING", true);
      setTimeout(async () => {
        await telegramService.sendLead(
          formState,
          calcResult.value,
          markups.value
        );
        store.commit("SET_FORM_IS_LOADING", false);
        store.commit("SET_FORM_IS_SENT", true);
      }, 500);
    };
    const handleFinishFailed: FormProps["onFinishFailed"] = (errors) => {
      console.log(errors);
    };

    const actionButtonType = computed<string>(() => {
      const phoneDigs: string[] = formState.phone
        .replace(/\D+/gm, "")
        .split("");
      if (phoneDigs.length === 11 && formState.name !== "") {
        return "primary";
      } else {
        return "default";
      }
    });

    return {
      formState,
      rules,
      actionButtonType,
      phoneRef,
      formSent,
      formIsLoading,
      handleFinish,
      handleFinishFailed,
    };
  },
});
</script>
<template>
  <a-form
    layout="vertical"
    :model="formState"
    class="form"
    :rules="rules"
    @finish="handleFinish"
    @finishFailed="handleFinishFailed"
  >
    <a-row :gutter="[20, 0]">
      <a-col :xs="{ span: 24 }" :sm="{ span: 12 }">
        <a-form-item label="Номер телефона:" name="phone">
          <a-input
            :disabled="formSent"
            v-model:value="formState.phone"
            placeholder="+7 (000) 000 00 00"
            v-maska="`+7 (###) ### ## ##`"
            size="large"
            allow-clear
            ref="phoneRef"
          >
            <template #prefix>
              <PhoneOutlined style="color: rgba(0, 0, 0, 0.25)" />
            </template>
          </a-input>
        </a-form-item>
      </a-col>
      <a-col :xs="{ span: 24 }" :sm="{ span: 12 }">
        <a-form-item label="Имя:" name="name">
          <a-input
            :disabled="formSent"
            v-model:value="formState.name"
            placeholder="Иван"
            size="large"
            allow-clear
            has-feedback
          >
            <template #prefix>
              <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
            </template>
          </a-input>
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <div class="form__action">
          <a-form-item>
            <a-button
              :disabled="formSent"
              size="large"
              :type="actionButtonType"
              html-type="submit"
              :loading="formIsLoading"
            >
              Отправить
            </a-button>
          </a-form-item>
        </div>
      </a-col>
    </a-row>
    <div class="form__result">
      <a-tag v-if="formIsLoading" color="processing">
        <template #icon>
          <sync-outlined :spin="true" />
        </template>
        Отправка формы
      </a-tag>
      <a-tag v-if="formSent" color="success">
        <template #icon>
          <check-circle-outlined />
        </template>
        Форма успешно отправлена
      </a-tag>
    </div>
  </a-form>
</template>
<style lang="less" scoped>
.form {
  margin-top: 50px;

  &__action {
    margin: 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__result {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
  }
}
</style>
