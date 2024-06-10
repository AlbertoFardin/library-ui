import serializeObject from "../../utils/serializeObject";

const getPreviewSrcUrl = (srcUrl: string, loadTime: number): string => {
  return !srcUrl
    ? ""
    : srcUrl +
        (srcUrl.includes("?") ? "&" : "?") +
        serializeObject({
          loadTime,
        });
};

export default getPreviewSrcUrl;
