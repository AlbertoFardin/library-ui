import * as React from "react";
import ITransitions from "./ITransitions";
import emptyFn from "../../utils/emptyFn";

const Collapse = ({
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
  const refContainer = React.useRef<HTMLDivElement>(null);
  const refIsRender = React.useRef<boolean>(false);
  const refIsOpened = React.useRef<boolean>(false);
  const [dynamicChildren, setDynamicChildren] = React.useState<boolean>(false);
  const [containerHeight, setContainerHeight] = React.useState<number>(null);

  React.useEffect(() => {
    (async () => {
      if (!!refContainer.current) {
        const call = !!refIsRender.current
          ? open !== refIsOpened.current
          : false;
        refIsOpened.current = open;
        refIsRender.current = true;
        if (open) {
          if (call) onEnter();
          setDynamicChildren(true);
          await new Promise((resolve) => setTimeout(resolve, timeout));
          setContainerHeight(refContainer?.current?.scrollHeight || 0);
          if (call) onEntered();
          await new Promise((resolve) => setTimeout(resolve, timeout));
          setContainerHeight(null);
        } else {
          setContainerHeight(refContainer?.current?.scrollHeight || 0);
          if (call) onExit();
          await new Promise((resolve) => setTimeout(resolve, timeout));
          setContainerHeight(0);
          if (call) onExited();
          await new Promise((resolve) => setTimeout(resolve, timeout));
          setDynamicChildren(false);
        }
      }
    })();
  }, [onEnter, onEntered, onExit, onExited, open, timeout]);

  return (
    <div
      ref={refContainer}
      style={{
        overflow: containerHeight === null ? "visible" : "hidden",
        height: containerHeight === null ? "auto" : containerHeight,
        transition: `height ${timeout}ms ease-out`,
        minHeight: 0,
        boxSizing: "inherit",
        ...style,
      }}
      className={className}
      children={!unmountOnExit || dynamicChildren ? children : undefined}
    />
  );
};
export default Collapse;
