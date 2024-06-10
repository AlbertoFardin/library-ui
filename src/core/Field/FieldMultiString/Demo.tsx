import * as React from "react";
import { action } from "@storybook/addon-actions";
import InputButton from "../../../stories/InputButton";
import InputBoolean from "../../../stories/InputBoolean";
import CardDemo from "../../../stories/CardDemo";
import FieldMultiString from ".";
import Chip from "../../Chip";
import {
  color,
  menuItems,
  style,
  adornmentIcon,
  adornmentAvatar,
  adornmentElement,
} from "../utils/story";

const valueDefault = [];
for (let i = 0; i < 5; i++) {
  const id = `item_${i}`;
  valueDefault.push({ id, label: id });
}
const renderChip = ({ id, label, readOnly, onClick }) => (
  <Chip
    key={id}
    id={id}
    icon="close"
    label={label}
    color="#00f"
    selected
    onClick={readOnly ? undefined : onClick}
  />
);

const DemoFieldMultiString = () => {
  const [value, setValue] = React.useState(valueDefault);
  const [readOnly, setReadOnly] = React.useState(false);
  const [menu, setMenu] = React.useState(false);
  const [menuVisibled, setMenuVisibled] = React.useState(false);
  const [customChip, setCustomChip] = React.useState(false);
  const [adIcon, setAdIcon] = React.useState(false);
  const [adAvatar, setAdAvatar] = React.useState(false);
  const [adElement, setAdElement] = React.useState(false);
  const [readOnlyInput, setReadOnlyInput] = React.useState(false);
  const [type, setType] = React.useState(
    "multiselect" as "singleselect" | "multiselect",
  );

  const onCustomChip = React.useCallback(
    () => setCustomChip(!customChip),
    [customChip],
  );
  const onChange = React.useCallback((newItem, newItems) => {
    setValue(newItems);
    action("onChange")(newItem, newItems);
  }, []);
  const onSetValueDefault = React.useCallback(() => {
    setValue(valueDefault);
  }, []);
  const onSetValueMany = React.useCallback(() => {
    const valueMany = [];
    for (let i = 0; i < 35; i++) {
      const id = `item_${i}`;
      valueMany.push({ id, label: id });
    }
    setValue(valueMany);
  }, []);
  const onClear = React.useCallback(() => {
    setValue([]);
  }, []);
  const onType = React.useCallback(() => {
    setValue([]);
    setType(type === "singleselect" ? "multiselect" : "singleselect");
  }, [type]);

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
        <FieldMultiString
          color={color}
          label="FieldMultiString"
          value={value}
          style={style}
          onChange={onChange}
          onClick={action("onClick")}
          readOnly={readOnly}
          type={type}
          menu={menu ? menuItems : []}
          menuVisibled={menuVisibled}
          renderChip={customChip ? renderChip : undefined}
          adornmentIcon={adIcon ? adornmentIcon : undefined}
          adornmentAvatar={adAvatar ? adornmentAvatar : undefined}
          adornmentElement={adElement ? adornmentElement : undefined}
          readOnlyInput={readOnlyInput}
        />
      </div>
      <CardDemo>
        <InputButton label="Clear input" onChange={onClear} />
        <InputButton label="Set default value" onChange={onSetValueDefault} />
        <InputButton label="Set many values" onChange={onSetValueMany} />
        <InputBoolean
          label="customChip"
          value={customChip}
          onChange={onCustomChip}
        />
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
          label={`type: ${type}`}
          value={type === "multiselect"}
          onChange={onType}
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
          label="readOnlyInput"
          value={readOnlyInput}
          onChange={setReadOnlyInput}
        />
      </CardDemo>
    </div>
  );
};

export default DemoFieldMultiString;
