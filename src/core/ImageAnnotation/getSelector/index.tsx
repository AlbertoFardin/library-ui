/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import SelectorOval from "@warda/react-image-annotation/lib/components/Oval";
import SelectorRectangle from "@warda/react-image-annotation/lib/components/Rectangle";
import { IAnnotation } from "../interfaces";
import * as s from "../selectors";
import SelectorFreehand from "./SelectorFreehand";
import SelectorPoint from "./SelectorPoint";

interface IGetSelector {
  active?: boolean;
  color: string;
  annotation: IAnnotation;
  key: string;
  imageWidth: number;
  imageHeight: number;
}

const getSelector = ({
  active = false,
  color,
  annotation,
  key,
  imageWidth,
  imageHeight,
}: IGetSelector) => {
  const style = {
    boxShadow: `inset 0px 0px 0px 1px rgba(255,255,255,1),
      0px 0px 0px 1px rgba(255,255,255,1),
      0 2px 4px rgba(0,0,0,0.2)`,
    border: `2px solid ${color}`,
  };
  const props = {
    key,
    active,
    annotation,
    color,
    style,
    imageWidth,
    imageHeight,
  };

  switch (annotation.geometry.type) {
    case s.RectangleSelector.TYPE:
      return <SelectorRectangle {...props} />;
    case s.PointSelector.TYPE:
      return <SelectorPoint {...props} />;
    case s.OvalSelector.TYPE:
      return <SelectorOval {...props} />;
    case s.FreehandSelector.TYPE:
      return <SelectorFreehand {...props} />;
    default:
      return null;
  }
};

export default getSelector;
