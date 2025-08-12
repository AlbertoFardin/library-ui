import * as React from "react";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import BtnBase from "../BtnBase";
import getStatus from "./getStatus";
import { getTheme } from "../../theme";
import mixColors from "../../utils/mixColors";

const SIZE_BUTTON = 30;
const SIZE_BADGE = 24;
const ICON_BUTTON = 21;
const ICON_BADGE = 19;
const getSize = (s: number): React.CSSProperties => ({
  height: s,
  maxHeight: s,
  minHeight: s,
  width: s,
  maxWidth: s,
  minWidth: s,
});

interface IStyles {
  color: string;
}
const useStyles = createUseStyles({
  sharepage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      backgroundColor: ({ color }: IStyles) =>
        mixColors(
          getTheme().colors.isDark ? 0.4 : 0.2,
          getTheme().colors.background,
          color,
        ),
    },
  },
  sharepageButton: {
    ...getSize(SIZE_BUTTON),
    margin: "0 2px",
    borderRadius: getTheme().borderRadius,
    backgroundColor: "transparent",
  },
  sharepageBadge: {
    ...getSize(SIZE_BADGE),
    borderRadius: 200,
    backgroundColor: getTheme().colors.background,
    boxSizing: "border-box",
    border: ({ color }: IStyles) => `1px solid ${color}`,
  },
  iconButton: {
    ...getSize(ICON_BUTTON),
  },
  iconBadge: {
    ...getSize(ICON_BADGE),
  },
});

export interface IBtnSharepage {
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  layout?: "button" | "badge";
  onClick: (event: React.MouseEvent) => void;
  active?: boolean;
  dateStart?: number;
  dateUntil?: number;
  security?: boolean;
}
const BtnSharepage = ({
  color = getTheme().colors.theme1,
  className,
  style,
  onClick,
  layout = "button",
  active = true,
  dateStart,
  dateUntil,
  security,
}: IBtnSharepage) => {
  const classes = useStyles({ color });
  const { icon, tooltip } = getStatus({
    dateStart,
    dateUntil,
    security,
  });
  const cbOnClick = React.useCallback(
    (event) => {
      event.persist();
      onClick(event);
    },
    [onClick],
  );

  if (active === false) return null;

  return (
    <BtnBase
      style={style}
      className={classnames({
        [classes.sharepage]: true,
        [classes.sharepageButton]: layout === "button",
        [classes.sharepageBadge]: layout === "badge",
        [className]: !!className,
      })}
      onClick={cbOnClick}
      tooltip={tooltip}
      color={color}
    >
      <img
        className={classnames({
          [classes.iconButton]: layout === "button",
          [classes.iconBadge]: layout === "badge",
        })}
        src={icon}
        alt=""
      />
    </BtnBase>
  );
};

export default BtnSharepage;
