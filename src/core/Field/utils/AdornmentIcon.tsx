import * as React from "react";
import { createUseStyles } from "react-jss";
import Btn from "../../Btn";
import { IAdornmentIcon } from "./fieldInterfaces";

const useStyles = createUseStyles({
  adornmentIcon: {
    margin: "0px !important",
  },
});

const AdornmentIcon = ({
  adornmentIcon,
  adornmentIconTooltip,
  adornmentIconColor,
}: IAdornmentIcon) => {
  const classes = useStyles();
  if (!adornmentIcon) return null;
  return (
    <Btn
      className={classes.adornmentIcon}
      icon={adornmentIcon}
      iconStyle={{ color: adornmentIconColor }}
      tooltip={adornmentIconTooltip}
    />
  );
};

export default React.memo(AdornmentIcon);
