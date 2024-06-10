import * as React from "react";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import Text from "../Text";

export const getLabels = (label: string | ILabel[] | React.ReactElement) => {
  if (!label) return null;
  if (Array.isArray(label)) {
    return label.map((l: ILabel, i: number) => (
      <Label key={String(i)} {...l} />
    ));
  }
  return <Label label={label} positionY="top" positionX="left" />;
};

const useStyles = createUseStyles({
  label: {
    position: "absolute",
    "max-width": 250,
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
  label: string | React.ReactNode;
  required?: boolean;
  positionX: "left" | "right";
  positionY: "bottom" | "top";
}

const Label = ({
  className,
  style,
  label,
  required,
  positionX,
  positionY,
}: ILabel) => {
  const classes = useStyles({});
  if (!label) return null;
  return (
    <Text
      ellipsis
      style={style}
      className={classnames({
        [classes.label]: true,
        [classes.labelTL]: positionX === "left" && positionY === "top",
        [classes.labelTR]: positionX === "right" && positionY === "top",
        [classes.labelBL]: positionX === "left" && positionY === "bottom",
        [classes.labelBR]: positionX === "right" && positionY === "bottom",
        [className]: !!className,
      })}
    >
      <>
        {label}
        {!required ? null : <span style={{ color: "#FF0000" }} children=" *" />}
      </>
    </Text>
  );
};

export default Label;
