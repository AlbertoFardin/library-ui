import { IAnnotationGeometry, IPoint } from "../interfaces";
import getSelectionRect from "./getSelectionRect";

export default ({ x, y }: IPoint, geometry: IAnnotationGeometry) => {
  const { points } = geometry;
  const rect = getSelectionRect(points);

  return x > rect.left && x < rect.right && y > rect.top && y < rect.bottom;
};
