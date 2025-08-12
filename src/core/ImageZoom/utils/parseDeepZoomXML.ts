import { ResponsePayload } from "./getResponsePayload";

export interface IDeepZoomImageData {
  tileSize: number;
  overlap: number;
  format: string;
  xmlns: string;
  width: number;
  height: number;
}

const parseDeepZoomXML = (
  responsePayload: ResponsePayload,
): IDeepZoomImageData => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(
    responsePayload.content,
    "application/xml",
  );
  const imageElement = xmlDoc.getElementsByTagName("Image")[0];
  const sizeElement = xmlDoc.getElementsByTagName("Size")[0];
  if (!imageElement || !sizeElement) {
    throw new Error("Invalid XML format");
  }
  const tileSize = parseInt(imageElement.getAttribute("TileSize") || "0", 10);
  const overlap = parseInt(imageElement.getAttribute("Overlap") || "0", 10);
  const format = imageElement.getAttribute("Format") || "";
  const xmlns = imageElement.getAttribute("xmlns") || "";
  const width = parseInt(sizeElement.getAttribute("Width") || "0", 10);
  const height = parseInt(sizeElement.getAttribute("Height") || "0", 10);
  return { tileSize, overlap, format, xmlns, width, height };
};
export default parseDeepZoomXML;
