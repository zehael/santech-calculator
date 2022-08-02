<script lang="ts">
import { defineComponent, ref, toRefs, watch } from "vue";
import { ICalcInputValueItem, ICalcItem } from "@/types/Calc";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";
import useCalc from "@/hooks/useCalc";
import { useMediaQuery } from "@vueuse/core";

interface Option {
  value: string;
}

export default defineComponent({
  components: {
    PlusOutlined,
    MinusCircleOutlined,
  },
  props: {
    calcItem: {
      type: Object as () => ICalcItem,
    },
    resultIsLoading: Boolean,
  },
  setup(props) {
    const { calcItem } = toRefs(props);
    const calcInputValue = ref("");
    const calcInputValueItems = ref<ICalcInputValueItem[]>([]);
    const {
      defineAmountByDynamicInputValues,
      itemInResult,
      removeItemFromResult,
    } = useCalc(calcItem.value);
    const isMobile = useMediaQuery("(max-width: 575px)");

    const options = ref<Option[]>([
      { value: "Кухонная Мойка" },
      { value: "Посудомоечная машина" },
      { value: "Унитаз" },
      { value: "Раковина" },
      { value: "Стиральная машина" },
      { value: "Гигиенический Душ" },
      { value: "Ванна" },
      { value: "Душевая" },
    ]);

    watch(calcInputValueItems, (value) => {
      const clearedItems = value.filter((item) => item.name !== "");
      if (!clearedItems.length) {
        removeItemFromResult();
        return;
      }
      defineAmountByDynamicInputValues(calcInputValueItems.value);
    });

    const addItem = () => {
      const lastItem =
        calcInputValueItems.value[calcInputValueItems.value.length - 1];
      if (lastItem && !lastItem.name) {
        return;
      }
      calcInputValueItems.value.push({
        id: calcInputValueItems.value.length + 1,
        name: calcInputValue.value,
        amount: calcItem.value?.prices[0].amount || 0,
      });
    };

    const removeItem = (itemId: number) => {
      calcInputValueItems.value = [...calcInputValueItems.value].filter(
        (item) => item.id !== itemId
      );
    };

    const onItemValueChange = (value: string, itemId: number) => {
      const inputValueItem = calcInputValueItems.value.find(
        (item) => item.id === itemId
      );
      if (inputValueItem) {
        calcInputValueItems.value = [
          ...calcInputValueItems.value.filter((item) => item.id !== itemId),
          { id: itemId, name: value, amount: inputValueItem.amount },
        ];
      }
    };

    const filterOption = (input: string, option: Option) => {
      return option.value.toUpperCase().indexOf(input.toUpperCase()) >= 0;
    };

    return {
      calcInputValue,
      options,
      calcInputValueItems,
      itemInResult,
      isMobile,
      addItem,
      removeItem,
      onItemValueChange,
      filterOption,
    };
  },
});
</script>
<template>
  <a-card
    :title="calcItem?.title"
    :loading="resultIsLoading"
    class="calculator__item"
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
    <a-row class="calculator__row calculator__row--small">
      <a-col
        v-for="item in calcInputValueItems"
        :key="item.id"
        class="calculator__col"
        :span="24"
      >
        <a-space style="width: 100%" align="baseline">
          <a-form-item>
            <a-auto-complete
              @change="(value: string) => onItemValueChange(value, item.id)"
              :options="options"
              placeholder="Стир. / Посудомоечная машина, сан-узел и т.д."
              :filter-option="filterOption"
            >
              <template #default>
                <a-input style="width: 100%" v-model:value="item.name" />
              </template>
            </a-auto-complete>
          </a-form-item>
          <MinusCircleOutlined @click="removeItem(item.id)" />
        </a-space>
      </a-col>
      <a-col :span="24">
        <a-form-item>
          <a-button type="dashed" block @click="addItem">
            <PlusOutlined />
            Добавить точку потребления
          </a-button>
        </a-form-item>
      </a-col>
    </a-row>
  </a-card>
</template>
