import * as React from "react";
import { action } from "@storybook/addon-actions";
import FieldPicker, { IFieldPickerCreateProp } from ".";
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
import { IListItem } from "../../ListItem";

const createProps: IFieldPickerCreateProp[] = [
  { id: "id", text: "id", required: true },
  { id: "label", text: "Label", required: true },
  { id: "subLabel", text: "Sub-Label", required: false },
  { id: "icon", text: "Icon", required: false },
];

const items: IListItem[] = [];
for (let i = 0; i < 50; i++) {
  const id = `item_${i + 1}`;
  const obj: IListItem = { id, label: id };
  items.push(obj);
}

const DemoFieldPicker = () => {
  const [readOnly, setReadOnly] = React.useState(false);
  const [menu, setMenu] = React.useState(false);
  const [menuVisibled, setMenuVisibled] = React.useState(false);
  const [value, setValue] = React.useState([] as string[]);
  const [adIcon, setAdIcon] = React.useState(false);
  const [adAvatar, setAdAvatar] = React.useState(false);
  const [adElement, setAdElement] = React.useState(false);
  const [itemsSortable, setItemsSortable] = React.useState(false);
  const [createEnabled, setCreateEnabled] = React.useState(true);

  const onChange = React.useCallback((v: string[]) => {
    setValue(v);
    action("onChange")(v);
  }, []);
  const onCreate = React.useCallback(
    (v) => {
      items.push(v);
      const newValue = Array.from(value);
      newValue.push(v.id);
      setValue(newValue);
      action("onCreate")(v);
    },
    [value],
  );
  const setClear = React.useCallback(() => setValue(undefined), []);
  const setValue1 = React.useCallback(() => setValue(["item_2", "item_3"]), []);

  return (
    <div style={{ display: "flex", flexDirection: "row", height: "inherit" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
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
          onCreate={onCreate}
          style={style}
          adornmentIcon={adIcon ? adornmentIcon : undefined}
          adornmentAvatar={adAvatar ? adornmentAvatar : undefined}
          adornmentElement={adElement ? adornmentElement : undefined}
          createEnabled={createEnabled}
          createProps={createProps}
        />
      </div>
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
        <InputText disabled label="value" value={JSON.stringify(value)} />
      </CardDemo>
    </div>
  );
};

export default DemoFieldPicker;
