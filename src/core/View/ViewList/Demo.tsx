import * as React from "react";
import CardDemo from "../../../stories/CardDemo";
import InputBoolean from "../../../stories/InputBoolean";
import InputButton from "../../../stories/InputButton";
import InputText from "../../../stories/InputText";
import { action } from "@storybook/addon-actions";
import ViewList from "./ViewList";
import {
  TYPE,
  contextmenuView,
  itemRender,
  items as itemsMock,
  columns,
} from "./mocks";
import Text from "../../Text";
import { ISortOrder } from "../../../interfaces";

export const itemHeader = (type: string): JSX.Element => {
  switch (type) {
    case TYPE.MEDIA:
      return (
        <Text
          ellipsis
          weight="bolder"
          children={`${type}_header`}
          style={{ color: "#f00" }}
        />
      );
    case TYPE.FOLDER:
      return (
        <Text
          ellipsis
          weight="bolder"
          children={`${type}_header`}
          style={{ color: "#0f0" }}
        />
      );
    default:
      return null;
  }
};
export const itemFooter = (type: string): JSX.Element => {
  switch (type) {
    case TYPE.MEDIA:
      return (
        <Text
          ellipsis
          weight="bolder"
          children={`${type}_footer`}
          style={{ color: "#f00" }}
        />
      );
    case TYPE.FOLDER:
      return (
        <Text
          ellipsis
          weight="bolder"
          children={`${type}_footer`}
          style={{ color: "#0f0" }}
        />
      );
    default:
      return null;
  }
};

const ViewDemo = () => {
  const [needHeaderF, setNeedHeaderF] = React.useState(true);
  const [needFooterF, setNeedFooterF] = React.useState(true);
  const [needFooterM, setNeedFooterM] = React.useState(true);
  const [needHeaderM, setNeedHeaderM] = React.useState(true);
  const [resetScrollbar, setResetScrollbar] = React.useState(0);
  const [items, setItems] = React.useState(itemsMock);

  const onAddItems = React.useCallback(() => {
    const t = new Date().getTime();
    const newItems1 = itemsMock.map((a) => ({ ...a, id: "1" + t + a.id }));
    const newItems2 = itemsMock.map((a) => ({ ...a, id: "2" + t + a.id }));
    const newItems3 = itemsMock.map((a) => ({ ...a, id: "3" + t + a.id }));
    setItems(items.concat(newItems1, newItems2, newItems3));
  }, [items]);
  const onResetScrollbar = React.useCallback(() => {
    setResetScrollbar(new Date().getTime());
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "row", height: "inherit" }}>
      <div style={{ display: "flex", flex: 1, border: "1px solid #f00" }}>
        <ViewList
          style={{ flex: 1 }}
          itemRender={itemRender}
          itemHeight={50}
          items={items}
          columns={columns}
          columnsSortId={columns[0].id}
          columnsSortOrder={ISortOrder.ASC}
          contextmenu={contextmenuView}
          onColumnSort={action("onColumnSort")}
          onClick={action("onClick")}
          placeholderIcon="help_center"
          placeholderLabel="View is Empty"
          itemsTypeSort={[TYPE.FOLDER, TYPE.MEDIA, TYPE.TOUCHPOINT]}
          itemHeader={itemHeader}
          itemFooter={itemFooter}
          needHeader={{
            [TYPE.FOLDER]: needHeaderF,
            [TYPE.MEDIA]: needHeaderM,
          }}
          needFooter={{
            [TYPE.FOLDER]: needFooterF,
            [TYPE.MEDIA]: needFooterM,
          }}
          resetScrollbar={resetScrollbar}
        />
      </div>
      <CardDemo>
        <InputBoolean
          value={needHeaderF}
          label="needHeader Folder"
          onChange={setNeedHeaderF}
        />
        <InputBoolean
          value={needFooterF}
          label="needFooter Folder"
          onChange={setNeedFooterF}
        />
        <InputBoolean
          value={needHeaderM}
          label="needHeader Media"
          onChange={setNeedHeaderM}
        />
        <InputBoolean
          value={needFooterM}
          label="needFooter Media"
          onChange={setNeedFooterM}
        />
        <InputButton label="Reset Scrollbar" onChange={onResetScrollbar} />
        <InputButton label="Add more items" onChange={onAddItems} />
        <InputText label="Items" value={String(items.length)} disabled />
      </CardDemo>
    </div>
  );
};

export default ViewDemo;
