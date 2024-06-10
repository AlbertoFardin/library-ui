import * as React from "react";
import { getTheme } from "../../theme";
import { createUseStyles } from "react-jss";
import { IFacetToggleAction } from "./interfaces";
import BtnBase from "../BtnBase";
import Text from "../Text";
import classnames from "classnames";
import mixColors from "../../utils/mixColors";

interface IStyles {
  selected: boolean;
  width: number;
  color: string;
}
const useStyles = createUseStyles({
  btn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: ({ width }: IStyles) => width,
    flex: 1,
    borderRadius: 3,
    minHeight: 20,
    margin: 2,
    color: ({ color }: IStyles) => color,
    transition: "all 350ms",
    backgroundColor: ({ color, selected }: IStyles) =>
      selected
        ? mixColors(0.8, color, getTheme().colors.background)
        : getTheme().colors.background,
    "&:hover": {
      backgroundColor: ({ color, selected }: IStyles) =>
        selected
          ? mixColors(0.8, color, getTheme().colors.background)
          : getTheme().colors.mousehover,
    },
  },
  btnLabel: {
    lineHeight: "inherit",
    margin: 0,
    color: ({ color, selected }: IStyles) =>
      selected ? color : getTheme().colors.typography,
  },
});

interface IFacetToggleButton extends IFacetToggleAction {
  onClick: (id: string) => void;
  color: string;
}
const FacetToggleButton = ({
  id,
  selected,
  color,
  label,
  onClick,
  width,
  className,
  style,
}: IFacetToggleButton) => {
  const classes = useStyles({ color, selected, width });
  const cbOnClick = React.useCallback(() => onClick(id), [id, onClick]);
  return (
    <BtnBase
      className={classnames({
        [classes.btn]: true,
        [className]: !!className,
      })}
      style={style}
      onClick={cbOnClick}
    >
      <Text
        size={0}
        weight="bolder"
        ellipsis
        children={label}
        className={classes.btnLabel}
      />
    </BtnBase>
  );
};

export default FacetToggleButton;
