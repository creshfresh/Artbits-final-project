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
  { label: "Hybrid", value: "Hybrid" },
  { label: "Remote", value: "Remote" },
  { label: "In Office", value: "In Office" },
];
export const ContracTypeOptions = [
  { label: "Permanent", value: "Permanent" },
  { label: "Fixed term", value: "Fixed term" },
  { label: "Temporary", value: "Temporary" },
  { label: "Internship", value: "Internship" },
];
export const WorkingHoursOptions = [
  { label: "Full time", value: "Full time" },
  { label: "Part time", value: "Part ime" },
];
export const participantsOptions = [
  { label: "Spain", value: "spain" },
  { label: "International", value: "international" },
];
export const scheduleOptions = [
  { label: "Full year", value: "Full year" },
  { label: "Short duration", value: "Short duration" },
];

