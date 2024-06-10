import * as React from "react";
import { FilterType } from "../interfaces";
import FilterWrapper from "../utils/FilterWrapper";
import PopoverDatePicker from "./PopoverDatePicker";
import IFilterDate, { FilterDateValue } from "./IFilterDate";
import emptyFn from "../../../utils/emptyFn";
import { getTheme } from "../../../theme";

const valueDefault: FilterDateValue = {
  startDate: null,
  endDate: null,
};

export const DefaultDateType: FilterType = "DATEPICKER";

const toDateWithoutHours = (i: number) => {
  if (!!i) {
    const date = new Date(i);
    date.setHours(0, 0, 0, 0);
    return date;
  }
  return null;
};

const dateConversion = (from: Date, to: Date) => {
  if (!from) return null;
  const startDate = from.getTime();
  const endDate = (!to ? startDate : to.getTime()) + (24 * 60 * 60 * 1000 - 1);
  return { startDate, endDate };
};

const FilterDate = ({
  id,
  type = DefaultDateType,
  value: valueInit = valueDefault,
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
  dateFormat,
  mandatory,
  fromYear = 2000,
  toYear = 2100,
}: IFilterDate) => {
  const value = {
    ...valueDefault,
    ...valueInit,
  };

  const onCbChange = React.useCallback(
    (from: Date, to: Date) => {
      const value = dateConversion(from, to);
      onChange({
        id,
        type,
        value,
      });
    },
    [id, type, onChange],
  );
  const { startDate, endDate } = value;
  const valueFrom = toDateWithoutHours(startDate);
  const valueTo = toDateWithoutHours(endDate);
  return (
    <FilterWrapper
      color={color}
      count={startDate ? 1 : 0}
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
      <PopoverDatePicker
        color={color}
        collapsed={collapsed}
        valueFrom={valueFrom}
        valueTo={valueTo}
        onChange={onCbChange}
        dateFormat={dateFormat}
        fromYear={fromYear}
        toYear={toYear}
      />
    </FilterWrapper>
  );
};

export default FilterDate;
