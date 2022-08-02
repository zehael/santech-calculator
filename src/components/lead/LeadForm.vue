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
import { PhoneOutlined, UserOutlined } from "@ant-design/icons-vue";
import type { Rule } from "ant-design-vue/lib/form";
import type { FormProps } from "ant-design-vue";
import { useStore } from "vuex";
import { FormState } from "@/types/Form";
import TelegramService from "@/services/telegram-service";

const telegramService = new TelegramService();

export default defineComponent({
  components: {
    PhoneOutlined,
    UserOutlined,
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

    const handleFinish: FormProps["onFinish"] = (values) => {
      console.log(values, formState);
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

    const testMethod = async () => {
      console.log("test");
      await telegramService.sendLead(formState);
      phoneRef.value?.focus();
    };

    return {
      formState,
      rules,
      actionButtonType,
      phoneRef,
      handleFinish,
      handleFinishFailed,
      testMethod,
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
      <a-col :span="12">
        <a-form-item label="Номер телефона:" name="phone">
          <a-input
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
      <a-col :span="12">
        <a-form-item label="Имя:" name="name">
          <a-input
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
            <a-button size="large" :type="actionButtonType" html-type="submit">
              Отправить
            </a-button>
          </a-form-item>
        </div>
      </a-col>
    </a-row>
    <a-button @click="testMethod">test</a-button>
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
}
</style>
