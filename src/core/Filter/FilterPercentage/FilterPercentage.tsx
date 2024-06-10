import * as React from "react";
import { getTheme } from "../../../theme";
import FilterWrapper from "../utils/FilterWrapper";
import { FilterType } from "../interfaces";
import IFilterPercentage, { PercentageRange } from "./IFilterPercentage";
import emptyFn from "../../../utils/emptyFn";
import { createUseStyles } from "react-jss";
import SliderPercentage from "../../SliderPercentage";

const useStyles = createUseStyles({
  list: {
    borderRadius: getTheme().borderRadius,
    border: `1px solid ${getTheme().colors.grayBorder}`,
    padding: "0 20px",
    height: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: getTheme().colors.background,
  },
});

export const DefaultPercentageType: FilterType = "PERCENTAGE";

const prepareBadge = (value: number[]): number => {
  if (!value || !value.length) return 0;
  const isClear = value[0] === 0 && value[1] === 100;
  return isClear ? 0 : 1;
};

/**
 * **FilterPercentage** è una faccetta che gestisce un range tra 0 e 100.
 */
const FilterPercentage = ({
  id,
  type = DefaultPercentageType,
  value,
  step = 10,
  color = getTheme().colors.theme1,
  className,
  collapsed,
  collapsedHelp,
  collapsedHide,
  label,
  labelSub,
  onChange = emptyFn,
  onClickCount,
  style,
  mandatory,
}: IFilterPercentage) => {
  const classes = useStyles({});
  const onChangeDragging = React.useCallback(
    (value: PercentageRange) => {
      onChange({ id, type, value });
    },
    [id, type, onChange],
  );

  return (
    <FilterWrapper
      color={color}
      count={prepareBadge(value)}
      label={label}
      labelSub={labelSub}
      collapsedHide={collapsedHide}
      className={className}
      style={style}
      collapsed={collapsed}
      collapsedHelp={collapsedHelp}
      onClickCount={onClickCount}
      mandatory={mandatory}
    >
      <div className={classes.list}>
        <SliderPercentage
          step={step}
          range={value}
          color={color}
          onChange={onChangeDragging}
        />
      </div>
    </FilterWrapper>
  );
};

export default FilterPercentage;
