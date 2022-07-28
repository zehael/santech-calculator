export interface ICalcItem {
  id: number | string;
  title: string;
  description: string;
  prices: ICalcPrice[];
  min?: number;
  max?: number;
  step?: number;
  measure?: Measure;
}

export interface ICalcPrice {
  id: number | string;
  label: string;
  amount: number;
  valueOfMin?: number;
  valueOfMax?: number;
}

export enum Measure {
  MP = "м.п.",
  PCS = "шт",
}
