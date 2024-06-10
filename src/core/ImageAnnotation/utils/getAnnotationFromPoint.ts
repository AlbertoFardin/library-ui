import reverse from "lodash-es/reverse";
import { IAnnotation, IPoint } from "../interfaces";
import * as s from "../selectors";
import calcIsInsideFreehand from "./calcIsInsideFreehand";
import calcIsInsidePoint from "./calcIsInsidePoint";

export default (point: IPoint, annotations: IAnnotation[]) =>
  reverse(annotations).find((a: IAnnotation) => {
    switch (a.geometry.type) {
      case s.FreehandSelector.TYPE:
        return calcIsInsideFreehand(point, a.geometry);
      case s.PointSelector.TYPE:
        return calcIsInsidePoint(point, a.geometry);
      default:
        return false;
    }
  });
