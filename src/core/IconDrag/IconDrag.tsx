import * as React from "react";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
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

export interface IIconDrag extends React.HTMLAttributes<HTMLSpanElement> {
  open?: boolean;
}
const IconDrag = (props: IIconDrag) => {
  const { className, style, open = true } = props;
  const classes = useStyles({});
  if (!open) return null;
  return (
    <Icon
      {...props}
      children="drag_indicator"
      style={style}
      className={classnames({
        [classes.dragIcon]: true,
        [className]: !!className,
      })}
    />
  );
};

export default IconDrag;
