import { getTheme } from "../../../theme";

export interface INavIconColors {
  typography: string;
  background: string;
  mousehover: string;
  grayBorder: string;
}

function utf8ToBase64(str: string): string {
  const utf8Encoder = new TextEncoder();
  const utf8Array = utf8Encoder.encode(str);
  let binary = "";
  for (let i = 0; i < utf8Array.length; i++) {
    binary += String.fromCharCode(utf8Array[i]);
  }
  return btoa(binary);
}

function svgToBase64(svg: string): string {
  return `data:image/svg+xml;base64,${utf8ToBase64(svg)}`;
}

function getSvg(
  fillColor: string,
  rectColor: string,
  strokeColor: string,
  svgElem: string,
): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" height="34px" width="34px" fill="${fillColor}" viewBox="0 0 340 340">
  <rect x="60" y="60" width="270" height="270" rx="50" ry="50" fill="${rectColor}" stroke="${strokeColor}" stroke-width="10"/>
  <g transform="scale(10) translate(7 8)">${svgElem}</g></svg>`; //
  return svgToBase64(svg);
}

enum SvgElem {
  // icon zoom in
  zommIn = '<path d="M0 0h24v24H0V0z" fill="none" /><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zm.5-7H9v2H7v1h2v2h1v-2h2V9h-2z"/>',
  // icon zoom out
  zoomOut = '<path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7V9z" />',
  // icon fit screen
  home = '<g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M17,4h5v5h-2V6h-3V4z M4,9V6h3V4H2v5H4z M20,15v3h-3v2h5v-5H20z M7,18H4v-3H2v5h5V18z M18,8H6v8h12V8z" /></g>',
  // icon full screen
  fullpage = '<path d="M0 0h24v24H0V0z" fill="none" /><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />',
}

function getStateSvgs(
  colors: INavIconColors,
  svgElem: string,
): Record<string, string> {
  const { typography, background, mousehover, grayBorder } = colors;
  return {
    REST: getSvg(typography, background, grayBorder, svgElem),
    GROUP: getSvg(typography, background, grayBorder, svgElem),
    HOVER: getSvg(typography, mousehover, grayBorder, svgElem),
    DOWN: getSvg(typography, mousehover, grayBorder, svgElem),
  };
}

function getNavIcons(
  colors: INavIconColors = getTheme().colors,
): Record<string, Record<string, string>> {
  const navIcons = {
    zoomIn: getStateSvgs(colors, SvgElem.zommIn),
    zoomOut: getStateSvgs(colors, SvgElem.zoomOut),
    home: getStateSvgs(colors, SvgElem.home),
    fullpage: getStateSvgs(colors, SvgElem.fullpage),
  };
  return navIcons;
}
export default getNavIcons;
