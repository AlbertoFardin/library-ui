import * as React from "react";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import ITransitions from "./ITransitions";
import emptyFn from "../../utils/emptyFn";

interface IStyles {
  timeout: number;
}
const useStyles = createUseStyles({
  transition: {
    zIndex: 1,
    position: "absolute",
    width: "inherit",
    height: "inherit",
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    transition: ({ timeout }: IStyles) => `${timeout}ms transform linear`,
  },
  transitionTop: {
    transform: `translateY(100%)`,
  },
  transitionTopOpened: {
    transform: "translateY(0px)",
  },
  transitionBottom: {
    transform: `translateY(-100%)`,
  },
  transitionBottomOpened: {
    transform: "translateY(0px)",
  },
  transitionRight: {
    transform: `translateX(-100%)`,
  },
  transitionRightOpened: {
    transform: "translateX(0px)",
  },
  transitionLeft: {
    transform: `translateX(100%)`,
  },
  transitionLeftOpened: {
    transform: "translateX(0px)",
  },
});

const Slide = ({
  style,
  className,
  open,
  children,
  timeout = 250,
  onEnter = emptyFn,
  onEntered = emptyFn,
  onExit = emptyFn,
  onExited = emptyFn,
  direction = "right",
  unmountOnExit = true,
}: ITransitions) => {
  const classes = useStyles({ timeout });
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    if (open && !mounted) {
      onEnter();
      setMounted(true);
      setTimeout(() => {
        onEntered();
      }, timeout + 250);
    }
  }, [mounted, onEnter, onEntered, open, timeout]);

  React.useEffect(() => {
    if (!open && !!mounted) {
      onExit();
      setTimeout(() => {
        setMounted(false);
        onExited();
      }, timeout + 250);
    }
  }, [mounted, onExit, onExited, open, timeout]);

  return (
    <div
      style={style}
      className={classnames({
        [classes.transition]: true,
        [classes.transitionTop]: direction === "top",
        [classes.transitionTopOpened]: direction === "top" && open,
        [classes.transitionBottom]: direction === "bottom",
        [classes.transitionBottomOpened]: direction === "bottom" && open,
        [classes.transitionRight]: direction === "right",
        [classes.transitionRightOpened]: direction === "right" && open,
        [classes.transitionLeft]: direction === "left",
        [classes.transitionLeftOpened]: direction === "left" && open,
        [className]: !!className,
      })}
      children={!unmountOnExit || mounted ? children : undefined}
    />
  );
};

export default Slide;
