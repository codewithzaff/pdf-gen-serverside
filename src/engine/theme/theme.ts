import { rgb } from "pdf-lib";

export const theme = {
  page: {
    width: 595,   // A4
    height: 842,
    margin: 50,
    headerHeight: 80,
    footerHeight: 40,
  },

  colors: {
    primary: rgb(0.06, 0.18, 0.35),   // Dark academic blue
    secondary: rgb(0.35, 0.35, 0.35), // Label gray
    text: rgb(0, 0, 0),               // Main text
    muted: rgb(0.55, 0.55, 0.55),
    line: rgb(0.8, 0.82, 0.85),
  },

  fonts: {
    titleSize: 13,
    labelSize: 10,
    valueSize: 10,
    headerSize: 16,
  },

  spacing: {
    sectionTop: 22,
    sectionBottom: 12,
    rowGap: 14,
  },
};
