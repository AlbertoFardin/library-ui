import * as React from "react";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import isEmpty from "lodash-es/isEmpty";
import { getTheme } from "../../theme";
import Zoom from "../Transitions/Zoom";
import Icon from "../Icon";
import Tooltip from "../Tooltip";
import hexToRgbA from "../../utils/hexToRgbA";

const useStyles = createUseStyles({
  help: {
    borderRadius: 20,
    padding: 5,
    margin: "0 5px",
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: hexToRgbA(getTheme().colors.theme1, 0.15),
    },
    "&:hover *": {
      color: getTheme().colors.theme1 + " !important",
    },
  },
  helpIcon: {
    fontSize: "16px !important",
    display: "flex !important",
    color: getTheme().colors.disable,
  },
});

export interface IIconHelp {
  style?: React.CSSProperties;
  className?: string;
  open?: boolean;
  tooltip: string | string[];
}

const IconHelp = ({ style, className, open = true, tooltip }: IIconHelp) => {
  const classes = useStyles({});
  if (isEmpty(tooltip)) return null;
  return (
    <Zoom open={open}>
      <Tooltip title={tooltip}>
        <div
          className={classnames({
            [classes.help]: true,
            [className]: !!className,
          })}
          style={style}
        >
          <Icon className={classes.helpIcon} children="info_outline" />
        </div>
      </Tooltip>
    </Zoom>
  );
};

export default IconHelp;
