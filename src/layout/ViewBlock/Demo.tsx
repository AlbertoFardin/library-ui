import * as React from "react";
import { action } from "@storybook/addon-actions";
import CardDemo from "../../stories/CardDemo";
import InputButton from "../../stories/InputButton";
import InputText from "../../stories/InputText";
import ViewBlock from "./ViewBlock";
import {
  TYPE,
  contextmenuView,
  itemHeight,
  itemRender,
  items as itemsMock,
} from "./mocks";
import Text from "../../core/Text";
import InputNumber from "../../stories/InputNumber";
import { IItemDecorator } from "./interfaces";

export const itemHeader = ({
  type,
  indexRow,
  indexCol,
  totalRows,
  totalCols,
}: IItemDecorator): JSX.Element => {
  switch (type) {
    case TYPE.MEDIA:
      return (
        <Text
          ellipsis
          weight="bolder"
          children={`${type}_header_${indexRow}/${totalRows}_${indexCol}/${totalCols}`}
          style={{ color: "#f00" }}
        />
      );
    case TYPE.FOLDER:
      return (
        <Text
          ellipsis
          weight="bolder"
          children={`${type}_header_${indexRow}/${totalRows}_${indexCol}/${totalCols}`}
          style={{ color: "#0f0" }}
        />
      );
    default:
      return null;
  }
};
export const itemFooter = ({
  type,
  indexRow,
  indexCol,
  totalRows,
  totalCols,
}: IItemDecorator): JSX.Element => {
  switch (type) {
    case TYPE.MEDIA:
      return (
        <Text
          ellipsis
          weight="bolder"
          children={`${type}_footer_${indexRow}/${totalRows}_${indexCol}/${totalCols}`}
          style={{ color: "#f00" }}
        />
      );
    case TYPE.FOLDER:
      return (
        <Text
          ellipsis
          weight="bolder"
          children={`${type}_footer_${indexRow}/${totalRows}_${indexCol}/${totalCols}`}
          style={{ color: "#0f0" }}
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
        <ViewBlock
          style={{ flex: 1 }}
          color="#00f"
          itemRender={itemRender}
          itemWidth={180}
          itemHeight={itemHeight}
          items={items}
          contextmenu={contextmenuView}
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
        <InputButton label="Reset Scrollbar" onChange={onResetScrollbar} />
        <InputButton label="Add more items" onChange={onAddItems} />
        <InputText label="Items" value={String(items.length)} disabled />
      </CardDemo>
    </div>
  );
};

export default ViewDemo;
