import * as React from "react";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import Placeholder from "../Placeholder";
import Icon from "../Icon";

const SLIDER_COLOR = "rgba(255, 255, 255, 0.7)";
const SLIDER_WIDTH = 4;

interface IStyles {
  width: number;
  height: number | string;
  backgroundColor: string;
}
const useStyle = createUseStyles({
  compare: {
    width: (s: IStyles) => s.width,
    height: (s: IStyles) => s.height,
    backgroundColor: (s: IStyles) => s.backgroundColor,
    position: "relative",
    overflow: "hidden",
  },
  compareNode: {
    width: (s: IStyles) => s.width,
    height: (s: IStyles) => s.height,
    display: "block",
    position: "absolute",
    top: 0,
    left: 0,
    userSelect: "none",
    "& > *": {
      width: "inherit",
      height: "inherit",
    },
  },
  compareOverlay: {
    backgroundColor: (s: IStyles) => s.backgroundColor,
    position: "absolute",
    width: "50%",
    top: 0,
    left: 0,
    height: "100%",
    overflow: "hidden",
    zIndex: 1,
  },
  slider: {
    backgroundColor: SLIDER_COLOR,
    position: "absolute",
    top: 0,
    left: "50%",
    width: 4,
    height: "100%",
    cursor: "ew-resize",
    zIndex: 10,
  },
  sliderCursor: {
    backgroundColor: SLIDER_COLOR,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 14,
    height: 20,
  },
  sliderCursorIcon: {
    fontSize: 14,
  },
  cursorLeft: {
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
    right: SLIDER_WIDTH,
    paddingLeft: SLIDER_WIDTH,
  },
  cursorRight: {
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    left: SLIDER_WIDTH,
    paddingRight: SLIDER_WIDTH,
  },
});

export interface IImageCompare {
  className?: string;
  style?: React.CSSProperties;
  width: number;
  height: number;
  backgroundColor?: string;
  element1: JSX.Element | React.ReactNode;
  element2: JSX.Element | React.ReactNode;
  placeholder?: string;
}

const ImageCompare = ({
  className,
  style,
  width,
  height,
  backgroundColor = "transparent",
  element1,
  element2,
  placeholder = "Some elements are undefined",
}: IImageCompare) => {
  const classes = useStyle({ width, height, backgroundColor });
  const [sliderPosition, setSliderPosition] = React.useState(50);
  const containerRef = React.useRef(null);
  const handleMouseMove = React.useCallback((e) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    let pos = ((e.clientX - rect.left) / rect.width) * 100;

    // Limita la posizione
    if (pos < 0) pos = 0;
    if (pos > 100) pos = 99;

    setSliderPosition(pos);
  }, []);
  const handleMouseUp = React.useCallback(() => {
    document.onmousemove = null;
    document.onmouseup = null;
  }, []);
  const handleMouseDown = React.useCallback(() => {
    document.onmousemove = handleMouseMove;
    document.onmouseup = handleMouseUp;
  }, [handleMouseMove, handleMouseUp]);
  const showPlaceholder = !element1 || !element2;

  return (
    <div
      ref={containerRef}
      style={style}
      className={classnames({
        [classes.compare]: true,
        [className]: !!className,
      })}
    >
      {showPlaceholder ? (
        <Placeholder label={placeholder} />
      ) : (
        <>
          <div
            className={classes.compareOverlay}
            style={{ width: `${sliderPosition}%` }}
          >
            <div className={classes.compareNode} children={element1} />
          </div>
          <div className={classes.compareNode} children={element2} />
          <div
            role="presentation"
            className={classes.slider}
            style={{ left: `${sliderPosition}%` }}
            onMouseDown={handleMouseDown}
          >
            <div
              className={classnames([classes.sliderCursor, classes.cursorLeft])}
            >
              <Icon
                className={classes.sliderCursorIcon}
                children="chevron_left"
              />
            </div>
            <div
              className={classnames([
                classes.sliderCursor,
                classes.cursorRight,
              ])}
            >
              <Icon
                className={classes.sliderCursorIcon}
                children="chevron_right"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCompare;
