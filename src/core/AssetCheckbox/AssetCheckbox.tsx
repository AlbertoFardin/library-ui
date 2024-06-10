import * as React from "react";
import { createUseStyles } from "react-jss";
import Icon from "../Icon";
import { getTheme } from "../../theme";
import BtnBase, { IKeyDown } from "../BtnBase";
import classnames from "classnames";

const SIZE = 20;

interface ISsCheckboxVisible {
  type: "none" | "mousehover" | "always";
  selected: boolean;
  disabled: boolean;
  mouseHover: boolean;
}
const isCheckboxVisible = ({
  type,
  selected,
  disabled,
  mouseHover,
}: ISsCheckboxVisible): boolean => {
  switch (type) {
    case "none":
      return false;
    case "always":
      return true;
    case "mousehover":
      return selected || (mouseHover && !disabled);
    default:
      return false;
  }
};

interface IStyles {
  selected: boolean;
  color: string;
}
const useStyles = createUseStyles({
  btnbase: {
    color: ({ color }: IStyles) => color,
    padding: 10,
    "border-radius": getTheme().borderRadius,
    "min-height": SIZE,
    "min-width": SIZE,
    "max-height": SIZE,
    "max-width": SIZE,
    height: SIZE,
    width: SIZE,
    overflow: "hidden",
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
    position: "relative",
  },
  checkboxIcon: {
    transform: "scale(0)",
    transition: "250ms transform",
    "background-color": ({ color }: IStyles) => color,
    "border-radius": 4,
    height: SIZE - 2,
    width: SIZE - 2,
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
  },
  checkboxIconSelected: {
    transform: "scale(1)",
  },
  checkbox: {
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
    "background-color": "#fff",
    border: ({ selected, color }: IStyles) =>
      `1px solid ${selected ? color : getTheme().colors.grayBorder}`,
    "border-radius": getTheme().borderRadius,
    "box-sizing": "border-box",
    position: "absolute",
    top: 10,
    left: 10,
    opacity: 0,
  },
  checkboxShow: {
    opacity: 1,
  },
  icon: {
    "font-size": 20,
    transition: "250ms all",
    transform: "scale(1)",
  },
  iconHide: {
    transform: "scale(0)",
  },
});

export interface IAssetCheckbox {
  className?: string;
  style?: React.CSSProperties;
  color: string;
  icon: string;
  type: "none" | "mousehover" | "always";
  selected?: boolean;
  disabled?: boolean;
  mouseHover?: boolean;
  onClick: (e: React.MouseEvent, p: IKeyDown) => void;
}
const AssetCheckbox = ({
  className,
  style,
  color,
  icon,
  type,
  selected,
  disabled,
  mouseHover,
  onClick,
}: IAssetCheckbox) => {
  const classes = useStyles({
    selected,
    color,
  });
  const checkboxVisible = isCheckboxVisible({
    type,
    selected,
    disabled,
    mouseHover,
  });

  return (
    <BtnBase
      style={style}
      className={classnames({
        [classes.btnbase]: true,
        [className]: !!className,
      })}
      color={color}
      onClick={onClick}
      disabled={disabled}
    >
      <div
        className={classnames({
          [classes.checkbox]: true,
          [classes.checkboxShow]: checkboxVisible,
        })}
      >
        <div
          className={classnames({
            [classes.checkboxIcon]: true,
            [classes.checkboxIconSelected]: selected,
          })}
        >
          <Icon style={{ color: "#fff", fontSize: 12 }} children="check" />
        </div>
      </div>
      <Icon
        className={classnames({
          [classes.icon]: true,
          [classes.iconHide]: checkboxVisible,
        })}
        children={icon}
      />
    </BtnBase>
  );
};

export default AssetCheckbox;
