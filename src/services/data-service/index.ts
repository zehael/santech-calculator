import { calcItems } from "@/services/data-service/data";
import { ICalcItem } from "@/types/Calc";

export default class DataService {
  fetchCalcItems(): ICalcItem[] {
    return calcItems;
  }
}
