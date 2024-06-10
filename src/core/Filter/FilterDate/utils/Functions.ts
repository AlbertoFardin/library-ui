import IFilterDate from "../IFilterDate";
import clearFilterValue from "../../utils/clearFilterValue";

export const isDateFiltered = (filter: IFilterDate) => {
  return isDateFilled(filter);
};

export const isDateFilled = (filter: IFilterDate) => {
  return !!filter.value?.startDate && !!filter.value?.endDate;
};

export const clearDateFilter = (filter: IFilterDate) => {
  return clearFilterValue(filter) as IFilterDate;
};
