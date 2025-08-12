import * as React from "react";
import { action } from "@storybook/addon-actions";
import FilterText from "./FilterText";
import IFilterText from "./IFilterText";
import { clearTextFilter } from "./utils/Functions";
import InputBoolean from "../../../stories/InputBoolean";
import InputButton from "../../../stories/InputButton";

const FilterTextDemo = () => {
  const [filter, setFilter] = React.useState<IFilterText>({
    id: "facetTextarea",
    label: "Facet Text Area",
    value: "",
    switchCaseSensitive: false,
    switchExactValue: false,
    switchNoValue: false,
    collapsed: false,
    multiline: true,
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

  const onMultiline = React.useCallback(
    (v: boolean) => {
      setFilter({ ...filter, multiline: v });
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
        style={{
          border: "1px solid #f00",
          width: 250,
        }}
        collapsedHelp="Please enable to edit"
      />
      <InputBoolean
        label="multiline"
        value={filter.multiline || false}
        onChange={onMultiline}
      />
      <InputButton label="Clear input" onChange={onClear} />
      <InputButton label="Set ciao👋" onChange={onSetCiao} />
      <InputButton
        label={"Label sub: " + String(filter.labelSub !== undefined)}
        onChange={onLabelSub}
      />
      <InputButton
        label={"disabled: " + String(filter.collapsed)}
        onChange={onCollapsed}
      />
    </div>
  );
};

export default FilterTextDemo;
