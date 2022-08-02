import { messageTemplates } from "@/services/telegram-service/messageTemplates";

export enum IMessageTextType {
  LEAD = "LEAD",
}

export default function useMessage() {
  const getMessageText = (msgType: IMessageTextType): string => {
    const messageItem = messageTemplates.find((item) => item.code === msgType);
    return messageItem?.data || "";
  };
  return {
    getMessageText,
  };
}
