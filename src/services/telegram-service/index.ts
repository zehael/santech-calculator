import axios, { AxiosInstance, AxiosResponse } from "axios";
import useMessage, {
  IMessageTextType,
} from "@/services/telegram-service/useMessage";
import { FormState } from "@/types/Form";
import { ICalcResult, IMarkup } from "@/types/CalcResult";

const TOKEN = "1015107829:AAGnWB9SDDa8Hr7yWpwVvv4jlA2UOYUto04";
const BASE_URL = `https://api.telegram.org/bot${TOKEN}`;
const CHAT_ID =
  process.env.NODE_ENV === "development" ? "-726654847" : "-726654847"; // -1001602757666 (chatId from group) / My: 123080537

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

  public async sendLead(
    formData: FormState,
    calcResult: ICalcResult,
    markups: IMarkup[] = []
  ): Promise<AxiosResponse<any>> {
    const { getMessageText, generateResultText } = useMessage();
    const totalSum = `${calcResult.totalSum
      .toFixed(0)
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Руб.`;
    let text = getMessageText(IMessageTextType.LEAD)
      .replace(/{LEAD_NAME}/gm, formData.name)
      .replace(/{LEAD_PHONE}/gm, formData.phone)
      .replace(/{LEAD_TOTAL_AMOUNT}/gm, totalSum);

    const resultText = generateResultText(calcResult, markups);

    /* HASH DATA FOR GAS scripts */
    // const today = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDay()}`;
    // const messageData = {
    //   name: formData.name,
    //   phone: formData.phone,
    //   formData: resultText,
    //   date: today,
    // };
    // const hashedData = this.toBinary(JSON.stringify(messageData));

    text = `${text}\n${resultText}`;

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
