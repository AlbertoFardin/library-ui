// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types
// https://www.mario-online.com/mime_types.html

export const typeImage = [
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
];

export const typeDocument = [
  "image/vnd.adobe.photoshop",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
];

export const typeVideo = [
  "video/mp4",
  "video/mpeg",
  "video/ogg",
  "video/quicktime",
  "video/webm",
  "video/x-msvideo",
  "video/avi",
];

export const acceptImages = [""].concat(typeImage).join();
export const acceptVideos = [""].concat(typeVideo).join();

export const maxSize = () => 4000000000;
