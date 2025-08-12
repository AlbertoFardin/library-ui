import * as React from "react";
import { action } from "@storybook/addon-actions";
import InputSearch from ".";
import InputButton from "../../stories/InputButton";
import InputBoolean from "../../stories/InputBoolean";
import InputText from "../../stories/InputText";
import CardDemo from "../../stories/CardDemo";
import Text from "../Text";
import Popover, { PopoverOrigin } from "../Popover";
import { getTheme } from "../../theme";
import Divider from "../Divider";
import Btn from "../Btn";
import List from "../List";
import Toolbar from "../Toolbar";
import Modal from "../Modal";

const valueDefault =
  "Once Upon a Time,\nthere are a little girl called Red Hood";
const color = getTheme().colors.theme1;
const originAnchor: PopoverOrigin = {
  horizontal: "left",
  vertical: "auto",
};
const originTransf: PopoverOrigin = {
  horizontal: "left",
  vertical: "auto",
};
const width = 350;
const borderRadius = getTheme().borderRadius;

const DemoFieldText = () => {
  const [value, setValue] = React.useState(valueDefault);
  const [disabled, setDisabled] = React.useState(false);

  const popRef = React.useRef(null);
  const [popover, setPopover] = React.useState(false);
  const [popOpen, setPopOpen] = React.useState(false);
  const [modalAutoFocus, setModalAutoFocus] = React.useState(false);

  const onChange = React.useCallback((value: string) => {
    setValue(value);
    action("onChange")(value);
    // console.log("onChange", { value });
  }, []);
  const onSetEmptyString = React.useCallback(() => setValue(""), []);
  const onSetCiao = React.useCallback(() => setValue("ciao👋"), []);
  const onSetNull = React.useCallback(() => setValue(null), []);
  const onSetUndefined = React.useCallback(() => setValue(undefined), []);
  const onPop = React.useCallback(() => setPopOpen(!popOpen), [popOpen]);
  const onModalAutoFocus = React.useCallback(
    () => setModalAutoFocus(!modalAutoFocus),
    [modalAutoFocus],
  );

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row", height: "inherit" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <InputSearch
            cmpRef={popRef}
            style={{
              borderRadius,
              width,
              boxSizing: "border-box",
              zIndex: popOpen ? getTheme().zIndex.modal + 1 : undefined,
            }}
            color={color}
            disabled={disabled}
            value={value}
            onChange={onChange}
            children={
              !popover ? undefined : (
                <Btn style={{ margin: 0 }} icon="tune" onClick={onPop} />
              )
            }
          />
          <div style={{ padding: 50 }} />
        </div>
        <CardDemo>
          <InputButton label='Set "ciao👋"' onChange={onSetCiao} />
          <InputButton label='Set ""' onChange={onSetEmptyString} />
          <InputButton label='Set "null"' onChange={onSetNull} />
          <InputButton label='Set "undefined"' onChange={onSetUndefined} />
          <InputButton
            label="Open modal where test autoFocus"
            onChange={onModalAutoFocus}
          />
          <InputBoolean
            label="disabled"
            value={disabled}
            onChange={setDisabled}
          />
          <InputBoolean
            label="try popover"
            value={popover}
            onChange={setPopover}
          />
          <InputText disabled label="value" value={value} />
        </CardDemo>
      </div>
      <Popover
        open={popOpen}
        anchorEl={popRef.current}
        onClose={onPop}
        originAnchor={originAnchor}
        originTransf={originTransf}
        style={{ borderRadius, width }}
        backdropVisible
      >
        <Toolbar>
          <Text weight="bolder" size={2} children="Popover title" />
          <div style={{ flex: 1 }} />
          <Btn color={color} variant="outlined" label="CLOSE" onClick={onPop} />
        </Toolbar>
        <Divider />
        <List style={{ padding: 15, maxHeight: 100 }}>
          <Text children="component 0" />
          <Text children="component 1" />
          <Text children="component 2" />
          <Text children="component 3" />
          <Text children="component 4" />
          <Text children="component 5" />
          <Text children="component 6" />
          <Text children="component 7" />
          <Text children="component 8" />
          <Text children="component 9" />
          <Text children="component 10" />
        </List>
      </Popover>
      <Modal
        title="Modal autoFocus"
        open={modalAutoFocus}
        onClose={onModalAutoFocus}
        content={
          <InputSearch
            color={color}
            value={value}
            onChange={onChange}
            autoFocus
          />
        }
      />
    </>
  );
};

export default DemoFieldText;
