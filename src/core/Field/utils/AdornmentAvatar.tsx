import * as React from "react";
import { createUseStyles } from "react-jss";
import Btn from "../../Btn";
import { IAdornmentAvatar } from "./fieldInterfaces";

const useStyles = createUseStyles({
  adornmentAvatar: {
    margin: "0px !important",
  },
});

const AdornmentAvatar = ({
  adornmentAvatar,
  adornmentAvatarText,
  adornmentAvatarIcon,
  adornmentAvatarTooltip,
}: IAdornmentAvatar) => {
  const classes = useStyles();
  if (!adornmentAvatar) return null;
  return (
    <Btn
      className={classes.adornmentAvatar}
      avatar={adornmentAvatar}
      avatarText={adornmentAvatarText}
      avatarIcon={adornmentAvatarIcon}
      tooltip={adornmentAvatarTooltip}
    />
  );
};
export default React.memo(AdornmentAvatar);
