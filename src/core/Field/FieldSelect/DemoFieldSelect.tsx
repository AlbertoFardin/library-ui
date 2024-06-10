import * as React from "react";
import { action } from "@storybook/addon-actions";
import FieldSelect from ".";
import InputButton from "../../../stories/InputButton";
import InputBoolean from "../../../stories/InputBoolean";
import CardDemo from "../../../stories/CardDemo";
import {
  color,
  menuItems,
  style,
  adornmentIcon,
  adornmentAvatar,
  adornmentElement,
} from "../utils/story";
import { IListItem } from "../../ListItem";

const fruits: IListItem[] = [
  {
    id: "_apple",
    label: "apple",
    help: "help_apple",
  },
  {
    id: "_banana",
    label: "banana",
    help: "help_apple",
  },
  {
    id: "_orange",
    label: "orange",
    help: "help_apple",
  },
  {
    id: "_tomato",
    label: "tomato",
    help: "help_tomato",
  },
];
const fruits1 = ["_tomato"];
const fruits2 = ["_banana", "_tomato"];

const DemoFieldSelect = () => {
  const [readOnly, setReadOnly] = React.useState(false);
  const [value, setValue] = React.useState(fruits.map((a) => a.id));
  const [menu, setMenu] = React.useState(false);
  const [menuVisibled, setMenuVisibled] = React.useState(false);
  const [type, setType] = React.useState(
    "multiselect" as "singleselect" | "multiselect",
  );
  const [adIcon, setAdIcon] = React.useState(false);
  const [adAvatar, setAdAvatar] = React.useState(false);
  const [adElement, setAdElement] = React.useState(false);

  const onChange = React.useCallback((newItem, newItems) => {
    console.log("onChange", newItem, newItems);
    setValue(newItems);
    action("onChange")(newItem, newItems);
  }, []);
  const onClear = React.useCallback(() => {
    setValue([]);
  }, []);
  const onSet1 = React.useCallback(() => {
    setValue(fruits1);
  }, []);
  const onSet2 = React.useCallback(() => {
    setValue(fruits2);
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
        <FieldSelect
          color={color}
          label="FieldSelect"
          type={type}
          options={fruits}
          value={value}
          style={style}
          onChange={onChange}
          readOnly={readOnly}
          menu={menu ? menuItems : []}
          menuVisibled={menuVisibled}
          adornmentIcon={adIcon ? adornmentIcon : undefined}
          adornmentAvatar={adAvatar ? adornmentAvatar : undefined}
          adornmentElement={adElement ? adornmentElement : undefined}
        />
      </div>
      <CardDemo>
        <InputButton label="Clear input" onChange={onClear} />
        <InputButton label='Set "Tomato"' onChange={onSet1} />
        <InputButton label='Set "Banana" + "Orange"' onChange={onSet2} />
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
      </CardDemo>
    </div>
  );
};

export default DemoFieldSelect;
