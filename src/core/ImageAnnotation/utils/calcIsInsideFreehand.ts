import { IAnnotationGeometry, IPoint } from "../interfaces";
import calcIsInsideThickLineSegment from "./calcIsInsideThickLineSegment";

export default ({ x, y }: IPoint, geometry: IAnnotationGeometry) => {
  const { points } = geometry;
  return points.find((p: IPoint, i: number) => {
    const p1 = p;
    const p2 = points[i + 1];
    if (!p2) return false;
    return calcIsInsideThickLineSegment(p1, p2, { x, y }, 3);
  });
};
