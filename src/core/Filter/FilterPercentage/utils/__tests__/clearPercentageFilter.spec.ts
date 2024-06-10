import emptyFn from "../../../../../utils/emptyFn";
import { DefaultPercentageType } from "../../FilterPercentage";
import { PercentageRange } from "../../IFilterPercentage";
import { clearPercentageFilter } from "../Functions";

const colorTheme = "#f00";

describe("clearPercentageFilter", () => {
  test("value set", () => {
    const facetDirty = {
      id: "facet_PERCENTAGE",
      label: "facet_PERCENTAGE",
      type: DefaultPercentageType,
      colorTheme,
      onChange: emptyFn,
      value: [25, 75] as PercentageRange,
    };
    const facetClean = {
      id: "facet_PERCENTAGE",
      label: "facet_PERCENTAGE",
      type: DefaultPercentageType,
      colorTheme,
      onChange: emptyFn,
      value: undefined,
    };
    expect(clearPercentageFilter(facetDirty)).toEqual(facetClean);
  });
  test("value undefined", () => {
    const facetDirty = {
      id: "facet_PERCENTAGE",
      label: "facet_PERCENTAGE",
      type: DefaultPercentageType,
      colorTheme,
      onChange: emptyFn,
    };
    const facetClean = {
      id: "facet_PERCENTAGE",
      label: "facet_PERCENTAGE",
      type: DefaultPercentageType,
      colorTheme,
      onChange: emptyFn,
      value: undefined,
    };
    expect(clearPercentageFilter(facetDirty)).toEqual(facetClean);
  });
});
