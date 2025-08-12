import * as dizExtensions from "./extensions.json";

const OCTET_STREAM_MIMETYPE = "application/octet-stream";

export const getExtension = (name: string): string => {
  const r = name.match(/\.([0-9a-z]+)(?:[\?#]|$)/i);
  return r ? r[1].toLowerCase() : undefined;
};

export const mimeTypeToExtension = (mimeType: string): string => {
  const k = Object.keys(dizExtensions).find((k) => {
    return dizExtensions[k].mime === mimeType;
  });
  return String(k);
};

const getMimeType = (name: string, type?: string): string => {
  if (!!type && type !== OCTET_STREAM_MIMETYPE) return type;

  try {
    const ext = getExtension(name);
    return dizExtensions[ext].mime;
  } catch {
    return OCTET_STREAM_MIMETYPE;
  }
};

export default getMimeType;
