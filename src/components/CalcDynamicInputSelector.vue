<script lang="ts">
import { defineComponent, ref, toRefs, watch } from "vue";
import { ICalcInputValueItem, ICalcItem } from "@/types/Calc";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";
import useCalc from "@/hooks/useCalc";

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
  },
  setup(props) {
    const { calcItem } = toRefs(props);
    const calcInputValue = ref("");
    const calcInputValueItems = ref<ICalcInputValueItem[]>([]);
    const { defineAmountByDynamicInputValues } = useCalc(calcItem.value);

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

    watch(calcInputValueItems, () => {
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
      addItem,
      removeItem,
      onItemValueChange,
      filterOption,
    };
  },
});
</script>
<template>
  <div class="calculator__item">
    <h3>{{ calcItem?.title }}</h3>
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
  </div>
</template>
