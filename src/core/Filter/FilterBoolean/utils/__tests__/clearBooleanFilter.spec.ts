import emptyFn from "../../../../../utils/emptyFn";
import { DefaultBooleanType } from "../../FilterBoolean";
import { clearBooleanFilter } from "../Functions";

const colorTheme = "#f00";

describe("clearBooleanFilter", () => {
  test("value is true", () => {
    const facetDirty = {
      id: "facetBoolean",
      label: "facetBoolean",
      type: DefaultBooleanType,
      colorTheme,
      onChange: emptyFn,
      value: true,
    };
    const facetClean = {
      id: "facetBoolean",
      label: "facetBoolean",
      type: DefaultBooleanType,
      colorTheme,
      onChange: emptyFn,
      value: undefined,
    };
    expect(clearBooleanFilter(facetDirty)).toEqual(facetClean);
  });

  test("value is false", () => {
    const facetDirty = {
      id: "facetBoolean",
      label: "facetBoolean",
      type: DefaultBooleanType,
      colorTheme,
      onChange: emptyFn,
      value: false,
    };
    const facetClean = {
      id: "facetBoolean",
      label: "facetBoolean",
      type: DefaultBooleanType,
      colorTheme,
      onChange: emptyFn,
      value: undefined,
    };
    expect(clearBooleanFilter(facetDirty)).toEqual(facetClean);
  });
  test("value is undefined", () => {
    const facetDirty = {
      id: "facetBoolean",
      label: "facetBoolean",
      type: DefaultBooleanType,
      colorTheme,
      onChange: emptyFn,
    };
    const facetClean = {
      id: "facetBoolean",
      label: "facetBoolean",
      type: DefaultBooleanType,
      colorTheme,
      onChange: emptyFn,
      value: undefined,
    };
    expect(clearBooleanFilter(facetDirty)).toEqual(facetClean);
  });
});
