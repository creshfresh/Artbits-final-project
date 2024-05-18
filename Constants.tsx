export type ProjectImages = {
  id: number;
  medium_type: string;
  url: string[];
  user_id: string;
  title: string;
  description: string;
  publish_date: Date;
};

export const cardData = [
  {
    id: "1",
    title: "Concurso de Fotografía Visiones Urbanas",
    centre: "UNESCO Center of Extremadura",
    date: "17 ABRIL 24 ",
    estado: "abierto",
  },
  {
    id: "2",
    title: "Certamen de Poesía 'Versos del Alma'",
    centre: "Art Institute of Barcelona",
    date: "20 MAYO 24 ",
    estado: "cerrado",
  },
  {
    id: "3",
    title: "Desafío de Escultura 'Formas en Movimiento'",
    centre: "Creative Hub Madrid",
    date: "12 JUNIO 24 ",
    estado: "abierto",
  },
  {
    id: "4",
    title: "Maratón de Danza Contemporánea 'Expresión Corporal'",
    centre: "Innovation Lab Valencia",
    date: "5 JULIO 24 ",
    estado: "abierto",
  },
  {
    id: "5",
    title: "Concurso de Diseño Gráfico 'Imágenes Innovadoras'",
    centre: "Cultural Center Seville",
    date: "30 AGOSTO 24 ",
    estado: "cerrado",
  },
  {
    id: "6",
    title: "Torneo de Música Indie 'Sonidos Alternativos'",
    centre: "Arts Foundation Bilbao",
    date: "21 SEPTIEMBRE 24 ",
    estado: "abierto",
  },
  {
    id: "7",
    title: "Festival de Teatro Experimental 'Escenas Vivas'",
    centre: "Design Studio Malaga",
    date: "14 OCTUBRE 24 ",
    estado: "cerrado",
  },
  {
    id: "8",
    title: "Exhibición de Pintura Abstracta 'Colores del Cosmos'",
    centre: "Music Academy Granada",
    date: "7 NOVIEMBRE 24 ",
    estado: "abierto",
  },
  {
    id: "9",
    title: "Rally de Escritura Creativa 'Palabras en Acción'",
    centre: "Film School Zaragoza",
    date: "29 DICIEMBRE 24 ",
    estado: "cerrado",
  },
  {
    id: "10",
    title: "Competencia de Arte Digital 'Mundos Virtuales'",
    centre: "Dance Institute Valencia",
    date: "2 ENERO 25 ",
    estado: "abierto",
  },
];

export const options = [
  { label: "Traditional", value: "traditional" },
  { label: "Digital", value: "digital" },
];
export const WorkModelOptions = [
  { label: "Hybrid", value: "hybrid" },
  { label: "Remote", value: "remote" },
  { label: "In Office", value: "inOffice" },
];
export const ContracTypeOptions = [
  { label: "Permanent.", value: "permanent" },
  { label: "Fixed-term", value: "fixedterm" },
  { label: "Temporary", value: "temporary" },
  { label: "Internship", value: "internship" },
];
export const WorkingHoursOptions = [
  { label: "Full-time", value: "fulltime" },
  { label: "Part time", value: "partime" },
];
export const participantsOptions = [
  { label: "Spain", value: "spain" },
  { label: "International", value: "international" },
];

export const DummyData: ProjectImages[] = [
  {
    id: 1,
    medium_type: "Traditional",
    url: [
      "https://cdnb.artstation.com/p/assets/images/images/012/782/743/large/bryan-lee-model2.jpg?1536508745",
    ],
    user_id: "",
    description: "",
    title: "",
    publish_date: new Date(),
  },
  {
    id: 2,
    medium_type: "Traditional",
    url: [
      "https://cdnb.artstation.com/p/assets/images/images/012/782/743/large/bryan-lee-model2.jpg?1536508745",
    ],
    user_id: "",
    description: "",
    title: "",
    publish_date: new Date(),
  },
  {
    id: 3,
    medium_type: "Traditional",
    url: [
      "https://cdnb.artstation.com/p/assets/images/images/012/782/743/large/bryan-lee-model2.jpg?1536508745",
    ],
    user_id: "",
    description: "",
    title: "",
    publish_date: new Date(),
  },
  {
    id: 4,
    medium_type: "Traditional",
    url: [
      "https://cdnb.artstation.com/p/assets/images/images/012/782/725/large/bryan-lee-tommyl.jpg?1536508767",
    ],
    user_id: "",
    description: "",
    title: "",
    publish_date: new Date(),
  },
  {
    id: 5,
    medium_type: "Traditional",
    url: [
      "https://cdnb.artstation.com/p/assets/images/images/012/782/743/large/bryan-lee-model2.jpg?1536508745",
    ],
    user_id: "",
    description: "",
    title: "",
    publish_date: new Date(),
  },
  {
    id: 6,
    medium_type: "Digital",
    url: [
      "https://cdnb.artstation.com/p/assets/images/images/075/667/735/large/tooth-wu-f-2.jpg?1715134935",
    ],
    user_id: "",
    description: "",
    title: "",
    publish_date: new Date(),
  },
  {
    id: 7,
    medium_type: "Traditional",
    url: [
      "https://cdnb.artstation.com/p/assets/images/images/012/782/743/large/bryan-lee-model2.jpg?1536508745",
    ],
    user_id: "",
    description: "",
    title: "",
    publish_date: new Date(),
  },
  {
    id: 8,
    medium_type: "Digital",
    url: [
      "https://cdna.artstation.com/p/assets/images/images/074/232/300/large/colombe-fretel-hadeschara.jpg?1711552183",
    ],
    user_id: "",
    description: "",
    title: "",
    publish_date: new Date(),
  },
  {
    id: 9,
    medium_type: "Digital",
    url: [
      "https://cdna.artstation.com/p/assets/images/images/074/232/300/large/colombe-fretel-hadeschara.jpg?1711552183",
    ],
    user_id: "",
    description: "",
    title: "",
    publish_date: new Date(),
  },
  {
    id: 10,
    medium_type: "Digital",
    url: [
      "https://cdna.artstation.com/p/assets/images/images/061/214/264/large/colombe-fretel-fretel-colombe-shepherd4.jpg?1680257279",
    ],
    user_id: "",
    description: "",
    title: "",
    publish_date: new Date(),
  },
  {
    id: 11,
    medium_type: "Traditional",
    url: [
      "https://cdnb.artstation.com/p/assets/images/images/012/782/743/large/bryan-lee-model2.jpg?1536508745",
    ],
    user_id: "",
    description: "",
    title: "",
    publish_date: new Date(),
  },
  {
    id: 12,
    medium_type: "Traditional",
    url: [
      "https://cdnb.artstation.com/p/assets/images/images/012/782/743/large/bryan-lee-model2.jpg?1536508745",
    ],
    user_id: "",
    description: "",
    title: "",
    publish_date: new Date(),
  },
  {
    id: 13,
    medium_type: "Traditional",
    url: [
      "https://cdnb.artstation.com/p/assets/images/images/012/782/743/large/bryan-lee-model2.jpg?1536508745",
    ],
    user_id: "",
    description: "",
    title: "",
    publish_date: new Date(),
  },
];
