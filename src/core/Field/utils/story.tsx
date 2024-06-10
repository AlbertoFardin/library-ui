import * as React from "react";
import Icon from "../../Icon";
import Btn from "../../Btn";
import { action } from "@storybook/addon-actions";
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

export const multiLabels: ILabel[] = [
  {
    style: { color: "#fff", backgroundColor: "#00f", padding: "0 5px" },
    required: true,
    label: "label_1",
    positionX: "left",
    positionY: "top",
  },
  {
    style: { color: "#fff", backgroundColor: "#f00", padding: "0 5px" },
    label: "label_2",
    positionX: "right",
    positionY: "top",
  },
  {
    style: { color: "#fff", backgroundColor: "#0f0", padding: "0 5px" },
    label: "label_3",
    positionX: "right",
    positionY: "bottom",
  },
  {
    style: { color: "#00f" },
    label: (
      <>
        <Icon
          style={{ fontSize: 14, verticalAlign: "middle" }}
          children="public"
        />
        <span
          style={{ fontSize: 12, verticalAlign: "middle" }}
          children="READY"
        />
      </>
    ),
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
