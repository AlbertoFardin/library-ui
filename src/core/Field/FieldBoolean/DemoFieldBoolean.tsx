import * as React from "react";
import { action } from "@storybook/addon-actions";
import FieldSelectBoolean from "./FieldBoolean";
import InputButton from "../../../stories/InputButton";
import InputBoolean from "../../../stories/InputBoolean";
import InputText from "../../../stories/InputText";
import CardDemo from "../../../stories/CardDemo";
import {
  color,
  menuItems,
  style,
  adornmentIcon,
  adornmentAvatar,
  adornmentElement,
} from "../utils/story";

const DemoFieldBoolean = () => {
  const [readOnly, setReadOnly] = React.useState(false);
  const [value, setValue] = React.useState(undefined);
  const [menu, setMenu] = React.useState(false);
  const [menuVisibled, setMenuVisibled] = React.useState(false);
  const [adIcon, setAdIcon] = React.useState(false);
  const [adAvtr, setAdAvtr] = React.useState(false);
  const [adElem, setAdElem] = React.useState(false);

  const onChange = React.useCallback((newValue) => {
    console.log("onChange", newValue);
    setValue(newValue);
    action("onChange")(newValue);
  }, []);
  const onClear = React.useCallback(() => {
    setValue(undefined);
  }, []);

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
        <FieldSelectBoolean
          color={color}
          label="FieldSelectBoolean"
          value={value}
          style={style}
          onChange={onChange}
          readOnly={readOnly}
          menu={menu ? menuItems : []}
          menuVisibled={menuVisibled}
          adornmentIcon={adIcon ? adornmentIcon : undefined}
          adornmentAvatar={adAvtr ? adornmentAvatar : undefined}
          adornmentElement={adElem ? adornmentElement : undefined}
        />
      </div>
      <CardDemo>
        <InputButton label="Clear input" onChange={onClear} />
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
          value={adAvtr}
          onChange={setAdAvtr}
        />
        <InputBoolean
          label="adornmentElement"
          value={adElem}
          onChange={setAdElem}
        />
        <InputText disabled label="value" value={JSON.stringify(value)} />
      </CardDemo>
    </div>
  );
};

export default DemoFieldBoolean;
