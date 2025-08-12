import localstorage, { localstorageGetItem } from "./localstorage";

// LINK https://wardafactory.atlassian.net/wiki/spaces/LibraryUI

export const THEME_KEY = "libraryuiTheme";

export const getFontsFamily = (): string[] => {
  try {
    const theme = getTheme();
    return theme.fonts.map((f) => f.family);
  } catch {
    removeTheme();
    return [];
  }
};
export const getFontWeight = (
  fontFamily: string,
  w: "regular" | "lighter" | "bolder",
): number => {
  const theme = getTheme();
  const weights = theme.fonts.find((f) => f.family === fontFamily).weight;
  if (w === "lighter") return weights[0];
  if (w === "bolder") return weights[2];
  return weights[1];
};
export const getFontSourceFormat = (url: string): string => {
  try {
    const urlObject = new URL(url);
    const pathname = urlObject.pathname;
    const parts = pathname.split("/");
    const lastPart = parts[parts.length - 1];
    const dotIndex = lastPart.lastIndexOf(".");
    if (dotIndex !== -1 && dotIndex !== lastPart.length - 1) {
      return lastPart.substring(dotIndex + 1);
    }
    return undefined;
  } catch (error) {
    return undefined;
  }
};
export const getFontSource = (fontFamily: string): FontSource[] => {
  const theme = getTheme();
  const url = theme.fonts.find((f) => f.family === fontFamily).source;
  const format = getFontSourceFormat(url);
  if (!!format) return [{ url, format }];
  return [
    {
      url,
      format: "woff2",
    },
    {
      url,
      format: "woff",
    },
    {
      url,
      format: "opentype",
    },
  ];
};

export type FontSource = {
  url: string;
  format: string; // Ex: "woff2", "woff", "opentype"
};
export type FontConfig = {
  fontFamily: string;
  sources: FontSource[];
  fontStyle?: string;
  fontWeight?: string;
  fontStretch?: string; // Ex: "normal", "condensed", "expanded", etc.
  fontDisplay?: string; // Ex: "auto", "block", "swap", etc.
};
const getFontConfigFromTheme = (): FontConfig[] => {
  return getFontsFamily().map((fontFamily) => {
    const config: FontConfig = {
      fontFamily,
      sources: getFontSource(fontFamily),
    };
    return config;
  });
};
export const loadFonts = () => {
  getFontConfigFromTheme().forEach(
    ({
      fontFamily,
      sources,
      fontStyle = "normal",
      fontWeight = "400",
      fontStretch = "normal",
      fontDisplay = "swap", // Default a 'swap'
    }) => {
      const src = sources
        .map(({ url, format }) => `url("${url}") format("${format}")`)
        .join(", ");

      if (fontDisplay) {
        const style = document.createElement("style");
        style.textContent = `
          @font-face {
            font-family: '${fontFamily}';
            font-display: ${fontDisplay};
          }
        `;
        document.head.appendChild(style);
      }

      const fontFace = new FontFace(fontFamily, src, {
        style: fontStyle,
        weight: fontWeight,
        stretch: fontStretch,
      });

      fontFace
        .load()
        .then(() => {
          document.fonts.add(fontFace);
          // console.log(`Font ${fontFamily} loaded successfully.`);
        })
        .catch((err) => {
          console.error(`Failed to load font ${fontFamily}:`, err);
        });
    },
  );
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
    family: string;
    weight: [number, number, number];
    source: string;
  }[];
}

export const THEME_COLORS_SOFT: IThemeColors = {
  isDark: false,
  theme1: "#7301ff",
  theme2: "#eb017c",
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
  fonts: [
    {
      family: "Roboto",
      weight: [300, 400, 700],
      source:
        "https://fonts.gstatic.com/s/roboto/v32/KFOiCnqEu92Fr1Mu51QrEz0dL-vwnYh2eg.woff2",
    },
  ],
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
