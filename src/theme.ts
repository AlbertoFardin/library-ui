import localstorage, { localstorageGetItem } from "./localstorage";

// LINK https://wardafactory.atlassian.net/wiki/spaces/LibraryUI

export const THEME_KEY = "theme";

export const getFonts = (): string[] => {
  const theme = getTheme();
  const array: string[] = [];
  theme.fonts.google?.families.forEach((f) => {
    const fontName = f.split(":")[0];
    array.push(fontName);
  });
  theme.fonts.custom?.families.forEach((f) => {
    const fontName = f.split(":")[0];
    array.push(fontName);
  });
  return array;
};
export const getFontData = (fontName: string): string => {
  const theme = getTheme();
  let fontData = "";
  theme.fonts.google?.families.forEach((f) => {
    if (f.split(":")[0] === fontName) fontData = f;
  });
  theme.fonts.custom?.families.forEach((f) => {
    if (f.split(":")[0] === fontName) fontData = f;
  });
  return fontData;
};
export const getFontWeight = (
  fontName: string,
  w: "regular" | "lighter" | "bolder",
): number => {
  const weights: number[] = getFontData(fontName)
    .split(":")[1]
    .split(",")
    .map((n) => Number(n));
  if (weights.length === 1) return weights[0];
  if (w === "lighter") return weights[0];
  if (w === "bolder") return weights[2];
  return weights[1];
};

export interface IThemeColors {
  isDark: boolean;
  theme1: string;
  theme2: string;
  mousehover: string;
  background: string;
  grayDrawer: string;
  grayBorder: string;
  typography: string;
  disable: string;
  msgFail: string;
  msgInfo: string;
  msgSucc: string;
  msgWarn: string;
}
export interface IThemeZIndex {
  appBar: number;
  drawer: number;
  modal: number;
  snackbar: number;
  tooltip: number;
}
export interface ITheme {
  id: string;
  version: number;
  colors: IThemeColors;
  zIndex: IThemeZIndex;
  borderRadius: number;
  fonts: {
    google?: {
      families: string[];
    };
    custom?: {
      families: string[];
      urls: string[];
    };
  };
}

export const THEME_COLORS_SOFT: IThemeColors = {
  isDark: false,
  theme1: "#C07CF1",
  theme2: "#002BFF",
  mousehover: "#f1f1f1",
  background: "#ffffff",
  grayDrawer: "#f4f5f7",
  grayBorder: "#dddddd",
  typography: "#333333",
  disable: "#b0b0b0",
  msgFail: "#D90B0B",
  msgInfo: "#002BFF",
  msgSucc: "#48B784",
  msgWarn: "#F4A902",
};
export const THEME_COLORS_DARK: IThemeColors = {
  isDark: true,
  theme1: "#C07CF1",
  theme2: "#002BFF",
  mousehover: "#2f2f2f",
  background: "#212121",
  grayDrawer: "#333333",
  grayBorder: "#444444",
  typography: "#ffffff",
  disable: "#666666",
  msgFail: "#D90B0B",
  msgInfo: "#002BFF",
  msgSucc: "#48B784",
  msgWarn: "#F4A902",
};
export const THEME_DEFAULT_ZINDEX: IThemeZIndex = {
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500,
};
export const THEME_DEFAULT: ITheme = {
  id: "default",
  version: 0,
  colors: THEME_COLORS_SOFT,
  zIndex: THEME_DEFAULT_ZINDEX,
  borderRadius: 5,
  fonts: {
    google: {
      families: [
        "Roboto:300,400,500",
        "Freehand:400",
        "Rubik Marker Hatch:400",
      ],
    },
  },
};

export const removeTheme = () => {
  localstorage.removeItem(THEME_KEY);
};

export const getTheme = (): ITheme => {
  return localstorageGetItem<ITheme>(THEME_KEY, THEME_DEFAULT);
};

export const setTheme = (v: ITheme) => {
  localstorage.setItem(THEME_KEY, JSON.stringify(v));
};
