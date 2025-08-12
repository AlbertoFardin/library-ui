import * as React from "react";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import { ISegmentedButton } from "./interfaces";
import { getTheme } from "../../theme";
import SegmentedButtonItem from "./SegmentedButtonItem";

const useStyles = createUseStyles({
  segmented: {
    display: "flex",
    backgroundColor: getTheme().colors.background,
    border: `1px solid ${getTheme().colors.grayBorder}`,
    borderRadius: getTheme().borderRadius,
    overflow: "hidden",
    boxSizing: "border-box",
    padding: 3,
  },
});

const SegmentedButton = ({
  className,
  style,
  color = getTheme().colors.theme1,
  value,
  options,
  onChange,
}: ISegmentedButton) => {
  const classes = useStyles({});

  if (options.length < 2) return null;

  return (
    <div
      style={style}
      className={classnames({
        [classes.segmented]: true,
        [className]: !!className,
      })}
    >
      {options.map((o, i) => (
        <React.Fragment key={i}>
          {i === 0 ? null : <div style={{ width: 3 }} />}
          <SegmentedButtonItem
            {...o}
            color={color}
            selected={o.id === value}
            onClick={onChange}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default SegmentedButton;
