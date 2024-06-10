import IFilterPercentage from "../IFilterPercentage";
import { DefaultRange } from "../../../SliderPercentage/SliderPercentage";
import clearFilterValue from "../../utils/clearFilterValue";

export const isPercentageFiltered = (filter: IFilterPercentage) => {
  if (!filter.value) return false;
  return (
    filter.value[0] !== DefaultRange[0] || filter.value[1] !== DefaultRange[1]
  );
};

export const clearPercentageFilter = (filter: IFilterPercentage) => {
  return clearFilterValue(filter) as IFilterPercentage;
};
