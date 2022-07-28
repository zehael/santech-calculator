<script lang="ts">
import { defineComponent, ref, toRefs, watch } from "vue";
import { ICalcItem } from "@/types/Calc";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";

interface Option {
  value: string;
}

interface CalcInputValueItem {
  id: number;
  name: string;
  amount: number;
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
    const calcInputValueItems = ref<CalcInputValueItem[]>([]);

    const options = ref<Option[]>([
      { value: "Раковина" },
      { value: "Стиральная машина" },
      { value: "Посудомоечная машина" },
      { value: "Душ" },
      { value: "Сан узел" },
    ]);

    watch(calcInputValueItems, () => {
      calcSumAmountByDynamicItems();
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

    const calcSumAmountByDynamicItems = () => {
      const clearedItems = calcInputValueItems.value.filter(
        (item) => item.name !== ""
      );
      const itemLenght = calcItem.value?.prices[0].amount || 0;
      const sum = parseFloat(
        Math.floor(clearedItems.length * itemLenght).toFixed(2)
      );
      console.log("dynamic sum is", sum);
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
      <a-col class="calculator__col" :span="24">
        <a-space
          v-for="item in calcInputValueItems"
          :key="item.id"
          style="display: flex; margin-bottom: 8px"
          align="baseline"
        >
          <a-form-item>
            <a-auto-complete
              @change="(value: string) => onItemValueChange(value, item.id)"
              :options="options"
              style="width: 100%"
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
<style lang="less" scoped>
.ant-space-item {
  width: 100% !important;
}
</style>
