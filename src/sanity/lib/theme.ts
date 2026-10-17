// Palette du site d'origine (relevée sur aude-naturo.fr)
export const colors = {
  beige: "#F3EFEA",
  cream: "#FAF7F4",
  white: "#FFFFFF",
  grey: "#E6E2DE",
  lightGrey: "#E5E5E5",
  green: "#627750",
  darkGreen: "#4C5B40",
  purple: "#572F7C",
  deepPurple: "#372658",
} as const;

export type ColorName = keyof typeof colors;

export const backgroundOptions = [
  { title: "Beige (fond du site)", value: "beige" },
  { title: "Crème", value: "cream" },
  { title: "Blanc", value: "white" },
  { title: "Gris", value: "grey" },
  { title: "Vert", value: "green" },
  { title: "Vert foncé", value: "darkGreen" },
  { title: "Violet", value: "purple" },
  { title: "Violet foncé", value: "deepPurple" },
];

export const darkBackgrounds: ColorName[] = ["green", "darkGreen", "purple", "deepPurple"];

export const textToneOptions = [
  { title: "Foncé", value: "dark" },
  { title: "Gris clair", value: "muted" },
  { title: "Blanc", value: "light" },
];

export const headingColorOptions = [
  { title: "Violet", value: "purple" },
  { title: "Noir", value: "black" },
  { title: "Blanc", value: "white" },
];

export const titleSizeOptions = [
  { title: "Très grand (70px)", value: "xxl" },
  { title: "Grand (60px)", value: "xl" },
  { title: "Moyen-grand (50px)", value: "lg" },
  { title: "Moyen (40px)", value: "md" },
  { title: "Petit (36px)", value: "sm" },
];

export const shapeOptions = [
  { title: "Rectangle", value: "rect" },
  { title: "Coins légèrement arrondis", value: "soft" },
  { title: "Coins arrondis", value: "rounded" },
  { title: "Ovale / cercle", value: "oval" },
  { title: "Goutte (coin haut-droit carré)", value: "leafTR" },
  { title: "Demi-arrondi à droite", value: "halfRight" },
  { title: "Feuille (diagonale)", value: "leafDiag" },
];
