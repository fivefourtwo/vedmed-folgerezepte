export const PRACTICES = [
  {
    id: 1,
    name: 'Tierarztpraxis Dr. Muster',
    city: 'Berlin-Mitte',
    zip: '10115',
    address: 'Rosenthaler Str. 12, 10115 Berlin',
  },
  {
    id: 2,
    name: 'Kleintierpraxis Bergmann & Partner',
    city: 'München',
    zip: '80333',
    address: 'Theresienstr. 31, 80333 München',
  },
  {
    id: 3,
    name: 'Tierarzt am Stadtpark – Dr. Schmidt',
    city: 'Hamburg',
    zip: '20148',
    address: 'Grindelberg 7, 20148 Hamburg',
  },
  {
    id: 4,
    name: 'Tierarztpraxis Seefeld',
    city: 'Köln',
    zip: '50679',
    address: 'Deutzer Freiheit 11, 50679 Köln',
  },
  {
    id: 5,
    name: 'Kleintierpraxis Dr. Weber',
    city: 'Frankfurt',
    zip: '60594',
    address: 'Schweizer Str. 42, 60594 Frankfurt',
  },
]

export const PHARMACIES = [
  {
    id: 1,
    name: 'Löwen-Apotheke',
    city: 'Berlin',
    canDeliver: true,
    deliveryNote: 'Versandkostenfrei ab 20 €',
  },
  {
    id: 2,
    name: 'Apotheke am Stadtpark',
    city: 'Hamburg',
    canDeliver: true,
    deliveryNote: '3,99 € Versandkosten',
  },
  {
    id: 3,
    name: 'Stadt-Apotheke Köln',
    city: 'Köln',
    canDeliver: false,
    deliveryNote: null,
  },
  {
    id: 4,
    name: 'Nordapotheke Frankfurt',
    city: 'Frankfurt',
    canDeliver: true,
    deliveryNote: '4,50 € Versandkosten',
  },
]

export const PET_TYPES = [
  { value: 'Hund', hint: null },
  { value: 'Katze', hint: null },
  { value: 'Kleintier', hint: 'Kaninchen, Meerschweinchen' },
  { value: 'Vogel', hint: null },
  { value: 'Pferd', hint: null },
  { value: 'Sonstiges', hint: null },
]
