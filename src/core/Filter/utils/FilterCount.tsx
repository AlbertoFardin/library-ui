import * as React from "react";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import Text from "../../Text";
import Tooltip from "../../Tooltip";
import mixColors from "../../../utils/mixColors";
import { getTheme } from "../../../theme";

interface IStyles {
  color: string;
}
const useStyles = createUseStyles({
  count: {
    cursor: "pointer",
    transition: "all 250ms",
    border: "1px solid #fff",
    borderRadius: 20,
    textAlign: "center",
    minWidth: "fit-content",
    padding: "0 6px",
    height: 20,
    boxSizing: "border-box",
    transform: "scale(1)",
    backgroundcolor: ({ color }: IStyles) => mixColors(0.2, "#fff", color),
    "&:hover": {
      borderColor: ({ color }: IStyles) => color,
    },
  },
  countActive: {
    backgroundColor: ({ color }: IStyles) => color,
    "& $countLabel": {
      color: "#fff",
    },
  },
  countClose: {
    transform: "scale(0) !important",
  },
  countLabel: {
    transition: "all 250ms",
    color: ({ color }: IStyles) => color,
  },
});

export interface IFilterCount {
  className?: string;
  style?: React.CSSProperties;
  cmpRef?;
  color: string;
  open?: boolean;
  selected?: boolean;
  label: number;
  onClick: (event: React.MouseEvent) => void;
  tooltip?: string | string[];
}

const FilterCount = ({
  className,
  style,
  cmpRef,
  color = getTheme().colors.theme1,
  selected,
  open = true,
  label,
  onClick,
  tooltip,
}: IFilterCount) => {
  const classes = useStyles({ color });
  const onBtnClick = React.useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      onClick(event);
    },
    [onClick],
  );

  return (
    <Tooltip title={tooltip}>
      <div
        role="presentation"
        ref={cmpRef}
        className={classnames({
          [classes.count]: true,
          [classes.countActive]: selected,
          [classes.countClose]: !open,
          [className]: !!className,
        })}
        style={style}
        onClick={onBtnClick}
      >
        <Text className={classes.countLabel} children={String(label)} />
      </div>
    </Tooltip>
  );
};

export default FilterCount;
