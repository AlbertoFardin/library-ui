export const getSrcUrlBase = (srcUrl: string): string => {
  try {
    const urlObj = new URL(srcUrl);
    return `${urlObj.origin}${urlObj.pathname}`;
  } catch {
    return srcUrl;
  }
};
