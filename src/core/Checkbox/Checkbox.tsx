import * as React from "react";
import { getTheme } from "../../theme";
import { createUseStyles } from "react-jss";
import Zoom from "../Transitions/Zoom";
import classnames from "classnames";
import Icon from "../Icon";

interface IStyle {
  disabled: boolean;
  selected: boolean;
  color: string;
  size: number;
}
const useStyles = createUseStyles({
  checkbox: {
    display: "flex",
    alignItems: "center",
    backgroundColor: getTheme().colors.background,
    overflow: "hidden",
    minHeight: ({ size }: IStyle) => size,
    height: ({ size }: IStyle) => size,
    minWidth: ({ size }: IStyle) => size,
    width: ({ size }: IStyle) => size,
    border: "1px solid transparent",
    borderColor: ({ disabled, selected, color }: IStyle) => {
      if (disabled) return getTheme().colors.disable;
      if (selected) return color;
      return getTheme().colors.grayBorder;
    },
    borderRadius: 3,
  },
  checkboxRadio: {
    borderRadius: 100,
  },
  contentRadio: {
    width: ({ size }: IStyle) => size - 4,
    height: ({ size }: IStyle) => size - 4,
    borderRadius: 100,
    backgroundColor: ({ disabled, color }: IStyle) =>
      disabled ? getTheme().colors.disable : color,
  },
  contentCheck: {
    width: ({ size }: IStyle) => size,
    height: ({ size }: IStyle) => size,
    borderRadius: 1,
    backgroundColor: ({ disabled, color }: IStyle) =>
      disabled ? getTheme().colors.disable : color,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  contentCheckIcon: {
    color: getTheme().colors.background,
    fontSize: ({ size }: IStyle) => size,
  },
});

export enum SelectType {
  NONE = "NONE",
  RADIO = "RADIO",
  CHECK = "CHECK",
}
export interface ICheckbox {
  style?: React.CSSProperties;
  className?: string;
  size?: number;
  type: SelectType;
  color?: string;
  selected?: boolean;
  disabled?: boolean;
}

const Checkbox = ({
  style,
  className,
  size = 10,
  type,
  color = getTheme().colors.theme1,
  selected,
  disabled,
}: ICheckbox) => {
  const classes = useStyles({ color, size, selected, disabled });

  if (type === SelectType.NONE) return null;

  return (
    <div
      style={style}
      className={classnames({
        [classes.checkbox]: true,
        [classes.checkboxRadio]: type === SelectType.RADIO,
        [className]: !!className,
      })}
    >
      <div style={{ flex: 1 }} />
      <Zoom open={selected}>
        {type === SelectType.RADIO ? (
          <div className={classes.contentRadio} />
        ) : (
          <div className={classes.contentCheck}>
            <Icon className={classes.contentCheckIcon} children="check" />
          </div>
        )}
      </Zoom>
      <div style={{ flex: 1 }} />
    </div>
  );
};

export default Checkbox;
