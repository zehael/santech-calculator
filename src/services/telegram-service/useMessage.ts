import { messageTemplates } from "@/services/telegram-service/messageTemplates";
import { ICalcResult } from "@/types/CalcResult";

export enum IMessageTextType {
  LEAD = "LEAD",
}

export default function useMessage() {
  const getMessageText = (msgType: IMessageTextType): string => {
    const messageItem = messageTemplates.find((item) => item.code === msgType);
    return messageItem?.data || "";
  };

  const generateResultText = (calcResult: ICalcResult): string => {
    const resultItems: string[] = [];
    calcResult.items.forEach((item, idx) => {
      const { inputValues = [], selectedPrice } = item;
      let content = "";
      const headLine = `<strong>${idx + 1}. ${
        item.calcItem.title
      }</strong> <em>(${item.totalAmount} руб)</em>`;

      if (inputValues.length) {
        inputValues.forEach((inputValue) => {
          content += `
    · ${inputValue.name} — ${inputValue.amount
            .toFixed(0)
            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} руб.`;
        });
      }

      if (selectedPrice) {
        content += `
    · ${item.selectedPrice?.label} - x${item?.qty}`;
      }

      resultItems.push(`${headLine}${content}`);
    });
    return resultItems.join("\n\n+++++++\n\n");
  };

  return {
    getMessageText,
    generateResultText,
  };
}
