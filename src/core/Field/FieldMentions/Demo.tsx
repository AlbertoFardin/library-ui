import * as React from "react";
import { action } from "@storybook/addon-actions";
import FieldMentions from "./FieldMentions";
import {
  color,
  style,
  menuItems,
  adornmentIcon,
  adornmentAvatar,
  adornmentElement,
} from "../utils/story";
import { IUserMock, IUserType } from "../../../utils/getUser";
import CardDemo from "../../../stories/CardDemo";
import InputBoolean from "../../../stories/InputBoolean";
import InputButton from "../../../stories/InputButton";
import InputText from "../../../stories/InputText";

const urlImage = "./images/width_128/test_image1.jpeg";
const urlImage2 = "./images/width_128/test_image2.jpeg";
const urlImage3 = "./images/width_128/test_image4.jpeg";
const urlImage4 = "./images/width_128/test_image3.jpeg";

const users: IUserMock[] = [
  {
    type: IUserType.USER,
    id: "_id1",
    avatar: urlImage,
    avatarIcon: "person",
    avatarText: "LR",
    name: "Laura Rossi",
    firstName: "Laura",
    lastName: "Rossi",
  },
  {
    type: IUserType.USER,
    id: "_id2",
    avatar: urlImage2,
    avatarIcon: "person",
    avatarText: "MD",
    name: "Marta Draghi",
    firstName: "Marta",
    lastName: "Draghi",
  },
  {
    type: IUserType.USER,
    id: "_id3",
    avatar: urlImage3,
    avatarIcon: "person",
    avatarText: "ET",
    name: "Elisa Tommasi",
    firstName: "Elisa",
    lastName: "Tommasi",
  },
  {
    type: IUserType.USER,
    id: "_id4",
    avatar: urlImage4,
    avatarIcon: "person",
    avatarText: "GS",
    name: "Genoveffa Strudel",
    firstName: "Genoveffa",
    lastName: "Strudel",
  },
];

const DemoMentionsInput = () => {
  const [readOnly, setReadOnly] = React.useState(false);
  const [menu, setMenu] = React.useState(false);
  const [menuVisibled, setMenuVisibled] = React.useState(false);
  const [value, setValue] = React.useState(undefined);
  const [adIcon, setAdIcon] = React.useState(false);
  const [adAvatar, setAdAvatar] = React.useState(false);
  const [adElement, setAdElement] = React.useState(false);
  const onChange = React.useCallback((newValue, mentions) => {
    console.log("--", newValue);
    setValue(newValue);
    action("onChange")(newValue, mentions);
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
        <FieldMentions
          color={color}
          label="FieldMentions"
          value={value}
          onChange={onChange}
          users={users}
          readOnly={readOnly}
          menu={menu ? menuItems : []}
          menuVisibled={menuVisibled}
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
        <InputText disabled label="value" value={JSON.stringify(value)} />
      </CardDemo>
    </div>
  );
};

export default DemoMentionsInput;
