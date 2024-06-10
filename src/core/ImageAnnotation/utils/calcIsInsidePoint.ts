import { IAnnotationGeometry, IPoint } from "../interfaces";
import getSelectionRect from "./getSelectionRect";

export default ({ x, y }: IPoint, geometry: IAnnotationGeometry) => {
  const pointX = geometry.x;
  const pointY = geometry.y;
  const offset = 5;
  const rect = getSelectionRect([
    { x: pointX + offset, y: pointY + offset },
    { x: pointX + offset, y: pointY - offset },
    { x: pointX - offset, y: pointY + offset },
    { x: pointX - offset, y: pointY - offset },
  ]);

  return x > rect.left && x < rect.right && y > rect.top && y < rect.bottom;
};
