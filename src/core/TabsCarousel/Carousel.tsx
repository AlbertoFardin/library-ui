import * as React from "react";
import { createUseStyles } from "react-jss";
import ReactResizeDetector from "react-resize-detector";
import classnames from "classnames";
import { ITabsCarouselItem } from "./interfaces";

const useStyles = createUseStyles({
  carousel: {
    position: "relative",
    height: "100%",
    overflow: "hidden",
    display: "flex",
    "flex-direction": "row",
    "align-items": "stretch",
    flex: 1,
  },
  carouselItem: {
    position: "relative",
    "overflow-x": "hidden",
    "overflow-y": "auto",
    display: "inline-flex",
    "flex-direction": "column",
    "align-items": "stretch",
  },
});

interface ICarousel {
  value: string;
  items: ITabsCarouselItem[];
}

const Carousel = ({ value, items }: ICarousel) => {
  const classes = useStyles({});
  const carouselRef = React.useRef(null);
  const [ready, setReady] = React.useState(false);
  const [width, setWidth] = React.useState(0);
  const slcItemIndex = items.findIndex(
    ({ id }: ITabsCarouselItem) => id === value,
  );
  const slcItemIndexRef = React.useRef(slcItemIndex);
  const carouselWidth = carouselRef.current
    ? carouselRef.current.offsetWidth
    : 0;

  React.useEffect(() => {
    setReady(true);
  }, []);

  React.useEffect(() => {
    setWidth(carouselWidth);
  }, [carouselWidth]);

  React.useEffect(() => {
    carouselRef.current.scrollTo({
      top: 0,
      left: slcItemIndex * width,
      behavior: slcItemIndexRef.current === slcItemIndex ? "auto" : "smooth",
    });
    slcItemIndexRef.current = slcItemIndex;
  }, [slcItemIndex, width]);

  return (
    <div ref={carouselRef} className={classes.carousel}>
      {!ready
        ? null
        : items.map((p: ITabsCarouselItem) => (
            <div
              key={p.id}
              className={classnames({
                [classes.carouselItem]: true,
                [p.className]: !!p.className,
              })}
              style={{
                ...p.style,
                minWidth: width,
                width,
              }}
              children={p.children}
            />
          ))}
      <ReactResizeDetector
        handleWidth
        handleHeight={false}
        skipOnMount
        onResize={setWidth}
      />
    </div>
  );
};

export default React.memo(Carousel);
