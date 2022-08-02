export interface IMessageTemplate {
  code: string;
  data: string;
}

export const messageTemplates: IMessageTemplate[] = [
  {
    code: "LEAD",
    data: `<strong>Заявка с калькулятора</strong> \n
<strong>Имя: </strong> {LEAD_NAME}
<strong>Телефон: </strong> {LEAD_PHONE}
<strong>Сумма заказа: </strong> {LEAD_TOTAL_AMOUNT}

<strong>СОСТАВ ЗАКАЗА:</strong>\n`,
  },
];
