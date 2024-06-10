import emptyFn from "../../../../../utils/emptyFn";
import { DefaultSelectType } from "../../FilterSelect";
import { clearSelectFilter } from "../Functions";

const colorTheme = "#f00";

describe("clearSelectFilter", () => {
  test("value set", () => {
    const facetDirty = {
      id: "facetMultiselect",
      label: "facetMultiselect",
      type: DefaultSelectType,
      value: ["item1", "item2", "item3"],
      colorTheme,
      onChange: emptyFn,
    };
    const facetClean = {
      id: "facetMultiselect",
      label: "facetMultiselect",
      type: DefaultSelectType,
      value: undefined,
      colorTheme,
      onChange: emptyFn,
    };
    expect(clearSelectFilter(facetDirty)).toEqual(facetClean);
  });

  test("SELECTION", () => {
    const facetDirty = {
      id: "facetSelect",
      label: "facetSelect",
      type: "SELECTION",
      value: ["item1"],
      colorTheme,
      onChange: emptyFn,
    };
    const facetClean = {
      id: "facetSelect",
      label: "facetSelect",
      type: "SELECTION",
      value: undefined,
      colorTheme,
      onChange: emptyFn,
    };
    expect(clearSelectFilter(facetDirty)).toEqual(facetClean);
  });
  test("value undefined", () => {
    const facetDirty = {
      id: "facetMultiselect",
      label: "facetMultiselect",
      type: DefaultSelectType,
      colorTheme,
      onChange: emptyFn,
    };
    const facetClean = {
      id: "facetMultiselect",
      label: "facetMultiselect",
      type: DefaultSelectType,
      value: undefined,
      colorTheme,
      onChange: emptyFn,
    };
    expect(clearSelectFilter(facetDirty)).toEqual(facetClean);
  });
});
