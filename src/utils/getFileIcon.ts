import { MediaKind } from "../contexts/AppMediaTypeContext";
import { TYPE_FOLDER } from "../constants";
import { FileType } from "../interfaces";

const getFileIcon = (
  mimeType: string,
  mimeKind: (mimeType: string) => MediaKind,
  fileType?: FileType,
): string => {
  if (TYPE_FOLDER === mimeType) return "folder";
  if (fileType === FileType.FOLDER) return "folder";
  if (fileType === FileType.PORTAL) return "cast_connected";
  const kind = mimeKind(mimeType);
  if (kind === MediaKind.IMG) return "image";
  if (kind === MediaKind.VID) return "videocam";
  if (kind === MediaKind.DOC) return "insert_drive_file";
  if (kind === MediaKind.UNKNOWN) return "insert_drive_file";
  return "insert_drive_file";
};

export default getFileIcon;
