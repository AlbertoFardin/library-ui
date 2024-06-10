import * as React from "react";
import { createUseStyles } from "react-jss";
import Icon from "../Icon";

const useStyles = createUseStyles({
  dragIcon: {
    borderRadius: 5,
    height: 30,
    width: 20,
    display: "flex !important",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 0,
    fontSize: "18px !important",
  },
});

export interface IIconDrag {
  open?: boolean;
}
const IconDrag = ({ open = true }: IIconDrag) => {
  const classes = useStyles({});
  if (!open) return null;
  return <Icon children="drag_indicator" className={classes.dragIcon} />;
};

export default IconDrag;
