import * as s from "../selectors";
import base from "./base";
import pen from "./pen";
import point from "./point";

const getCursor = (selector: string, readOnly = false) => {
  if (readOnly) return base;
  switch (selector) {
    case s.PointSelector.TYPE:
      return point;
    case s.OvalSelector.TYPE:
      return pen;
    case s.RectangleSelector.TYPE:
      return pen;
    default:
      return pen;
  }
};

export default getCursor;
