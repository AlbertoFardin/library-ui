import { ThemeKeys } from "react-json-view";

const themeMap: { [key: string]: ThemeKeys } = {
  apathy: "apathy",
  apathyInverted: "apathy:inverted",
  ashes: "ashes",
  bespin: "bespin",
  brewer: "brewer",
  brightInverted: "bright:inverted",
  bright: "bright",
  chalk: "chalk",
  codeschool: "codeschool",
  colors: "colors",
  eighties: "eighties",
  embers: "embers",
  flat: "flat",
  google: "google",
  grayscale: "grayscale",
  grayscaleInverted: "grayscale:inverted",
  greenscreen: "greenscreen",
  harmonic: "harmonic",
  hopscotch: "hopscotch",
  isotope: "isotope",
  marrakesh: "marrakesh",
  mocha: "mocha",
  monokai: "monokai",
  ocean: "ocean",
  paraiso: "paraiso",
  pop: "pop",
  railscasts: "railscasts",
  rjvDefault: "rjv-default",
  shapeshifter: "shapeshifter",
  shapeshifterInverted: "shapeshifter:inverted",
  solarized: "solarized",
  summerfruit: "summerfruit",
  summerfruitInverted: "summerfruit:inverted",
  threezerotwofour: "threezerotwofour",
  tomorrow: "tomorrow",
  tube: "tube",
  twilight: "twilight",
};

const getJsonViewerTheme = (key: string): ThemeKeys => {
  return themeMap[key] || "bright:inverted";
};
export default getJsonViewerTheme;
