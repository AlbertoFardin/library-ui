import { IFilterBase, IChangesBase } from "../interfaces";

/** type of value of date filter */
export type FilterDateValue = {
  startDate?: null | number;
  endDate?: null | number;
};

export interface IChangesDate extends IChangesBase<FilterDateValue> {}

interface IFilterDate extends IFilterBase<FilterDateValue, IChangesDate> {
  /** date format passed to [moment.format()](https://momentjs.com/docs/#/displaying/format/) */
  dateFormat: string;
  /** Dropdown from year */
  fromYear?: number;
  /** Dropdown to year */
  toYear?: number;
}

export default IFilterDate;
