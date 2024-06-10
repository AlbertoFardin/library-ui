import emptyFn from "../../../../../utils/emptyFn";
import { DefaultTextType } from "../../FilterText";
import { isTextFiltered } from "../Functions";

const colorTheme = "#f00";

describe("isTextFiltered with  switchNoValue false", () => {
  test("value set", () => {
    const textFilter = {
      id: "facetTextarea",
      label: "facetTextarea",
      type: DefaultTextType,
      colorTheme,
      onChange: emptyFn,
      cartridgeSplit: false,
      switchNoValue: false,
      value: "__tests__",
    };
    expect(isTextFiltered(textFilter)).toEqual(true);
  });

  test("", () => {
    const textFilter = {
      id: "facetTextarea",
      label: "facetTextarea",
      type: DefaultTextType,
      colorTheme,
      onChange: emptyFn,
      cartridgeSplit: true,
      switchNoValue: false,
      value: ["t1", "t2", "t3"],
    };
    expect(isTextFiltered(textFilter)).toEqual(true);
  });

  test("FACETTEXTAREA switchNoValue", () => {
    const textFilter = {
      id: "facetTextarea",
      label: "facetTextarea",
      type: DefaultTextType,
      colorTheme,
      onChange: emptyFn,
      cartridgeSplit: false,
      value: undefined,
      switchNoValue: false,
    };
    expect(isTextFiltered(textFilter)).toEqual(false);
  });
});
describe("isTextFiltered with  switchNoValue true", () => {
  test("value set", () => {
    const textFilter = {
      id: "facetTextarea",
      label: "facetTextarea",
      type: DefaultTextType,
      colorTheme,
      onChange: emptyFn,
      cartridgeSplit: false,
      switchNoValue: true,
      value: "__tests__",
    };
    expect(isTextFiltered(textFilter)).toEqual(true);
  });

  test("", () => {
    const textFilter = {
      id: "facetTextarea",
      label: "facetTextarea",
      type: DefaultTextType,
      colorTheme,
      onChange: emptyFn,
      cartridgeSplit: true,
      switchNoValue: true,
      value: ["t1", "t2", "t3"],
    };
    expect(isTextFiltered(textFilter)).toEqual(true);
  });

  test("FACETTEXTAREA switchNoValue", () => {
    const textFilter = {
      id: "facetTextarea",
      label: "facetTextarea",
      type: DefaultTextType,
      colorTheme,
      onChange: emptyFn,
      cartridgeSplit: false,
      value: undefined,
      switchNoValue: true,
    };
    expect(isTextFiltered(textFilter)).toEqual(true);
  });
});
