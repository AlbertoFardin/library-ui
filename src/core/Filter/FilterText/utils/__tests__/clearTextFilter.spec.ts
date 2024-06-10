import emptyFn from "../../../../../utils/emptyFn";
import { DefaultTextType } from "../../FilterText";
import { clearTextFilter } from "../Functions";

const colorTheme = "#f00";

describe("clearFilters", () => {
  test("FACETTEXTAREA", () => {
    const facetDirty = {
      id: "facetTextarea",
      label: "facetTextarea",
      type: DefaultTextType,
      colorTheme,
      onChange: emptyFn,
      cartridgeSplit: false,
      value: "__tests__",
    };
    const facetClean = {
      id: "facetTextarea",
      label: "facetTextarea",
      type: DefaultTextType,
      colorTheme,
      onChange: emptyFn,
      cartridgeSplit: false,
      value: undefined,
    };
    expect(facetClean).toEqual(clearTextFilter(facetDirty));
  });

  test("FACETTEXTAREA cartridgeSplit", () => {
    const facetDirty = {
      id: "facetTextarea",
      label: "facetTextarea",
      type: DefaultTextType,
      colorTheme,
      onChange: emptyFn,
      cartridgeSplit: true,
      value: ["t1", "t2", "t3"],
    };
    const facetClean = {
      id: "facetTextarea",
      label: "facetTextarea",
      type: DefaultTextType,
      colorTheme,
      onChange: emptyFn,
      cartridgeSplit: true,
      value: undefined,
    };
    expect(facetClean).toEqual(clearTextFilter(facetDirty));
  });

  test("FACETTEXTAREA switchNoValue", () => {
    const facetDirty = {
      id: "facetTextarea",
      label: "facetTextarea",
      type: DefaultTextType,
      colorTheme,
      onChange: emptyFn,
      cartridgeSplit: false,
      value: undefined,
      switchNoValue: true,
    };
    const facetClean = {
      id: "facetTextarea",
      label: "facetTextarea",
      type: DefaultTextType,
      colorTheme,
      onChange: emptyFn,
      cartridgeSplit: false,
      value: undefined,
      switchNoValue: false,
    };
    expect(facetClean).toEqual(clearTextFilter(facetDirty));
  });

  test("FACETTEXTAREA switchCaseSensitive", () => {
    const facetDirty = {
      id: "facetTextarea",
      label: "facetTextarea",
      type: DefaultTextType,
      colorTheme,
      onChange: emptyFn,
      cartridgeSplit: false,
      value: undefined,
      switchCaseSensitive: true,
    };
    const facetClean = {
      id: "facetTextarea",
      label: "facetTextarea",
      type: DefaultTextType,
      colorTheme,
      onChange: emptyFn,
      cartridgeSplit: false,
      value: undefined,
      switchCaseSensitive: false,
    };
    expect(facetClean).toEqual(clearTextFilter(facetDirty));
  });

  test("FACETTEXTAREA switchCaseSensitive", () => {
    const facetDirty = {
      id: "facetTextarea",
      label: "facetTextarea",
      type: DefaultTextType,
      colorTheme,
      onChange: emptyFn,
      cartridgeSplit: false,
      value: undefined,
      switchExactValue: true,
    };
    const facetClean = {
      id: "facetTextarea",
      label: "facetTextarea",
      type: DefaultTextType,
      colorTheme,
      onChange: emptyFn,
      cartridgeSplit: false,
      value: undefined,
      switchExactValue: false,
    };
    expect(facetClean).toEqual(clearTextFilter(facetDirty));
  });
});
