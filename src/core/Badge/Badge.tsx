import * as React from "react";
import BtnBase from "../BtnBase";
import Icon from "../Icon";
import mixColors from "../../utils/mixColors";
import BadgeLabel from "./BadgeLabel";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import Avatar from "../Avatar";
import { getTheme } from "../../theme";

const SIZE = 24;

interface IStyles {
  color: string;
  label: string;
  isButton: boolean;
}
const useStyles = createUseStyles({
  badge: {
    display: "inline-flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    color: ({ color }: IStyles) => color,
    border: ({ color }: IStyles) => `1px solid ${color}`,
    borderRadius: SIZE,
    height: SIZE,
    maxHeight: SIZE,
    minWidth: SIZE,
    boxSizing: "border-box",
    overflow: "hidden",
    padding: ({ label }: IStyles) => (!!label ? "0 4px" : 0),
    cursor: ({ isButton }: IStyles) => (isButton ? "pointer" : "default"),
    backgroundColor: getTheme().colors.background,
    "&:hover": {
      backgroundColor: ({ isButton, color }: IStyles) =>
        isButton
          ? mixColors(0.75, color, getTheme().colors.background)
          : getTheme().colors.background,
    },
  },
});

export interface IBadge {
  className?: string;
  style?: React.CSSProperties;
  tooltip?: string | string[] | JSX.Element;
  color: string;
  onClick?: (
    event: React.MouseEvent,
    ref: React.MutableRefObject<HTMLDivElement>,
  ) => void;
  avatar?: string;
  avatarText?: string;
  avatarIcon?: string;
  avatarStyle?: React.CSSProperties;
  avatarClassName?: string;
  icon?: string;
  iconStyle?: React.CSSProperties;
  iconClassName?: string;
  label?: string;
  labelStyle?: React.CSSProperties;
  labelClassName?: string;
  labelRequired?: boolean;
  labelPosition?: "left" | "right";
}

const Badge = ({
  className,
  style,
  tooltip,
  color,
  onClick,
  avatar,
  avatarText,
  avatarIcon,
  avatarStyle,
  avatarClassName,
  icon,
  iconStyle,
  iconClassName,
  label,
  labelStyle,
  labelClassName,
  labelRequired,
  labelPosition = "right",
}: IBadge) => {
  const isButton = !!onClick;
  const classes = useStyles({
    color,
    label,
    isButton,
  });

  const ref = React.useRef(null);
  const onClickCb = React.useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (!!onClick) onClick(event, ref.current);
    },
    [ref, onClick],
  );
  const labelCmp = (
    <BadgeLabel
      label={label}
      labelRequired={labelRequired}
      style={{ margin: !!icon ? "0 3px" : 0, ...labelStyle }}
      className={labelClassName}
    />
  );

  return (
    <BtnBase
      ref={ref}
      className={classnames([classes.badge, className])}
      style={style}
      onClick={isButton ? onClickCb : undefined}
      tooltip={tooltip}
      color={color}
    >
      {labelPosition === "right" ? null : labelCmp}
      {!avatar && !avatarText && !avatarIcon ? null : (
        <Avatar
          className={avatarClassName}
          style={avatarStyle}
          size={SIZE - 4}
          src={avatar}
          text={avatarText}
          icon={avatarIcon}
        />
      )}
      {!icon ? null : (
        <Icon
          className={iconClassName}
          style={{ fontSize: 14, color, ...iconStyle }}
          children={icon}
        />
      )}
      {labelPosition === "left" ? null : labelCmp}
    </BtnBase>
  );
};

export default Badge;
