import * as React from "react";
import { action } from "@storybook/addon-actions";
import FieldPicker, { IFieldPickerDialogField } from ".";
import {
  color,
  style,
  menuItems,
  adornmentIcon,
  adornmentAvatar,
  adornmentElement,
} from "../utils/story";
import InputBoolean from "../../../stories/InputBoolean";
import InputButton from "../../../stories/InputButton";
import InputText from "../../../stories/InputText";
import CardDemo from "../../../stories/CardDemo";
import Modal from "../../Modal";
import { getTheme } from "../../../theme";
import { IFieldItem } from "./IFieldPicker";

const createFields: IFieldPickerDialogField[] = [
  { id: "id", text: "id", mandatory: true, singular: true },
  { id: "label", text: "Label", mandatory: true },
  { id: "subLabel", text: "Sub-Label" },
  { id: "icon", text: "Icon" },
];
const modifyFields: IFieldPickerDialogField[] = [
  { id: "id", text: "id", mandatory: true, disabled: true },
  { id: "label", text: "Label", mandatory: true },
  { id: "subLabel", text: "Sub-Label" },
  { id: "icon", text: "Icon" },
];

const itemsInit: IFieldItem[] = [];
for (let i = 0; i < 50; i++) {
  const id = `item_${i + 1}`;
  const obj: IFieldItem = { id, label: id };
  itemsInit.push(obj);
}

const DemoFieldPicker = () => {
  const [readOnly, setReadOnly] = React.useState(false);
  const [menu, setMenu] = React.useState(false);
  const [menuVisibled, setMenuVisibled] = React.useState(false);
  const [value, setValue] = React.useState([] as string[]);
  const [adIcon, setAdIcon] = React.useState(false);
  const [adAvatar, setAdAvatar] = React.useState(false);
  const [adElement, setAdElement] = React.useState(false);
  const [items, setItems] = React.useState(itemsInit);
  const [itemsSortable, setItemsSortable] = React.useState(false);
  const [createEnabled, setCreateEnabled] = React.useState(false);
  const [modifyEnabled, setModifyEnabled] = React.useState(false);

  const onChange = React.useCallback((v: string[]) => {
    setValue(v);
    action("onChange")(v);
  }, []);
  const onCreate = React.useCallback(
    (v) => {
      const newItems = Array.from(items);
      newItems.push(v);
      setItems(newItems);
      const newValue = Array.from(value);
      newValue.push(v.id);
      setValue(newValue);
      console.log("onCreate", v);
      action("onCreate")(v);
    },
    [items, value],
  );
  const onModify = React.useCallback(
    (v) => {
      const newItems = Array.from(items);
      const index = items.findIndex((a) => a.id === v.id);
      newItems.splice(index, 1, v);
      setItems(newItems);
      console.log("onModify", v);
      action("onModify")(v);
    },
    [items],
  );
  const setClear = React.useCallback(() => setValue(undefined), []);
  const setValue1 = React.useCallback(() => setValue(["item_2", "item_3"]), []);
  const onClose = React.useCallback(() => {}, []);

  const zIndex = getTheme().zIndex.modal + 3;
  return (
    <div style={{ display: "flex", flexDirection: "row", height: "inherit" }}>
      <Modal
        open={true}
        onClose={onClose}
        zIndex={zIndex}
        style={{
          height: "90vh",
          width: "90vw",
        }}
        content={
          <div
            style={{
              display: "flex",
              alignItems: "start",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <FieldPicker
              color={color}
              readOnly={readOnly}
              menu={menu ? menuItems : []}
              menuVisibled={menuVisibled}
              value={value}
              items={items}
              itemsSortable={itemsSortable}
              label="FieldPicker"
              onChange={onChange}
              style={style}
              adornmentIcon={adIcon ? adornmentIcon : undefined}
              adornmentAvatar={adAvatar ? adornmentAvatar : undefined}
              adornmentElement={adElement ? adornmentElement : undefined}
              dialogToCreate={{
                enable: createEnabled,
                fields: createFields,
                onChange: onCreate,
              }}
              dialogToModify={{
                enable: modifyEnabled,
                fields: modifyFields,
                onChange: onModify,
              }}
              itemsSearchable={true}
              itemsSearchKeys={["label", "id"]}
              zIndex={zIndex}
            />

            <CardDemo>
              <InputButton label="setClear" onChange={setClear} />
              <InputButton label="setValue" onChange={setValue1} />
              <InputBoolean
                label="readOnly"
                value={readOnly}
                onChange={setReadOnly}
              />
              <InputBoolean label="menu" value={menu} onChange={setMenu} />
              <InputBoolean
                label="menuVisibled"
                value={menuVisibled}
                onChange={setMenuVisibled}
              />
              <InputBoolean
                label="adornmentIcon"
                value={adIcon}
                onChange={setAdIcon}
              />
              <InputBoolean
                label="adornmentAvatar"
                value={adAvatar}
                onChange={setAdAvatar}
              />
              <InputBoolean
                label="adornmentElement"
                value={adElement}
                onChange={setAdElement}
              />
              <InputBoolean
                label="itemsSortable"
                value={itemsSortable}
                onChange={setItemsSortable}
              />
              <InputBoolean
                label="createEnabled"
                value={createEnabled}
                onChange={setCreateEnabled}
              />
              <InputBoolean
                label="modifyEnabled"
                value={modifyEnabled}
                onChange={setModifyEnabled}
              />
              <InputText disabled label="value" value={JSON.stringify(value)} />
            </CardDemo>
          </div>
        }
      />
    </div>
  );
};

export default DemoFieldPicker;
