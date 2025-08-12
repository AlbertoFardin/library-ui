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
    width: "fit-content",
    height: "fit-content",
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    transition: ({ timeout }: IStyles) => `${timeout}ms transform`,
    transform: "scale(0)",
  },
  transitionOpened: {
    transform: "scale(1)",
  },
});

const Zoom = ({
  style,
  className,
  open,
  children,
  timeout = 250,
  onEnter = emptyFn,
  onEntered = emptyFn,
  onExit = emptyFn,
  onExited = emptyFn,
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
      }, timeout);
    }
  }, [mounted, onEnter, onEntered, open, timeout]);

  React.useEffect(() => {
    if (!open && !!mounted) {
      onExit();
      setTimeout(() => {
        setMounted(false);
        onExited();
      }, timeout);
    }
  }, [mounted, onExit, onExited, open, timeout]);

  return (
    <div
      style={style}
      className={classnames({
        [classes.transition]: true,
        [classes.transitionOpened]: open,
        [className]: !!className,
      })}
      children={!unmountOnExit || mounted ? children : undefined}
    />
  );
};

export default Zoom;
