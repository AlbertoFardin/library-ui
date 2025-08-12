export enum MediaKind {
  IMG = "image", // value from BE
  VID = "video", // value from BE
  DOC = "document", // value from BE
  UNKNOWN = "unknown",
}

export interface MediaData {
  [MediaKind.IMG]: {
    mimeTypes: string[];
    renditions: string[];
  };
  [MediaKind.VID]: {
    mimeTypes: string[];
    renditions: string[];
  };
  [MediaKind.DOC]: {
    mimeTypes: string[];
    renditions: string[];
  };
}

export const getMediaKind = (
  mimeType: string,
  mediaData: MediaData,
): MediaKind => {
  const isImg = new Set(mediaData.image.mimeTypes).has(mimeType);
  if (isImg) return MediaKind.IMG;
  const isVid = new Set(mediaData.video.mimeTypes).has(mimeType);
  if (isVid) return MediaKind.VID;
  const isDoc = new Set(mediaData.document.mimeTypes).has(mimeType);
  if (isDoc) return MediaKind.DOC;
  return MediaKind.UNKNOWN;
};

export const MEDIADATA: MediaData = {
  [MediaKind.IMG]: {
    mimeTypes: [
      "image/jpeg",
      "image/png",
      "image/tiff",
      "image/svg+xml",
      "image/x-canon-cr2",
      "image/x-adobe-dng",
      "image/x-pentax-pef",
      "image/x-panasonic-rw2",
      "image/x-sony-arw",
      "image/x-nikon-nef",
    ],
    renditions: ["xs", "s", "l", "xxl", "identify", "zoom-tiles"],
  },
  [MediaKind.VID]: {
    mimeTypes: [
      "video/mp4",
      "video/mpeg",
      "video/ogg",
      "video/quicktime",
      "video/webm",
      "video/x-msvideo",
      "video/avi",
    ],
    renditions: ["LQ", "HQ"],
  },
  [MediaKind.DOC]: {
    mimeTypes: [
      "image/vnd.adobe.photoshop",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "application/x-indesign",
    ],
    renditions: ["xs", "s", "l", "m"],
  },
};
