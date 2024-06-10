import emptyFn from "../../../../../utils/emptyFn";
import { DefaultDateType } from "../../FilterDate";
import { clearDateFilter } from "../Functions";

const colorTheme = "#f00";

describe("clearDateFilter", () => {
  test("value full", () => {
    const facetDirty = {
      id: "facetDatepicker",
      label: "facetDatepicker",
      type: DefaultDateType,
      colorTheme,
      onChange: emptyFn,
      dateFormat: "DD/MM/YYYY",
      value: {
        startDate: 1585662109606,
        endDate: 1585662109606,
      },
    };
    const facetClean = {
      id: "facetDatepicker",
      label: "facetDatepicker",
      type: DefaultDateType,
      colorTheme,
      onChange: emptyFn,
      dateFormat: "DD/MM/YYYY",
      value: undefined,
    };
    expect(clearDateFilter(facetDirty)).toEqual(facetClean);
  });
  test("value only start date", () => {
    const facetDirty = {
      id: "facetDatepicker",
      label: "facetDatepicker",
      type: DefaultDateType,
      colorTheme,
      onChange: emptyFn,
      dateFormat: "DD/MM/YYYY",
      value: {
        startDate: 1585662109606,
      },
    };
    const facetClean = {
      id: "facetDatepicker",
      label: "facetDatepicker",
      type: DefaultDateType,
      colorTheme,
      onChange: emptyFn,
      dateFormat: "DD/MM/YYYY",
      value: undefined,
    };
    expect(clearDateFilter(facetDirty)).toEqual(facetClean);
  });
  test("value only end date", () => {
    const facetDirty = {
      id: "facetDatepicker",
      label: "facetDatepicker",
      type: DefaultDateType,
      colorTheme,
      onChange: emptyFn,
      dateFormat: "DD/MM/YYYY",
      value: {
        endDate: 1585662109606,
      },
    };
    const facetClean = {
      id: "facetDatepicker",
      label: "facetDatepicker",
      type: DefaultDateType,
      colorTheme,
      onChange: emptyFn,
      dateFormat: "DD/MM/YYYY",
      value: undefined,
    };
    expect(clearDateFilter(facetDirty)).toEqual(facetClean);
  });

  test("value undefined", () => {
    const facetDirty = {
      id: "facetDatepicker",
      label: "facetDatepicker",
      type: DefaultDateType,
      colorTheme,
      onChange: emptyFn,
      dateFormat: "DD/MM/YYYY",
    };
    const facetClean = {
      id: "facetDatepicker",
      label: "facetDatepicker",
      type: DefaultDateType,
      colorTheme,
      onChange: emptyFn,
      dateFormat: "DD/MM/YYYY",
      value: undefined,
    };
    expect(clearDateFilter(facetDirty)).toEqual(facetClean);
  });
});
