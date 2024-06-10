import * as React from "react";
import { getTheme } from "../../theme";
import Text from "../Text";
import BtnBase from "../BtnBase";
import { createUseStyles } from "react-jss";
import hexToRgbA from "../../utils/hexToRgbA";
import Icon from "../Icon";
import classnames from "classnames";
import Avatar from "../Avatar";

interface IStyles {
  color: string;
  selected: boolean;
  enabled: boolean;
}
const useStyle = createUseStyles({
  chip: {
    cursor: ({ enabled }: IStyles) => (enabled ? "pointer" : "default"),
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    margin: 2,
    overflow: "hidden",
    border: `1px solid ${getTheme().colors.background}`,
    borderColor: ({ color, selected }: IStyles) =>
      selected ? color : getTheme().colors.grayBorder,
    color: ({ color }: IStyles) => color,
    backgroundColor: ({ color, selected }: IStyles) =>
      selected
        ? hexToRgbA(color, getTheme().colors.isDark ? 0.45 : 0.15)
        : getTheme().colors.background,
    borderRadius: 50,
    maxWidth: "-webkit-fill-available",
    padding: "1px 5px",
    verticalAlign: "middle",
  },
  chipContent: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    overflow: "hidden",
  },
  label: {
    color: getTheme().colors.typography,
    margin: "0 5px",
  },
  icon: {
    transition: "250ms all",
    fontSize: "0 !important",
  },
  iconOpen: {
    fontSize: "16px !important",
  },
});

export interface IChip {
  className?: string;
  style?: React.CSSProperties;
  selected?: boolean;
  color: string;
  id: string;
  icon?: string;
  iconRight?: string;
  label: string | JSX.Element;
  avatar?: string;
  avatarText?: string;
  avatarIcon?: string;
  tooltip?: string | string[];
  mandatory?: boolean;
  disabled?: boolean;
  onClick?: (id: string) => void;
}

const Chip = ({
  className,
  style,
  color,
  selected,
  id,
  icon,
  iconRight,
  avatar,
  avatarText,
  avatarIcon,
  label,
  tooltip,
  mandatory,
  disabled,
  onClick,
}: IChip) => {
  const enabled = !!onClick && !disabled;
  const classes = useStyle({ color, selected, enabled });
  const onChipClick = React.useCallback(
    (event) => {
      if (enabled) {
        event.preventDefault();
        event.stopPropagation();
        onClick(id);
      }
    },
    [id, onClick, enabled],
  );

  return (
    <BtnBase
      color={color}
      className={classnames({
        [classes.chip]: true,
        [className]: !!className,
      })}
      style={style}
      onClick={!enabled ? undefined : onChipClick}
      tooltip={tooltip}
    >
      <div className={classes.chipContent}>
        {!avatar && !avatarText && !avatarIcon ? null : (
          <Avatar
            size={15}
            src={avatar}
            text={avatarText}
            icon={avatarIcon}
            style={{ fontSize: 7 }}
          />
        )}
        <Icon
          children={icon}
          className={classnames({
            [classes.icon]: true,
            [classes.iconOpen]: !!icon,
          })}
        />
        <Text
          className={classes.label}
          children={label}
          ellipsis={true}
          tooltip={false}
        />
        {!mandatory ? null : (
          <Text
            style={{ color: "#f00", marginLeft: 2, lineHeight: 0 }}
            children="*"
          />
        )}
        {!iconRight ? null : (
          <Icon
            children={iconRight}
            className={classnames([classes.icon, classes.iconOpen])}
          />
        )}
      </div>
    </BtnBase>
  );
};

export default React.memo(Chip);
