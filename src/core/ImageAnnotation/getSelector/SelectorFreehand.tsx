/* eslint-disable no-mixed-operators */
import forEach from "lodash-es/forEach";
import isEmpty from "lodash-es/isEmpty";
import * as React from "react";
import hexToRgbA from "../../../utils/hexToRgbA";
import { IAnnotation } from "../interfaces";

// % to px converter
const percToPx = (value: number, size: number) =>
  Math.round((value * size) / 100);

interface ISelectorFreehand {
  active?: boolean;
  annotation: IAnnotation;
  imageHeight: number;
  imageWidth: number;
  color?: string;
}

const SelectorFreehand = ({
  active = false,
  annotation,
  imageHeight,
  imageWidth,
  color = "#9a9a9a",
}: ISelectorFreehand) => {
  const canvasRef = React.useRef(null);
  const points = annotation.geometry.points.map((p) => ({
    x: percToPx(p.x, imageWidth),
    y: percToPx(p.y, imageHeight),
  }));
  const draw = () => {
    const cvs = canvasRef.current;

    if (!!cvs && !isEmpty(points)) {
      const ctx = cvs.getContext("2d");
      const startPoint = points.shift();

      // draw border
      ctx.beginPath();
      ctx.strokeStyle = "#ffffff";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = 5;
      ctx.moveTo(startPoint.x, startPoint.y);
      forEach(points, (p) => ctx.lineTo(p.x, p.y));
      ctx.stroke();

      // draw line
      ctx.beginPath();
      ctx.strokeStyle = hexToRgbA(color, active ? 1 : 0.6);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = 3;
      ctx.moveTo(startPoint.x, startPoint.y);
      forEach(points, (p) => ctx.lineTo(p.x, p.y));
      ctx.stroke();
    }

    return null;
  };

  React.useEffect(() => {
    draw();
  });

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute" as const,
        top: "0",
        left: "0",
      }}
      width={imageWidth}
      height={imageHeight}
    />
  );
};

export default SelectorFreehand;
