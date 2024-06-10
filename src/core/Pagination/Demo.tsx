import { action } from "@storybook/addon-actions";
import * as React from "react";
import Text from "../Text";
import Btn from "../Btn";
import Pagination, { IPageSize } from ".";

const pageSizesDefault = [
  {
    label: "1 Rows",
    value: 1,
    selected: false,
  },
  {
    label: "2 Rows",
    value: 2,
    selected: false,
  },
  {
    label: "20 Rows",
    value: 20,
    selected: false,
  },
  {
    label: "50 Rows",
    value: 50,
    selected: true,
  },
  {
    label: "150 Rows",
    value: 150,
    selected: false,
  },
  {
    label: "1000 Rows",
    value: 1000,
    selected: false,
  },
  {
    label: "10000 Rows",
    value: 10000,
    selected: false,
  },
];

const PaginationDemo = () => {
  const itemsCount = 15000;
  const [value, setValue] = React.useState(1);
  const [sizes, setSizes] = React.useState(pageSizesDefault as IPageSize[]);
  const sizeSelValue = sizes.find(({ selected }) => selected).value;
  const cbOnChangeCurr = React.useCallback((cur: number) => {
    setValue(cur);
    console.log("onChangeCurr", cur);
    action("onChangeCurr")(cur);
  }, []);
  const cbOnChangeSize = React.useCallback((newSizes: IPageSize[]) => {
    setSizes(newSizes);
    console.log("onChangeSize", newSizes);
    action("onChangeSize")(newSizes);
  }, []);
  const cbOnSetPage1 = React.useCallback(() => {
    cbOnChangeCurr(1);
  }, [cbOnChangeCurr]);
  return (
    <div>
      <Text children={`ES size ${sizeSelValue}`} />
      <Text children={`ES from ${sizeSelValue * (value - 1)}`} />
      <Btn color="#f00" label="SetPage1" onClick={cbOnSetPage1} />

      <Pagination
        pageCurr={value}
        pageSize={sizes}
        onChangeCurr={cbOnChangeCurr}
        onChangeSize={cbOnChangeSize}
        textNext={`of ${itemsCount} items`}
        count={itemsCount}
      />
    </div>
  );
};

export default PaginationDemo;
