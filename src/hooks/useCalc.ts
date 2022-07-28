import { ICalcInputValueItem, ICalcItem, ICalcPrice } from "@/types/Calc";
import { useStore } from "vuex";
import {
  CalcResultItem,
  ICalcResult,
  ICalcResultItem,
} from "@/types/CalcResult";
import { computed } from "vue";

export default function useCalc(calcItem: ICalcItem | undefined) {
  const store = useStore();
  const calcResult = computed<ICalcResult>(() => store.getters.calcResult);
  const defineAmount = (value: number, qty?: number): number => {
    if (!calcItem || !value) return 0;
    const totalSumOfCalcItem = getSumByPriceList(calcItem.prices, value);
    updateStoredResult(totalSumOfCalcItem, undefined, undefined, qty);
    return totalSumOfCalcItem;
  };

  const getSumByPriceList = (
    priceItemList: ICalcPrice[],
    value: number
  ): number => {
    let i = 0;
    let result = 0;
    while (i < priceItemList.length) {
      const priceItem = priceItemList[i];
      const { valueOfMin = 0, valueOfMax = 0 } = priceItem;
      if (value >= valueOfMin && value <= valueOfMax) {
        result = priceItem.amount;
        break;
      }

      if (valueOfMax === 0 && valueOfMin && value >= valueOfMin) {
        result = Math.floor(priceItem.amount * value);
        break;
      }

      if (valueOfMax === 0 && value <= valueOfMin) {
        result = Math.floor(priceItem.amount * value);
      }
      i++;
    }
    return result;
  };

  const defineAmountWithSelectPriceAndQty = (
    qty: number,
    inputValue: number | string
  ): number => {
    if (!calcItem || !qty) return 0;
    const priceItem = calcItem?.prices?.find((item) => item.id === inputValue);
    if (priceItem) {
      const sum = parseFloat((priceItem.amount * qty).toFixed(2));
      updateStoredResult(sum, priceItem, undefined, qty);
      return sum;
    }
    return 0;
  };

  const defineAmountByDynamicInputValues = (
    valueItems: ICalcInputValueItem[]
  ): number => {
    if (!calcItem || !valueItems.length) return 0;
    const clearedItems = valueItems.filter((item) => item.name !== "");
    const itemLength = calcItem.prices[0].amount || 0;
    const sum = parseFloat(
      Math.floor(clearedItems.length * itemLength).toFixed(2)
    );
    updateStoredResult(sum, undefined, valueItems);
    return sum;
  };

  const updateStoredResult = (
    totalAmount: number,
    selectedPrice?: ICalcPrice,
    inputValues?: ICalcInputValueItem[],
    qty?: number
  ): void => {
    if (!calcItem) return;

    const resultItem = new CalcResultItem({
      calcItem,
      totalAmount,
      selectedPrice,
      inputValues,
      qty,
    });

    let updatedResultItems: ICalcResultItem[] = [];
    updatedResultItems = calcResult.value
      ? [
          ...calcResult.value.items.filter(
            (item) => item.calcItem.id !== calcItem.id
          ),
          resultItem,
        ]
      : [resultItem];

    const totalSum: number = updatedResultItems.reduce(
      (acc, item) => acc + item.totalAmount,
      0
    );

    const result: ICalcResult = {
      items: updatedResultItems,
      totalSum,
    };

    console.log("store result is", result);

    store.commit("SET_CALC_RESULT", result);
  };

  const removeItemFromResult = () => {
    const updatedResultItems = [
      ...calcResult.value.items.filter(
        (item) => item.calcItem.id !== calcItem?.id
      ),
    ];
    const totalSum: number = updatedResultItems.reduce(
      (acc, item) => acc + item.totalAmount,
      0
    );

    const result: ICalcResult = {
      items: updatedResultItems,
      totalSum,
    };
    store.commit("SET_CALC_RESULT", result);
  };

  return {
    defineAmount,
    defineAmountWithSelectPriceAndQty,
    defineAmountByDynamicInputValues,
    removeItemFromResult,
  };
}
