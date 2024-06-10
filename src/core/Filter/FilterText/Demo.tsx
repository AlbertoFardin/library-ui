import * as React from "react";
import FilterText from "./FilterText";
import Btn from "../../Btn";
import { action } from "@storybook/addon-actions";
import IFilterText from "./IFilterText";
import { clearTextFilter } from "./utils/Functions";

const FilterTextDemo = () => {
  const [filter, setFilter] = React.useState<IFilterText>({
    id: "facetTextarea",
    label: "Facet Text Area",
    value: "",
    switchCaseSensitive: false,
    switchExactValue: false,
    switchNoValue: false,
    collapsed: false,
    labelSub: undefined,
  });

  const onChange = React.useCallback(
    (f) => {
      setFilter({ ...filter, ...f });
      console.log(JSON.stringify(f));
      action("onChange")(f);
    },
    [filter],
  );

  const onClear = React.useCallback(() => {
    setFilter({ ...filter, ...clearTextFilter(filter) });
  }, [filter]);

  const onSetCiao = React.useCallback(
    () =>
      setFilter({
        ...filter,
        value: "ciao👋",
      }),
    [filter],
  );

  const onLabelSub = React.useCallback(() => {
    setFilter({
      ...filter,
      labelSub:
        filter.labelSub === undefined ? "This is a sub-label" : undefined,
    });
  }, [filter]);
  const onCollapsed = React.useCallback(() => {
    setFilter({
      ...filter,
      collapsed: !filter.collapsed,
    });
  }, [filter]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <FilterText
        {...(filter as IFilterText)}
        onChange={onChange}
        cartridgeSplit
        style={{
          border: "1px solid #f00",
          width: 250,
        }}
        collapsedHelp="Please enable to edit"
      />
      <Btn variant="bold" label="Clear input" onClick={onClear} />
      <Btn variant="bold" label="Set ciao👋" onClick={onSetCiao} />
      <Btn
        variant="bold"
        label={"Label sub: " + String(filter.labelSub !== undefined)}
        onClick={onLabelSub}
      />
      <Btn
        variant="bold"
        label={"disabled: " + String(filter.collapsed)}
        onClick={onCollapsed}
      />
    </div>
  );
};

export default FilterTextDemo;
