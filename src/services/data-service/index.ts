import { calcItems, markups } from "@/services/data-service/data";
import { ICalcItem } from "@/types/Calc";
import { IMarkup } from "@/types/CalcResult";

export default class DataService {
  fetchCalcItems(): ICalcItem[] {
    return calcItems;
  }

  fetchMarkups(): IMarkup[] {
    return markups;
  }
}
