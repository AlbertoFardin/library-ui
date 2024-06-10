import emptyFn from "../../../../../utils/emptyFn";
import { DefaultDateType } from "../../FilterDate";
import { isDateFilled } from "../Functions";

const colorTheme = "#f00";

describe("isDateFilled", () => {
  test("value full", () => {
    const facetFilled = {
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
    expect(isDateFilled(facetFilled)).toEqual(true);
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
    expect(isDateFilled(facetDirty)).toEqual(false);
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
    expect(isDateFilled(facetDirty)).toEqual(false);
  });

  test("value with null in both date", () => {
    const facetDirty = {
      id: "facetDatepicker",
      label: "facetDatepicker",
      type: DefaultDateType,
      colorTheme,
      onChange: emptyFn,
      dateFormat: "DD/MM/YYYY",
      value: {
        startDate: null,
        endDate: null,
      },
    };
    expect(isDateFilled(facetDirty)).toEqual(false);
  });

  test("value with both date undefined", () => {
    const facetDirty = {
      id: "facetDatepicker",
      label: "facetDatepicker",
      type: DefaultDateType,
      colorTheme,
      onChange: emptyFn,
      dateFormat: "DD/MM/YYYY",
      value: {},
    };
    expect(isDateFilled(facetDirty)).toEqual(false);
  });

  test("value null", () => {
    const facetDirty = {
      id: "facetDatepicker",
      label: "facetDatepicker",
      type: DefaultDateType,
      colorTheme,
      onChange: emptyFn,
      dateFormat: "DD/MM/YYYY",
      value: null,
    };

    expect(isDateFilled(facetDirty)).toEqual(false);
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
    expect(isDateFilled(facetDirty)).toEqual(false);
  });
});
