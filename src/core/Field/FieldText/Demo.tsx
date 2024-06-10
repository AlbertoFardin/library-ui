import * as React from "react";
import { action } from "@storybook/addon-actions";
import FieldText from ".";
import { defaultAutoSize, defaultMaxRows, defaultMinRows } from "./FieldText";
import InputButton from "../../../stories/InputButton";
import InputBoolean from "../../../stories/InputBoolean";
import InputNumber from "../../../stories/InputNumber";
import CardDemo from "../../../stories/CardDemo";
import {
  color,
  menuItems,
  style,
  adornmentIcon,
  adornmentAvatar,
  adornmentElement,
} from "../utils/story";

const valueDefault =
  "Once Upon a Time,\nthere are a little girl called Red Hood";

const DemoFieldText = () => {
  const [value, setValue] = React.useState(valueDefault);
  const [readOnly, setReadOnly] = React.useState(false);
  const [multiline, setMultiline] = React.useState(false);
  const [autosize, setAutosize] = React.useState(defaultAutoSize);
  const [minRows, setMinRows] = React.useState(defaultMinRows);
  const [maxRows, setMaxRows] = React.useState(defaultMaxRows);
  const [menu, setMenu] = React.useState(false);
  const [menuVisibled, setMenuVisibled] = React.useState(false);
  const [adIcon, setAdIcon] = React.useState(false);
  const [adAvatar, setAdAvatar] = React.useState(false);
  const [adElement, setAdElement] = React.useState(false);

  const onChange = React.useCallback((newValue: string) => {
    setValue(newValue);
    action("onChange")(newValue);
    console.log("change value " + newValue);
  }, []);
  const onSetEmptyString = React.useCallback(() => setValue(""), []);
  const onSetCiao = React.useCallback(() => setValue("ciao👋"), []);
  const onSetNull = React.useCallback(() => setValue(null), []);
  const onSetUndefined = React.useCallback(() => setValue(undefined), []);

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
        <FieldText
          color={color}
          readOnly={readOnly}
          multiline={multiline}
          autosize={autosize}
          minRows={minRows}
          maxRows={maxRows}
          menu={menu ? menuItems : []}
          menuVisibled={menuVisibled}
          value={value}
          label="FieldText"
          style={style}
          onChange={onChange}
          adornmentIcon={adIcon ? adornmentIcon : undefined}
          adornmentAvatar={adAvatar ? adornmentAvatar : undefined}
          adornmentElement={adElement ? adornmentElement : undefined}
        />
      </div>
      <CardDemo>
        <InputButton label='Set "ciao👋"' onChange={onSetCiao} />
        <InputButton label='Set ""' onChange={onSetEmptyString} />
        <InputButton label='Set "null"' onChange={onSetNull} />
        <InputButton label='Set "undefined"' onChange={onSetUndefined} />
        <InputBoolean
          label="readOnly"
          value={readOnly}
          onChange={setReadOnly}
        />
        <InputBoolean
          label="multiline"
          value={multiline}
          onChange={setMultiline}
        />
        <InputBoolean
          label="autosize"
          value={autosize}
          onChange={setAutosize}
        />
        <InputNumber label="minRows" value={minRows} onChange={setMinRows} />
        <InputNumber label="maxRows" value={maxRows} onChange={setMaxRows} />
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
      </CardDemo>
    </div>
  );
};

export default DemoFieldText;
