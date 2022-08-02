import axios, { AxiosInstance, AxiosResponse } from "axios";
import useMessage, {
  IMessageTextType,
} from "@/services/telegram-service/useMessage";
import { FormState } from "@/types/Form";

const TOKEN = "1665007373:AAHGkGAijMl6yyvEy8ENdQAGp_9noJV2vfs";
const BASE_URL = `https://api.telegram.org/bot${TOKEN}`;
const CHAT_ID =
  process.env.NODE_ENV === "development" ? "-1001602757666" : "123080537"; // -1001602757666 (chatId from group) / My: 123080537

export default class TelegramService {
  private $api: AxiosInstance;

  constructor() {
    this.$api = this.$api = axios.create({
      baseURL: BASE_URL,
    });
  }

  public async getUpdates() {
    return this.$api.get("/getUpdates");
  }

  public async sendLead(formData: FormState): Promise<AxiosResponse<any>> {
    const { getMessageText } = useMessage();
    let text = getMessageText(IMessageTextType.LEAD)
      .replace(/{LEAD_NAME}/gm, formData.name)
      .replace(/{LEAD_PHONE}/gm, formData.phone);

    const today = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDay()}`;

    const messageData = {
      name: formData.name,
      phone: formData.phone,
      date: today,
    };

    const hashedData = this.toBinary(JSON.stringify(messageData));

    text = `${text}\nHash: ${btoa(hashedData)}`;

    return this.sendMessage(text);
  }

  private async sendMessage(message: string): Promise<AxiosResponse<any>> {
    const msgConfig = {
      chat_id: CHAT_ID,
      text: message,
      parse_mode: "html",
    };

    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    return this.$api.post("/sendMessage", msgConfig, options);
  }

  private toBinary(str: string) {
    const codeUnits = new Uint16Array(str.length);
    for (let i = 0; i < codeUnits.length; i++) {
      codeUnits[i] = str.charCodeAt(i);
    }
    const charCodes = new Uint8Array(codeUnits.buffer);
    let result = "";
    for (let i = 0; i < charCodes.byteLength; i++) {
      result += String.fromCharCode(charCodes[i]);
    }
    return result;
  }
}
