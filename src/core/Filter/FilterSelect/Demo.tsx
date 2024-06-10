import * as React from "react";
import { action } from "@storybook/addon-actions";
import { IFilterSelectItem } from "./IFilterSelect";
import FieldText from "../../Field/FieldText";
import Text from "../../Text";
import Divider from "../../Divider";
import mockitems from "./utils/mockitems";
import FilterSelect from "./FilterSelect";

const optionsInit: IFilterSelectItem[] = mockitems.map(({ nome }) => ({
  id: nome,
  label: nome,
}));
const size = 5;

const FilterSelectDemo = () => {
  const [maxItems, setMaxItems] = React.useState("50");
  const [options, setOptions] = React.useState([] as IFilterSelectItem[]);
  const [optionsMore, setOptionsMore] = React.useState(0);
  const [value, setValue] = React.useState([] as string[]);
  const [searchInput, setSearchInput] = React.useState("");
  const onChange = React.useCallback((v) => {
    setValue(v.value.map((o) => o.id));
    action("onChange")(v);
  }, []);

  React.useEffect(() => {
    let newOptions = [];
    let newOptionsMore = 0;
    if (!!searchInput) {
      newOptions = optionsInit.filter(({ label }) => {
        const labelUp = label.toLocaleUpperCase();
        const inputUp = searchInput.toLocaleUpperCase();
        return labelUp.indexOf(inputUp) !== -1;
      });
      newOptionsMore = 0;
    } else {
      newOptions = optionsInit.slice(0, size);
      newOptionsMore = optionsInit.length - size;
    }

    setOptions(newOptions);
    setOptionsMore(newOptionsMore);
  }, [searchInput]);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <FilterSelect
        id={"demo"}
        label="Demo - Regioni Italiane"
        onChange={onChange}
        onSearch={setSearchInput}
        maxItems={Number(maxItems)}
        value={value}
        options={options}
        optionsMore={optionsMore}
        style={{
          border: "1px solid #f00",
          width: 250,
        }}
      />
      <div style={{ flex: 1, padding: 10 }}>
        <Text weight="bolder" size={3} children="Value length selectable:" />
        <FieldText
          style={{ marginTop: 0 }}
          value={maxItems}
          onChange={setMaxItems}
        />
        <Divider />
        <Text weight="bolder" size={3} children="Value selected:" />
        {(value || []).map((v) => (
          <Text key={v} children={`-> ${v}`} />
        ))}
      </div>
    </div>
  );
};

export default FilterSelectDemo;
