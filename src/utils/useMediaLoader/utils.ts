import { CACHE_BUST } from "../../contexts/AppHelperContext/constantLocalStorage";
import serializeObject from "../serializeObject";

export const KEY_RETRY = "try";

export const addingQuerystringCacheBust = (
  srcUrl: string,
  cacheBust: string,
): string => {
  if (!srcUrl) return "";
  if (cacheBust == null) return srcUrl;
  return (
    srcUrl +
    (srcUrl.includes("?") ? "&" : "?") +
    serializeObject({ [CACHE_BUST]: cacheBust })
  );
};

export const addingQuerystringKeyRetry = (
  srcUrl: string,
  retry: number,
): string => {
  if (!srcUrl) return "";
  return (
    srcUrl +
    (srcUrl.includes("?") ? "&" : "?") +
    serializeObject({ [KEY_RETRY]: retry })
  );
};

export const getRetryDelay = (): number => {
  // randomico da 2 a 5
  return (Math.floor(Math.random() * 3) + 2) * 1000;
};
