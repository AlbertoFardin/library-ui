import * as React from "react";
import { createUseStyles } from "react-jss";
import { Range, Direction, getTrackBackground } from "react-range";
import classnames from "classnames";
import emptyFn from "../../utils/emptyFn";
import Text from "../Text";
import { getTheme } from "../../theme";
import mixColors from "../../utils/mixColors";

interface IStyles {
  mainColor: string;
  backgroundColor: string;
}

type PercentageRange = [number, number];

const useStyles = createUseStyles({
  slideContainer: {
    display: "flex",
    justifyContent: "center",
    flex: 1,
    minWidth: 50,
    flexWrap: "wrap",
  },
  mark: {
    height: 2,
    width: 2,
    borderRadius: 1,
  },
  track: {
    height: 26,
    display: "flex",
    width: "100%",
    "&:focus": {
      outline: "0px",
    },
  },
  track2: {
    height: 2,
    width: "100%",
    borderRadius: 1,
    alignSelf: "center",
  },
  thumbLabel: {
    position: "absolute",
    top: "-30px",
    color: ({ mainColor }: IStyles) => mainColor,
    padding: 4,
    borderRadius: 3,
    backgroundColor: ({ backgroundColor }: IStyles) => backgroundColor,
    visibility: "hidden",
    transition: "box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  },
  thumb: {
    height: 26,
    width: 26,
    borderRadius: 13,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      backgroundColor: ({ backgroundColor }: IStyles) => backgroundColor,
    },
    "&:hover $thumbLabel": {
      visibility: "visible",
    },
    "&:focus": {
      outline: 0,
      backgroundColor: ({ backgroundColor }: IStyles) => backgroundColor,
    },
    "&:focus $thumbLabel": {
      visibility: "visible",
    },
  },
  thumb2: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: ({ mainColor }: IStyles) => mainColor,
  },
  thumb2Dragged: {
    backgroundColor: ({ mainColor }: IStyles) =>
      mixColors(0.2, mainColor, "#000"),
  },
});

const sortRange = (range: PercentageRange) => range.sort((a, b) => a - b);

const isValidRange = ({ range, step }) => {
  if (
    Array.isArray(range) &&
    range.length === 2 &&
    range[0] % step === 0 &&
    range[1] % step === 0
  ) {
    return true;
  } else {
    if (
      Array.isArray(range) &&
      range.length === 2 &&
      (range[0] % step === 0 || range[1] % step === 0)
    ) {
      console.log("Invalid range " + range + " because step is " + step);
    }
    return false;
  }
};

export const DefaultRange: PercentageRange = [0, 100];

const getValidRange = ({ range, step, defaultRange }) => {
  if (isValidRange({ range, step })) {
    return sortRange(range as PercentageRange);
  } else {
    return defaultRange;
  }
};

export interface ISliderPercentage {
  range: null | PercentageRange;
  defaultRange?: PercentageRange;
  className?: string;
  style?: React.CSSProperties;
  step?: number;
  color?: string;
  allowOverlap?: boolean;
  onChange?: (s: PercentageRange) => void;
  disabled?: boolean;
}
const SliderPercentage = ({
  range,
  defaultRange = DefaultRange,
  className,
  style,
  step = 10,
  onChange = emptyFn,
  color = getTheme().colors.theme1,
  allowOverlap = true,
  disabled,
}: ISliderPercentage) => {
  const min = 0;
  const max = 100;
  const direction = Direction.Right;
  const mainColor = disabled === true ? "#ccc" : color;
  const backgroundColor = mixColors(0.2, "#fff", mainColor);
  const classes = useStyles({ mainColor, backgroundColor });
  const [rangeTemp, setRangeTemp] = React.useState(
    getValidRange({ range, step, defaultRange }) as PercentageRange,
  );

  const cbChange = React.useCallback((values: PercentageRange) => {
    setRangeTemp(values);
  }, []);

  const cbChangeFinal = React.useCallback(
    (values: PercentageRange) => {
      onChange(sortRange(values));
    },
    [onChange],
  );

  const renderMark = React.useCallback(
    ({ props, index }) => {
      const range = sortRange(rangeTemp);
      return (
        <div
          {...props}
          className={classes.mark}
          style={{
            ...props.style,
            backgroundColor:
              index * step < range[0] || index * step > range[1]
                ? mainColor
                : backgroundColor,
          }}
        />
      );
    },
    [step, rangeTemp, classes, mainColor, backgroundColor],
  );
  const renderTrack = React.useCallback(
    ({ props, children /*, isDragged, disabled */ }) => {
      const trackBacground = getTrackBackground({
        values: rangeTemp,
        colors: [backgroundColor, mainColor, backgroundColor],
        min,
        max,
      });
      return (
        <div
          onMouseDown={props.onMouseDown}
          onTouchStart={props.onTouchStart}
          className={classes.track}
          style={{ ...props.style }}
          role="slider"
          tabIndex={0}
          aria-valuenow={100}
        >
          <div
            ref={props.ref}
            className={classes.track2}
            style={{ background: trackBacground }}
            children={children}
          />
        </div>
      );
    },
    [rangeTemp, classes, min, max, mainColor, backgroundColor],
  );
  const renderThumb = React.useCallback(
    ({ props, value, /* index, */ isDragged }) => {
      return (
        <div
          {...props}
          className={classes.thumb}
          style={{
            ...props.style,
          }}
        >
          <Text className={classes.thumbLabel} children={`${value}%`} />
          <div
            className={classnames({
              [classes.thumb2]: true,
              [classes.thumb2Dragged]: isDragged === true,
            })}
          />
        </div>
      );
    },
    [classes],
  );

  React.useMemo(() => {
    const validRange = getValidRange({ range, step, defaultRange });
    setRangeTemp(validRange);
  }, [range, step, defaultRange]);

  return (
    <div
      className={classnames({
        [classes.slideContainer]: true,
        [className]: !!className,
      })}
      style={style}
    >
      <Range
        values={rangeTemp}
        onChange={cbChange}
        onFinalChange={cbChangeFinal}
        min={min}
        max={max}
        step={step}
        allowOverlap={allowOverlap}
        renderMark={renderMark}
        renderTrack={renderTrack}
        renderThumb={renderThumb}
        direction={direction}
        disabled={disabled}
      />
    </div>
  );
};

export default SliderPercentage;
