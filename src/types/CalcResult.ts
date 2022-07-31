import { ICalcInputValueItem, ICalcItem, ICalcPrice } from "@/types/Calc";

export interface ICalcResult {
  items: Array<ICalcResultItem | CalcResultItem>;
  totalSum: number;
}

export interface ICalcResultItem {
  calcItem: ICalcItem;
  totalAmount: number;
  selectedPrice?: ICalcPrice;
  inputValues?: ICalcInputValueItem[];
  qty?: number;
}

export class CalcResultItem {
  calcItem: ICalcItem;
  totalAmount: number;
  selectedPrice?: ICalcPrice;
  inputValues?: ICalcInputValueItem[];
  qty?: number;

  constructor(model: any) {
    this.calcItem = model.calcItem;
    this.totalAmount = model.totalAmount;

    if (model.selectedPrice) {
      this.selectedPrice = model.selectedPrice;
    }

    if (model.inputValues) {
      this.inputValues = model.inputValues;
    }

    if (model.qty) {
      this.qty = model.qty;
    }
  }
}

export interface IMarkup {
  id: number;
  amount: number;
  description?: string;
}
