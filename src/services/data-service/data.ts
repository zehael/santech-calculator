import { ICalcItem, Measure } from "@/types/Calc";
import { IMarkup } from "@/types/CalcResult";

export const calcItems: ICalcItem[] = [
  {
    id: 1,
    title: "Монтаж труб для холодной и горячей воды",
    description: "Укажите метраж труб",
    min: 0,
    max: 100,
    step: 5,
    measure: Measure.MP,
    marks: [0, 40, 100],
    prices: [
      {
        id: 1,
        label: "до 20",
        amount: 7000,
        valueOfMax: 20,
      },
      {
        id: 1,
        label: "от 20 до 40",
        amount: 12000,
        valueOfMin: 20,
        valueOfMax: 40,
      },
      {
        id: 2,
        label: "более 40",
        amount: 250,
        valueOfMin: 40,
      },
    ],
  },
  {
    id: 2,
    title: "Монтаж труб для канализации",
    description: "Укажите метраж труб",
    min: 0,
    max: 100,
    step: 5,
    marks: [0, 40, 100],
    measure: Measure.MP,
    prices: [
      {
        id: 1,
        label: "Фиксированно за 1 м.п.",
        amount: 300,
        valueOfMin: 1,
      },
    ],
  },
  {
    id: 3,
    title: "Устройство штробы труб ХГВС",
    description: `Укажите ${Measure.MP}`,
    min: 0,
    max: 100,
    step: 5,
    measure: Measure.MP,
    prices: [
      {
        id: 1,
        label: "Фиксированно за 1 м.п.",
        amount: 330,
        valueOfMin: 1,
      },
    ],
  },
  {
    id: 4,
    title: "Устройство штробы труб для канализации",
    description: `Укажите ${Measure.MP}`,
    min: 0,
    max: 100,
    step: 5,
    measure: Measure.MP,
    prices: [
      {
        id: 1,
        label: "Фиксированно за 1 м.п.",
        amount: 330,
        valueOfMin: 1,
      },
    ],
  },
  {
    id: 5,
    title: "Шумоизоляция стояка до 3 м.",
    description: `Укажите количество стояков`,
    min: 0,
    max: 3,
    step: 1,
    measure: Measure.PCS,
    prices: [
      {
        id: 1,
        label: `Фиксированно за ${Measure.PCS}`,
        amount: 2800,
        valueOfMin: 1,
      },
    ],
  },
  {
    id: 6,
    title: "Монтаж смесителя (ванна, раковина)",
    description: `Укажите количество`,
    min: 0,
    max: 100,
    step: 1,
    measure: Measure.PCS,
    prices: [
      {
        id: 1,
        label: "Встроенный",
        amount: 2800,
        valueOfMin: 1,
      },
      {
        id: 2,
        label: "Обычный",
        amount: 1500,
        valueOfMin: 1,
      },
    ],
  },
  {
    id: 7,
    title: "Монтаж точки потребления",
    description: `Укажите количество`,
    min: 0,
    max: 100,
    step: 1,
    measure: Measure.PCS,
    prices: [
      {
        id: 1,
        label: `Фиксированно за ${Measure.PCS}`,
        amount: 1500,
        valueOfMin: 1,
      },
    ],
  },
  {
    id: 8,
    title: "Монтаж блока гигиенического душа",
    description: `Укажите количество`,
    min: 0,
    max: 100,
    step: 1,
    measure: Measure.PCS,
    prices: [
      {
        id: 1,
        label: `Фиксированно за ${Measure.PCS}`,
        amount: 1500,
        valueOfMin: 1,
      },
    ],
  },
  {
    id: 9,
    title: "Перенос узла ввода холодной и горчей воды",
    description: `Укажите количество`,
    min: 0,
    max: 100,
    step: 1,
    measure: Measure.PCS,
    prices: [
      {
        id: 1,
        label: `Фиксированно за ${Measure.PCS}`,
        amount: 1800,
        valueOfMin: 1,
      },
    ],
  },
  {
    id: 10,
    title: "Монтаж и сборка коллектора",
    description: `Укажите количество`,
    min: 0,
    max: 100,
    step: 1,
    measure: Measure.PCS,
    prices: [
      {
        id: 1,
        label: `Фиксированно за ${Measure.PCS}`,
        amount: 19000,
        valueOfMin: 1,
      },
    ],
  },
  {
    id: 11,
    title: "Демонтаж существующих сантехприборов",
    description: `Укажите количество`,
    min: 0,
    max: 100,
    step: 1,
    measure: Measure.PCS,
    prices: [
      {
        id: 1,
        label: `Фиксированно за ${Measure.PCS}`,
        amount: 12000,
        valueOfMin: 1,
      },
    ],
  },
  {
    id: 12,
    title: "Монтаж инсталляции",
    description: `Укажите количество`,
    min: 0,
    max: 10,
    step: 1,
    measure: Measure.PCS,
    prices: [
      {
        id: 1,
        label: `Фиксированно за ${Measure.PCS}`,
        amount: 2500,
        valueOfMin: 1,
      },
    ],
  },
  {
    id: 13,
    title: "Монтаж радиаторов отопления",
    description: `Укажите количество`,
    min: 0,
    max: 100,
    step: 1,
    measure: Measure.PCS,
    prices: [
      {
        id: 1,
        label: `Фиксированно за ${Measure.PCS}`,
        amount: 4000,
        valueOfMin: 1,
      },
    ],
  },
];

export const markups: IMarkup[] = [
  {
    id: 1,
    amount: 1500,
    description: "Прочие расходы",
  },
];
