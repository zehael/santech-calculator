import { ICalcItem, ICalcPrice } from "@/types/Calc";

export default function useCalc(calcItem: ICalcItem | undefined) {
  const defineAmount = (value: number): number => {
    if (!calcItem || !value) return 0;
    return getSumByPriceList(calcItem.prices, value);
  };

  const getSumByPriceList = (
    priceItemList: ICalcPrice[],
    value: number
  ): number => {
    let i = 0;
    let result = 0;
    while (i < priceItemList.length) {
      const priceItem = priceItemList[i];
      console.log("priceItem analyze", priceItem);
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

  return {
    defineAmount,
  };
}
