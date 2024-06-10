import * as React from "react";
import * as moment from "moment";
import { action } from "@storybook/addon-actions";
import FieldDate from ".";
import {
  color,
  style,
  menuItems,
  adornmentIcon,
  adornmentAvatar,
  adornmentElement,
} from "../utils/story";
import { DATE_FORMAT } from "../../../interfaces";
import InputBoolean from "../../../stories/InputBoolean";
import InputButton from "../../../stories/InputButton";
import InputText from "../../../stories/InputText";
import CardDemo from "../../../stories/CardDemo";

const DemoFieldDate = () => {
  const [readOnly, setReadOnly] = React.useState(false);
  const [menu, setMenu] = React.useState(false);
  const [menuVisibled, setMenuVisibled] = React.useState(false);
  const [value, setValue] = React.useState(undefined);
  const [adIcon, setAdIcon] = React.useState(false);
  const [adAvatar, setAdAvatar] = React.useState(false);
  const [adElement, setAdElement] = React.useState(false);
  const onChange = React.useCallback((v: number) => {
    setValue(v);
    action("onChange")(v);
  }, []);
  const setClear = React.useCallback(() => setValue(undefined), []);
  const setToday = React.useCallback(() => setValue(new Date().getTime()), []);

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
        <FieldDate
          color={color}
          dateFormat={DATE_FORMAT}
          readOnly={readOnly}
          menu={menu ? menuItems : []}
          menuVisibled={menuVisibled}
          value={value}
          label="FieldDate"
          onChange={onChange}
          style={style}
          adornmentIcon={adIcon ? adornmentIcon : undefined}
          adornmentAvatar={adAvatar ? adornmentAvatar : undefined}
          adornmentElement={adElement ? adornmentElement : undefined}
        />
      </div>
      <CardDemo>
        <InputButton label="setClear" onChange={setClear} />
        <InputButton label="setToday" onChange={setToday} />
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
        <InputText
          disabled
          label="value"
          value={!value ? undefined : moment(value).format(DATE_FORMAT)}
        />
      </CardDemo>
    </div>
  );
};

export default DemoFieldDate;
