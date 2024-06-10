import Icon from "../../Icon";
import { createUseStyles } from "react-jss";
import * as React from "react";
import hexToRgbA from "../../../utils/hexToRgbA";
import { IAnnotation } from "../interfaces";

const useStyles = createUseStyles({
  root: {
    "border-radius": "50%",
    "box-sizing": "border-box",
    position: "absolute",
    left: 0,
    top: 0,
    height: 26,
    width: 26,
    transform: "translate3d(-50%, -50%, 0)",
    "box-shadow": "0 2px 4px rgba(0,0,0,0.2)",
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
  },
});

interface ISelectorPoint {
  active?: boolean;
  annotation: IAnnotation;
  color: string;
}

const SelectorPoint = ({
  active = false,
  annotation,
  color = "#9a9a9a",
}: ISelectorPoint) => {
  const classes = useStyles({});
  return (
    <div
      className={classes.root}
      style={{
        top: `${annotation.geometry.y}%`,
        left: `${annotation.geometry.x}%`,
        backgroundColor: hexToRgbA(color, active ? 1 : 0.6),
        border: "2px solid #ffffff",
      }}
    >
      {annotation.data.resolved ? (
        <Icon style={{ fontSize: 14, color: "#fff" }} children="check" />
      ) : null}
    </div>
  );
};

export default SelectorPoint;
