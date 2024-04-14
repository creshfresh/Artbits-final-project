const palette = {
  //Whites and greys
  neutral100: "#FFFBFB",
  neutral200: "#E9E8E8",
  neutral300: "#E3E3E3",
  neutral400: "#ADABAB",
  neutral500: "#72809C",
  neutral600: "#D9D9D9",

  //Main color, same color of logo
  primary100: "#E53A12",
  primary200: "#E53A12",

  //Secondary color
  secondary100: "#3A7ED7",

  //Blacks
  black100: "#323232",
} as const;

export const colors = {
  palette,

  transparent: "rgba(0, 0, 0, 0)",
  main: palette.primary100,
  text: palette.black100,

  textDim: palette.primary100,

  background: palette.neutral100,
};