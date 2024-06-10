export const isMacintosh = (): boolean => {
  return navigator.platform.indexOf("Mac") > -1;
};

export const isWindows = (): boolean => {
  return navigator.platform.indexOf("Win") > -1;
};

export const isMobile = (): boolean => {
  return (
    typeof window.orientation !== "undefined" ||
    navigator.userAgent.indexOf("IEMobile") !== -1
  );
};

export const isDeviceLandscape = (): boolean => {
  try {
    if (!window.matchMedia("(orientation: landscape)").matches) throw "no";
    return true;
  } catch {
    return false;
  }
};

export const isBrowserChrome = (): boolean => {
  const ua = navigator.userAgent.toLowerCase();
  const isChrome = /chrome|crios/.test(ua);
  return isChrome;
};
