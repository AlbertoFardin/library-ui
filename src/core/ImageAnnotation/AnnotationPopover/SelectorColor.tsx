import * as React from "react";
import BtnBase from "../../BtnBase";
import { createUseStyles } from "react-jss";
import { IAnnotation } from "../interfaces";
import hexToRgbA from "../../../utils/hexToRgbA";

interface IStyles {
  color: string;
  active: boolean;
}
const useStyles = createUseStyles({
  btnColor: {
    position: "relative",
    width: 18,
    height: 18,
    margin: 1,
    display: "flex",
    transition: "250ms all",
    "align-items": "center",
    "justify-content": "center",
    "border-radius": 100,
    "border-style": "solid",
    "border-width": 1,
    "border-color": ({ active, color }: IStyles) =>
      active ? color : "transparent",
    "&:hover": {
      "background-color": ({ color }: IStyles) => hexToRgbA(color, 0.15),
    },
    "& div": {
      "border-radius": 100,
      width: 12,
      height: 12,
      "background-color": ({ color }: IStyles) => color,
    },
  },
});

interface IBtnColor {
  active: boolean;
  color: string;
  onClick: (s: string) => void;
}
const BtnColor = ({ active, color, onClick }: IBtnColor) => {
  const classes = useStyles({ color, active });
  const cbOnClick = React.useCallback(() => {
    onClick(color);
  }, [onClick, color]);
  return (
    <BtnBase
      color={color}
      className={classes.btnColor}
      onClick={cbOnClick}
      children={<div />}
    />
  );
};

interface ISelectorColor {
  annotation: IAnnotation;
  colors: string[];
  onClick: (s: string) => void;
}

const SelectorColor = ({ annotation, colors, onClick }: ISelectorColor) => (
  <>
    {colors.map((c) => (
      <BtnColor
        key={c}
        active={c === annotation.data.color}
        color={c}
        onClick={onClick}
      />
    ))}
  </>
);

export default SelectorColor;
