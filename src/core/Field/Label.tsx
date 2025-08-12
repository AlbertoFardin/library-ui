import * as React from "react";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import Text from "../Text";
import LabelMandatory from "./LabelMandatory";

export const getLabels = (label: string | ILabel[]) => {
  if (!label) return null;
  if (Array.isArray(label)) {
    return label.map((l: ILabel, i: number) => <Label key={i} {...l} />);
  }
  return <Label text={label} positionY="top" positionX="left" />;
};

const useStyles = createUseStyles({
  label: {
    position: "absolute",
    maxWidth: 250,
    zIndex: 1,
  },
  labelTL: {
    top: "-20px",
    left: 5,
  },
  labelTR: {
    top: "-20px",
    right: 5,
  },
  labelBL: {
    bottom: "-20px",
    left: 5,
  },
  labelBR: {
    bottom: "-20px",
    right: 5,
  },
});

export interface ILabel {
  className?: string;
  style?: React.CSSProperties;
  node?: JSX.Element | React.ReactNode;
  text?: string;
  textMandatory?: boolean;
  positionX: "left" | "right";
  positionY: "bottom" | "top";
}

const Label = ({
  className,
  style,
  node,
  text,
  textMandatory,
  positionX,
  positionY,
}: ILabel) => {
  const classes = useStyles({});
  const c = classnames({
    [classes.label]: true,
    [classes.labelTL]: positionX === "left" && positionY === "top",
    [classes.labelTR]: positionX === "right" && positionY === "top",
    [classes.labelBL]: positionX === "left" && positionY === "bottom",
    [classes.labelBR]: positionX === "right" && positionY === "bottom",
    [className]: !!className,
  });

  if (!text && !node) return null;

  if (!!node) {
    return <div style={style} className={c} children={node} />;
  }

  return (
    <Text
      ellipsis
      style={style}
      className={c}
      children={<LabelMandatory label={text} mandatory={textMandatory} />}
    />
  );
};

export default Label;
