import { IPoint } from "../interfaces";

// https://stackoverflow.com/questions/6865832/detecting-if-a-point-is-of-a-line-segment/6877674
// tslint:disable:max-line-length

const calcIsInsideThickLineSegment = (
  line1: IPoint,
  line2: IPoint,
  pnt: IPoint,
  lineThickness: number,
) => {
  const L2 =
    (line2.x - line1.x) * (line2.x - line1.x) +
    (line2.y - line1.y) * (line2.y - line1.y);
  if (L2 === 0) return false;
  const r =
    ((pnt.x - line1.x) * (line2.x - line1.x) +
      (pnt.y - line1.y) * (line2.y - line1.y)) /
    L2;

  // Assume line thickness is circular
  if (r < 0) {
    // Outside line1
    return (
      Math.sqrt(
        (line1.x - pnt.x) * (line1.x - pnt.x) +
          (line1.y - pnt.y) * (line1.y - pnt.y),
      ) <= lineThickness
    );
  }
  if (r >= 0 && r <= 1) {
    // On the line segment
    const s =
      ((line1.y - pnt.y) * (line2.x - line1.x) -
        (line1.x - pnt.x) * (line2.y - line1.y)) /
      L2;
    return Math.abs(s) * Math.sqrt(L2) <= lineThickness;
  }
  // Outside line2
  return (
    Math.sqrt(
      (line2.x - pnt.x) * (line2.x - pnt.x) +
        (line2.y - pnt.y) * (line2.y - pnt.y),
    ) <= lineThickness
  );
};

export default calcIsInsideThickLineSegment;
