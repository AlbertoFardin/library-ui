import { action } from "@storybook/addon-actions";
import Btn from "../../Btn";
import { ILabel } from "../Label";
import { IPopoverListItem } from "../../PopoverList";

const urlImage2 = "./images/width_128/test_image2.jpeg";

export const style = {
  width: 300,
  margin: "35px 25px",
};

export const adornmentIcon = "alarm";
export const adornmentAvatar = urlImage2;
export const color = "#f00";

const adornmentElementOnClick = () => console.log("onClick adornmentElement");
export const adornmentElement = (
  <Btn
    color="#f00"
    selected
    icon="close"
    label="adornmentElement"
    onClick={adornmentElementOnClick}
    style={{ margin: 0, minHeight: 32, maxWidth: "inherit", zIndex: 999 }}
  />
);

const readyOnClick = () => {
  console.log("onClickReady");
  action("onClickReady")();
};
const readyColor = "#48B784";
const readyBtn = (
  <Btn
    style={{
      margin: 0,
      border: `1px solid ${readyColor}`,
      backgroundColor: "#fff",
    }}
    color={readyColor}
    icon="public"
    iconStyle={{ color: readyColor }}
    label="READY"
    labelStyle={{ color: readyColor }}
    onClick={readyOnClick}
  />
);
export const multiLabels: ILabel[] = [
  {
    style: { color: "#fff", backgroundColor: "#00f", padding: "0 5px" },
    textMandatory: true,
    text: "label_1",
    positionX: "left",
    positionY: "top",
  },
  {
    style: { color: "#fff", backgroundColor: "#f00", padding: "0 5px" },
    text: "label_2",
    positionX: "right",
    positionY: "top",
  },
  {
    style: { color: "#fff", backgroundColor: "#0f0", padding: "0 5px" },
    text: "label_3",
    positionX: "right",
    positionY: "bottom",
  },
  {
    style: { bottom: "-35px", left: 0 },
    node: readyBtn,
    positionX: "left",
    positionY: "bottom",
  },
];

export const menuItems: IPopoverListItem[] = [1, 2, 3, 4, 5].map((n) => ({
  id: String(n),
  label: "listitem_" + n,
  onClick: () => {
    console.log("__click" + n);
    action("__click" + n)();
  },
}));
