import * as React from "react";
import FieldPassThrough from ".";
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

const valueDefault =
  '{"productId":"1A3LP00812F","colorId":"149","priceList":[{"currencyId":"EUR","storeId":"010026","priceValues":[{"priceTypeId":1,"value":184.0000000000}]},{"currencyId":"EUR","storeId":"010028","priceValues":[{"priceTypeId":1,"value":184.0000000000}]},{"currencyId":"EUR","storeId":"010029","priceValues":[{"priceTypeId":1,"value":184.0000000000}]},{"currencyId":"EUR","storeId":"010037","priceValues":[{"priceTypeId":1,"value":184.0000000000}]},{"currencyId":"EUR","storeId":"010038","priceValues":[{"priceTypeId":1,"value":184.0000000000}]},{"currencyId":"EUR","storeId":"010040","priceValues":[{"priceTypeId":1,"value":184.0000000000}]},{"currencyId":"EUR","storeId":"010071","priceValues":[{"priceTypeId":2,"value":184.0000000000}]},{"currencyId":"EUR","storeId":"020068","priceValues":[{"priceTypeId":1,"value":184.0000000000}]},{"currencyId":"EUR","storeId":"030049","priceValues":[{"priceTypeId":1,"value":184.0000000000}]},{"currencyId":"EUR","storeId":"140039","priceValues":[{"priceTypeId":1,"value":184.0000000000}]},{"currencyId":"EUR","storeId":"160046","priceValues":[{"priceTypeId":1,"value":184.0000000000}]}]}';

const DemoFieldPassThrough = () => {
  const [value, setValue] = React.useState(valueDefault);
  const [menu, setMenu] = React.useState(false);
  const [menuVisibled, setMenuVisibled] = React.useState(false);
  const [adIcon, setAdIcon] = React.useState(false);
  const [adAvatar, setAdAvatar] = React.useState(false);
  const [adElement, setAdElement] = React.useState(false);

  const onSetEmptyString = React.useCallback(() => setValue(""), []);
  const onSetTrue = React.useCallback(() => setValue("true"), []);
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
        <FieldPassThrough
          color={color}
          menu={menu ? menuItems : []}
          menuVisibled={menuVisibled}
          value={value}
          label="FieldText"
          style={style}
          adornmentIcon={adIcon ? adornmentIcon : undefined}
          adornmentAvatar={adAvatar ? adornmentAvatar : undefined}
          adornmentElement={adElement ? adornmentElement : undefined}
        />
      </div>
      <CardDemo>
        <InputButton label='Set "true"' onChange={onSetTrue} />
        <InputButton label='Set ""' onChange={onSetEmptyString} />
        <InputButton label='Set "null"' onChange={onSetNull} />
        <InputButton label='Set "undefined"' onChange={onSetUndefined} />
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

export default DemoFieldPassThrough;
