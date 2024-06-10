import { IPoint } from "../interfaces";

export default (points: IPoint[]) =>
  points.reduce(
    (temp, { x, y }) => {
      if (!temp.top || !temp.right || !temp.bottom || !temp.left) {
        return {
          top: y,
          right: x,
          bottom: y,
          left: x,
        };
      }
      return {
        top: Math.min(y, temp.top),
        right: Math.max(x, temp.right),
        bottom: Math.max(y, temp.bottom),
        left: Math.min(x, temp.left),
      };
    },
    { top: undefined, right: undefined, bottom: undefined, left: undefined },
  );
