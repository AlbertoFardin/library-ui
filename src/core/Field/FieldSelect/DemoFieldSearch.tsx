import * as React from "react";
import { action } from "@storybook/addon-actions";
import FieldSelect from ".";
import InputNumber from "../../../stories/InputNumber";
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

const urlImage = "./images/width_128/test_image1.jpeg";
const urlImage2 = "./images/width_128/test_image2.jpeg";
const urlImage3 = "./images/width_128/test_image3.jpeg";

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
const DemoFieldSearch = () => {
  const [readOnly, setReadOnly] = React.useState(false);
  const [optSearch, setOptSearch] = React.useState<IListItem[]>([]);
  const [optSelect, setOptSelect] = React.useState<IListItem[]>(fruits);
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState<string[]>([]);
  const [menu, setMenu] = React.useState(false);
  const [menuVisibled, setMenuVisibled] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [adIcon, setAdIcon] = React.useState(false);
  const [adAvtr, setAdAvtr] = React.useState(false);
  const [adElem, setAdElem] = React.useState(false);
  const [type, setType] = React.useState(
    "multiselect" as "singleselect" | "multiselect",
  );
  const [maxSelectable, setMaxSelectable] = React.useState<number>(null);
  const onChange = React.useCallback((newItem, newItems) => {
    console.log("onChange", newItem, newItems);
    setValue(newItems);
    action("onChange")(newItem, newItems);
  }, []);
  const onSearch = React.useCallback((text) => {
    console.log("onSearch", text);
    setInput(text || "default");
    setLoading(true);
    action("onSearch")(text);
  }, []);
  const onClear = React.useCallback(() => {
    setValue([]);
    setOptSelect(fruits);
  }, []);
  const onSet1 = React.useCallback(() => {
    setValue(fruits1);
    setOptSelect(fruits);
  }, []);
  const onSet2 = React.useCallback(() => {
    setValue(fruits2);
    setOptSelect(fruits);
  }, []);
  const onReadOnly = React.useCallback(
    () => setReadOnly(!readOnly),
    [readOnly],
  );
  const onType = React.useCallback(() => {
    setValue([]);
    setType(type === "singleselect" ? "multiselect" : "singleselect");
  }, [type]);
  const options = [];
  optSearch.forEach((a) => {
    options.push(a);
  });
  optSelect.forEach((a) => {
    options.push(a);
  });

  React.useEffect(() => {
    if (input) {
      setTimeout(() => {
        const newOptions = [urlImage, urlImage2, urlImage3].reduce(
          (acc, avatar, i) => {
            const v = `${input}_${i}`;
            acc.push({
              id: i,
              label: v,
              avatar,
            });
            return acc;
          },
          [],
        );
        setOptSearch(newOptions);
        setInput("");
        setLoading(false);
      }, 750);
    }
  }, [input, value]);

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
          label="FieldSearch"
          placeholder="Search..."
          type={type}
          value={value}
          options={options}
          style={style}
          searchable
          onChange={onChange}
          onSearch={onSearch}
          menu={menu ? menuItems : []}
          menuVisibled={menuVisibled}
          readOnly={readOnly}
          adornmentIcon={adIcon ? adornmentIcon : undefined}
          adornmentAvatar={adAvtr ? adornmentAvatar : undefined}
          adornmentElement={adElem ? adornmentElement : undefined}
          loading={loading}
          maxSelectable={maxSelectable >= 0 ? maxSelectable : undefined}
        />
      </div>
      <CardDemo>
        <InputButton label="Clear input" onChange={onClear} />
        <InputButton label='Set "Tomato"' onChange={onSet1} />
        <InputButton label='Set "Banana" + "Orange"' onChange={onSet2} />
        <InputBoolean label="readOnly" value={readOnly} onChange={onReadOnly} />
        <InputBoolean label="menu" value={menu} onChange={setMenu} />
        <InputBoolean
          label="menuVisibled"
          value={menuVisibled}
          onChange={setMenuVisibled}
        />
        <InputBoolean
          value={type === "multiselect"}
          label={`type: ${type}`}
          onChange={onType}
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
        <InputNumber
          label="maxSelectable"
          value={maxSelectable}
          onChange={setMaxSelectable}
        />
      </CardDemo>
    </div>
  );
};

export default DemoFieldSearch;
