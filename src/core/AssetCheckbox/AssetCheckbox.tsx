import * as React from "react";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import Icon from "../Icon";
import { getTheme } from "../../theme";
import BtnBase, { IKeyDown } from "../BtnBase";

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
    borderRadius: getTheme().borderRadius,
    minHeight: SIZE,
    minWidth: SIZE,
    maxHeight: SIZE,
    maxWidth: SIZE,
    height: SIZE,
    width: SIZE,
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  checkboxIcon: {
    transform: "scale(0)",
    transition: "250ms transform",
    backgroundColor: ({ color }: IStyles) => color,
    borderRadius: 0,
    height: SIZE - 2,
    width: SIZE - 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxIconSelected: {
    transform: "scale(1)",
  },
  checkbox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    border: ({ selected, color }: IStyles) =>
      `1px solid ${selected ? color : getTheme().colors.grayBorder}`,
    borderRadius: getTheme().borderRadius,
    boxSizing: "border-box",
    position: "absolute",
    top: 10,
    left: 10,
    opacity: 0,
    overflow: "hidden",
  },
  checkboxShow: {
    opacity: 1,
  },
  icon: {
    fontSize: 20,
    transition: "250ms all",
    transform: "scale(1)",
  },
  iconHide: {
    transform: "scale(0)",
  },
});

export type CheckBoxType = "none" | "mousehover" | "always";

export interface IAssetCheckbox {
  className?: string;
  style?: React.CSSProperties;
  color: string;
  icon: string;
  type: CheckBoxType;
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
      disabled={
        disabled ||
        type === "none" ||
        (type === "mousehover" && mouseHover === false)
      }
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
