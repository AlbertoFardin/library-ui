import * as React from "react";
import { action } from "@storybook/addon-actions";
import CardDemo from "../../stories/CardDemo";
import InputButton from "../../stories/InputButton";
import InputBoolean from "../../stories/InputBoolean";
import InputText from "../../stories/InputText";
import InputNumber from "../../stories/InputNumber";
import ViewList from "./ViewList";
import {
  TYPE,
  contextmenuView,
  itemRender,
  items as itemsMock,
  columns,
  itemHeight,
} from "./mocks";
import Text from "../../core/Text";
import { ISortOrder } from "../../interfaces";
import { IItemDecorator } from "./interfaces";

export const itemHeader = ({
  type,
  indexRow,
  totalRows,
}: IItemDecorator): JSX.Element => {
  switch (type) {
    case TYPE.MEDIA:
      return (
        <Text
          ellipsis
          weight="bolder"
          children={`${type}_header_${indexRow}/${totalRows}`}
          style={{ flex: 1, color: "#f00" }}
        />
      );
    case TYPE.FOLDER:
      return (
        <Text
          ellipsis
          weight="bolder"
          children={`${type}_header_${indexRow}/${totalRows}`}
          style={{ flex: 1, color: "#0f0" }}
        />
      );
    default:
      return null;
  }
};
export const itemFooter = ({
  type,
  indexRow,
  totalRows,
}: IItemDecorator): JSX.Element => {
  switch (type) {
    case TYPE.MEDIA:
      return (
        <Text
          ellipsis
          weight="bolder"
          children={`${type}_footer_${indexRow}/${totalRows}`}
          style={{ flex: 1, color: "#f00" }}
        />
      );
    case TYPE.FOLDER:
      return (
        <Text
          ellipsis
          weight="bolder"
          children={`${type}_footer_${indexRow}/${totalRows}`}
          style={{ flex: 1, color: "#0f0" }}
        />
      );
    default:
      return null;
  }
};

const ViewDemo = () => {
  const [needHeaderF, setNeedHeaderF] = React.useState(0);
  const [needFooterF, setNeedFooterF] = React.useState(0);
  const [needFooterM, setNeedFooterM] = React.useState(0);
  const [needHeaderM, setNeedHeaderM] = React.useState(0);
  const [needToolbar, setNeedToolbar] = React.useState(true);
  const [resetScrollbar, setResetScrollbar] = React.useState(0);
  const [items, setItems] = React.useState(itemsMock);
  const [itemsSlcId, setItemsSlcId] = React.useState([
    itemsMock[1].id,
    itemsMock[2].id,
    itemsMock[3].id,
  ]);

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
  const onChangeItemsSlcId = React.useCallback((v: string) => {
    setItemsSlcId(v.split(","));
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "row", height: "inherit" }}>
      <div style={{ display: "flex", flex: 1, border: "1px solid #f00" }}>
        <ViewList
          style={{ flex: 1 }}
          itemRender={itemRender}
          itemHeight={itemHeight}
          items={items}
          itemsSelectedId={itemsSlcId}
          columns={columns}
          columnsSortId={columns[0].id}
          columnsSortOrder={ISortOrder.ASC}
          contextmenu={contextmenuView}
          onColumnSort={action("onColumnSort")}
          onClick={action("onClick")}
          placeholderIcon="help_center"
          placeholderLabel="View is Empty"
          itemsTypeSort={[TYPE.FOLDER, TYPE.MEDIA, TYPE.PORTAL]}
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
          needToolbar={needToolbar}
          resetScrollbar={resetScrollbar}
        />
      </div>
      <CardDemo>
        <InputNumber
          value={needHeaderF}
          label="needHeader Folder"
          onChange={setNeedHeaderF}
        />
        <InputNumber
          value={needFooterF}
          label="needFooter Folder"
          onChange={setNeedFooterF}
        />
        <InputNumber
          value={needHeaderM}
          label="needHeader Media"
          onChange={setNeedHeaderM}
        />
        <InputNumber
          value={needFooterM}
          label="needFooter Media"
          onChange={setNeedFooterM}
        />
        <InputBoolean
          value={needToolbar}
          label="needToolbar"
          onChange={setNeedToolbar}
        />
        <InputButton label="Reset Scrollbar" onChange={onResetScrollbar} />
        <InputButton label="Add more items" onChange={onAddItems} />
        <InputText label="Items count" value={String(items.length)} disabled />
        <InputText
          label="ItemsSelectedId"
          value={String(itemsSlcId)}
          onChange={onChangeItemsSlcId}
        />
      </CardDemo>
    </div>
  );
};

export default ViewDemo;
