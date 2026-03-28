export interface Apartment {
  id: string;
  name: string;
  neighborhood: string;
  bedrooms: number;
  guests: number;
  sqm: number;
  priceFrom: number;
  images: string[];
}

export const apartments: Apartment[] = [
  {
    id: "seraya-32",
    name: "Seraya 32",
    neighborhood: "Marina",
    bedrooms: 3,
    guests: 7,
    sqm: 165,
    priceFrom: 28000,
    images: [
      "seraya/units/unit-36/listing/web/Vida Marina-2401(Web)-24",
      "seraya/units/unit-36/listing/web/Vida Marina-2401(Web)-14",
      "seraya/best-of/Vida Marina-2401(Web)-6",
      "seraya/units/unit-36/listing/web/Vida Marina-2401(Web)-19",
    ],
  },
  {
    id: "seraya-49",
    name: "Seraya 49",
    neighborhood: "Downtown",
    bedrooms: 4,
    guests: 9,
    sqm: 160,
    priceFrom: 28500,
    images: [
      "seraya/units/unit-49/listing/web/DTV1-2106(Web)-3",
      "seraya/units/unit-49/listing/web/DTV1-2106(Web)-6",
      "seraya/units/unit-49/listing/web/DTV1-2106(Web)-14",
      "seraya/units/unit-49/listing/web/DTV1-2106(Web)-39",
    ],
  },
  {
    id: "seraya-37",
    name: "Seraya 37",
    neighborhood: "Downtown",
    bedrooms: 1,
    guests: 3,
    sqm: 82,
    priceFrom: 12000,
    images: [
      "seraya/units/unit-37/listing/web/DTV1-1909(Web)-25",
      "seraya/units/unit-37/listing/web/DTV1-1909(Web)-24",
      "seraya/units/unit-37/listing/web/DTV1-1909(Web)-9",
      "seraya/units/unit-37/listing/web/DTV1-1909(Web)-34",
    ],
  },
  {
    id: "seraya-29",
    name: "Seraya 29",
    neighborhood: "Business Bay",
    bedrooms: 3,
    guests: 7,
    sqm: 178,
    priceFrom: 23000,
    images: [
      "Urban_Oasis-2003_Web_-35_ushaad",
      "Urban_Oasis-2003_Web_-29_qq23i2",
      "Urban_Oasis-2003_Web_-2_wqth9z",
      "Urban_Oasis-2003_Web_-20_ptzpci",
    ],
  },
  {
    id: "seraya-47",
    name: "Seraya 47",
    neighborhood: "Downtown",
    bedrooms: 2,
    guests: 5,
    sqm: 109,
    priceFrom: 17500,
    images: [
      "seraya/units/unit-47/listing/web/Downtown Views II_T1_1901(Web)-51",
      "seraya/units/unit-47/listing/web/Downtown Views II_T1_1901(Web)-14",
      "seraya/units/unit-47/listing/web/Downtown Views II_T1_1901(Web)-34",
      "seraya/units/unit-47/listing/web/Downtown Views II_T1_1901(Web)-2",
    ],
  },
];
