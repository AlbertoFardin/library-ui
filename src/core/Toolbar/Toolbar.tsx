import * as React from "react";
import classnames from "classnames";
import { createUseStyles } from "react-jss";
import BtnBase from "../BtnBase";

const useStyles = createUseStyles({
  toolbar: {
    position: "relative",
    display: "flex",
    "flex-direction": "row",
    "align-items": "center",
    width: "-webkit-fill-available",
    height: 50,
    "min-height": 50,
    padding: "0 15px",
  },
});

export interface IToolbar {
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  children?: JSX.Element | React.ReactNode;
}

const Toolbar = React.forwardRef(
  (props: IToolbar, ref: React.Ref<HTMLDivElement>) => {
    const classes = useStyles();
    return (
      <BtnBase
        ref={ref}
        {...props}
        className={classnames({
          [classes.toolbar]: true,
          [props.className]: !!props.className,
        })}
      />
    );
  },
);

Toolbar.displayName = "Toolbar";
export default Toolbar;
