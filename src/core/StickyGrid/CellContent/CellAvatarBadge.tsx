import BtnBase from "../../BtnBase";
import { createUseStyles } from "react-jss";
import Text from "../../Text";
import { Zoom } from "../../Transitions";
import * as React from "react";
import classnames from "classnames";
import { getTheme } from "../../../theme";

const BadgeSize = 18;
const useStyles = createUseStyles({
  badge: {
    position: "absolute",
    top: "-8px",
    right: "-8px",
    zIndex: 0,
    width: "fit-content",
    margin: "auto",
  },
  buttonbase: {
    height: BadgeSize,
    minHeight: BadgeSize,
    maxHeight: BadgeSize,
    minWidth: BadgeSize,
    borderRadius: 20,
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, .14)",
    padding: "0 6px",
    backgroundColor: getTheme().colors.theme1,
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  label: {
    color: "#ffffff",
    textAlign: "center",
  },
});

interface ICellAvatarBadge {
  className?: string;
  children: string | JSX.Element;
  open?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  style?: React.CSSProperties;
  tooltip?: string | string[];
}

const CellAvatarBadge = ({
  className,
  children,
  open = true,
  onClick,
  style,
  tooltip,
}: ICellAvatarBadge) => {
  const classes = useStyles({});
  return (
    <div
      className={classnames({
        [classes.badge]: true,
        [className]: !!className,
      })}
      style={style}
    >
      <Zoom open={open && !!children}>
        <BtnBase
          className={classes.buttonbase}
          onClick={onClick}
          tooltip={open && tooltip}
        >
          <Text children={children} size={0} className={classes.label} />
        </BtnBase>
      </Zoom>
    </div>
  );
};

export default CellAvatarBadge;
