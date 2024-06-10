import * as React from "react";
import { createUseStyles } from "react-jss";
import { SelectViewType } from "./utils";
import classnames from "classnames";
import { getTheme } from "../../theme";
import SelectViewBtn from "./SelectViewBtn";

const useStyles = createUseStyles({
  slcAreaLayout: {
    display: "flex",
    "background-color": getTheme().colors.background,
    border: `1px solid ${getTheme().colors.grayBorder}`,
    "border-radius": getTheme().borderRadius,
    overflow: "hidden",
    "box-sizing": "border-box",
    padding: 3,
  },
});

export interface ISelectView {
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  value: SelectViewType;
  options: SelectViewType[];
  onChange: (slc: SelectViewType) => void;
}
const SelectView = ({
  className,
  style,
  color = getTheme().colors.theme1,
  value,
  options,
  onChange,
}: ISelectView) => {
  const classes = useStyles({});

  if (options.length < 2) return null;

  return (
    <div
      style={style}
      className={classnames({
        [classes.slcAreaLayout]: true,
        [className]: !!className,
      })}
    >
      {options.map((o, i) => (
        <React.Fragment key={i}>
          {i === 0 ? null : <div style={{ width: 3 }} />}
          <SelectViewBtn
            id={o}
            color={color}
            selected={o === value}
            onClick={onChange}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default SelectView;
