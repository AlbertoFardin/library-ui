import * as React from "react";
import { action } from "@storybook/addon-actions";
import FieldRichEditor from ".";
import { RICHEDITOR_EMPTY_TAG } from "../../EditorWysiwyg";
import InputButton from "../../../stories/InputButton";
import InputBoolean from "../../../stories/InputBoolean";
import CardDemo from "../../../stories/CardDemo";
import { IPopoverListItem } from "../../PopoverList";
import {
  color,
  menuItems,
  style,
  adornmentIcon,
  adornmentAvatar,
  adornmentElement,
} from "../utils/story";

const valueDefault =
  "<p><strong>Lorem ipsum dolor</strong> <em>sit amet, consectetur adipiscing elit.</em>&nbsp;</p><ul><li>Vivamus accumsan lectus ut libero vulputate.</li></ul><p>Elementum felis aliquet. Fusce non tincidunt turpis, sit amet tincidunt magna. Nulla nec aliquam diam, eget gravida nisi. Nulla facilisis, dui lacinia sodales tristique, tellus magna bibendum enim, a tincidunt justo urna sit amet leo. Nulla facilisis nibh nec purus tempor, eu rutrum purus convallis. In sollicitudin velit urna, vitae iaculis justo fermentum in. Nam finibus augue nec elit varius, quis ultricies felis suscipit. Integer ac gravida risus. Sed vel urna vel mauris pellentesque interdum.</p><p>Elementum felis aliquet. Fusce non tincidunt turpis, sit amet tincidunt magna. Nulla nec aliquam diam, eget gravida nisi. Nulla facilisis, dui lacinia sodales tristique, tellus magna bibendum enim, a tincidunt justo urna sit amet leo. Nulla facilisis nibh nec purus tempor, eu rutrum purus convallis. In sollicitudin velit urna, vitae iaculis justo fermentum in. Nam finibus augue nec elit varius, quis ultricies felis suscipit. Integer ac gravida risus. Sed vel urna vel mauris pellentesque interdum.</p>";

enum ACTIONS {
  CHANGE_VALUE = "CHANGE_VALUE",
  SET_VALUE = "SET_VALUE",
  SAVE_START = "SAVE_START",
  SAVE_END = "SAVE_END",
  RESET = "RESET",
  READONLY = "READONLY",
  MENU = "MENU",
  MENUVISIBLED = "MENUVISIBLED",
  AD_ICON = "AD_ICON",
  AD_AVATAR = "AD_AVATAR",
  AD_ELEMENT = "AD_ELEMENT",
}

interface IState {
  value: string;
  isSaving: boolean;
  readOnly: boolean;
  menu: IPopoverListItem[];
  menuVisibled: boolean;
  adIcon: boolean;
  adAvatar: boolean;
  adElement: boolean;
}

const stateInit: IState = {
  value: valueDefault,
  isSaving: false,
  readOnly: false,
  menu: [],
  menuVisibled: false,
  adIcon: false,
  adAvatar: false,
  adElement: false,
};

const reducer = (state: IState, action): IState => {
  const newState = { ...state };
  switch (action.type) {
    case ACTIONS.CHANGE_VALUE:
      newState.value = action.value;
      return newState;
    case ACTIONS.SET_VALUE:
      newState.value = action.value;
      return newState;
    case ACTIONS.READONLY:
      newState.readOnly = !newState.readOnly;
      return newState;
    case ACTIONS.MENU:
      newState.menu = !newState.menu.length ? menuItems : [];
      return newState;
    case ACTIONS.MENUVISIBLED:
      newState.menuVisibled = !newState.menuVisibled;
      return newState;
    case ACTIONS.AD_ICON:
      newState.adIcon = !newState.adIcon;
      return newState;
    case ACTIONS.AD_AVATAR:
      newState.adAvatar = !newState.adAvatar;
      return newState;
    case ACTIONS.AD_ELEMENT:
      newState.adElement = !newState.adElement;
      return newState;
    case ACTIONS.RESET:
      return stateInit;
    default:
      throw new Error();
  }
};

const Demo = () => {
  const [state, dispatch] = React.useReducer(reducer, stateInit);
  const {
    value,
    isSaving,
    readOnly,
    menu,
    menuVisibled,
    adIcon,
    adAvatar,
    adElement,
  } = state;

  const onChange = React.useCallback((value: string) => {
    console.log("onChange demo 1", value);
    action("onChange")(value);
    dispatch({ type: ACTIONS.CHANGE_VALUE, value });
  }, []);
  const setValueEmpty = React.useCallback(() => {
    dispatch({ type: ACTIONS.SET_VALUE, value: RICHEDITOR_EMPTY_TAG });
  }, []);
  const setValueProva = React.useCallback(() => {
    dispatch({ type: ACTIONS.SET_VALUE, value: "PROVA" });
  }, []);
  const setValueDefault = React.useCallback(() => {
    dispatch({ type: ACTIONS.SET_VALUE, value: valueDefault });
  }, []);
  const setValueBr = React.useCallback(() => {
    dispatch({ type: ACTIONS.SET_VALUE, value: "<p><br></p>" });
  }, []);
  const setValueNull = React.useCallback(() => {
    dispatch({ type: ACTIONS.SET_VALUE, value: null });
  }, []);
  const onReadOnly = React.useCallback(() => {
    dispatch({ type: ACTIONS.READONLY });
  }, []);
  const onMenu = React.useCallback(() => {
    dispatch({ type: ACTIONS.MENU });
  }, []);
  const onMenuVisibled = React.useCallback(() => {
    dispatch({ type: ACTIONS.MENUVISIBLED });
  }, []);
  const onAdIcon = React.useCallback(() => {
    dispatch({ type: ACTIONS.AD_ICON });
  }, []);
  const onAdAvatar = React.useCallback(() => {
    dispatch({ type: ACTIONS.AD_AVATAR });
  }, []);
  const onAdElement = React.useCallback(() => {
    dispatch({ type: ACTIONS.AD_ELEMENT });
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
        <FieldRichEditor
          color={color}
          value={value}
          readOnly={readOnly || isSaving}
          label="FieldRichEditor"
          labelModal="FieldRichEditor label modal"
          style={style}
          onChange={onChange}
          menu={menu}
          menuVisibled={menuVisibled}
          adornmentIcon={adIcon ? adornmentIcon : undefined}
          adornmentAvatar={adAvatar ? adornmentAvatar : undefined}
          adornmentElement={adElement ? adornmentElement : undefined}
        />
      </div>
      <CardDemo>
        <InputButton label="set value EMPTY string" onChange={setValueEmpty} />
        <InputButton label="set value PROVA" onChange={setValueProva} />
        <InputButton label="set value DEFAULT" onChange={setValueDefault} />
        <InputButton label="set value <p><br></p>" onChange={setValueBr} />
        <InputButton label="set value null" onChange={setValueNull} />
        <InputBoolean label="readOnly" value={readOnly} onChange={onReadOnly} />
        <InputBoolean label="menu" value={!!menu.length} onChange={onMenu} />
        <InputBoolean
          label="menuVisibled"
          value={menuVisibled}
          onChange={onMenuVisibled}
        />
        <InputBoolean
          label="adornmentIcon"
          value={adIcon}
          onChange={onAdIcon}
        />
        <InputBoolean
          label="adornmentAvatar"
          value={adAvatar}
          onChange={onAdAvatar}
        />
        <InputBoolean
          label="adornmentElement"
          value={adElement}
          onChange={onAdElement}
        />
      </CardDemo>
    </div>
  );
};

export default Demo;
