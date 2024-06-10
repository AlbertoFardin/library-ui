import { localstorageGetItem } from "../localstorage";

const langDefault = "en";
const langsDefault = { en: {} };

export const getLanguage = (langs = langsDefault) => {
  const langDevice =
    typeof window !== "undefined" && window.navigator.language.substring(0, 2);
  let findLangDevice = false;
  for (const l in langs) {
    if (l === langDevice) findLangDevice = true;
  }
  const langFound = findLangDevice ? langDevice : langDefault;
  const lang = localstorageGetItem<string>("lang", langFound);
  return lang.toLowerCase();
};

export const i18n = (stringKey, langs = langsDefault) => {
  const langCode = getLanguage(langs);
  const i18nValue = langs[langCode] || langs[langDefault];
  return i18nValue[stringKey] || stringKey;
};

export default i18n;
