import * as React from "react";
import { action } from "@storybook/addon-actions";
import MultiDownloads, { IMultiDownloadsItem } from ".";

const urlImage = "./images/width_128/test_image1.jpeg";
const urlImage2 = "./images/width_128/test_image2.jpeg";
const urlImage3 = "./images/width_128/test_image3.jpeg";
const urlImage4 = "./images/width_128/test_image4.jpeg";

const items: IMultiDownloadsItem[] = [
  {
    id: "Bianco",
    name: "Bianco",
    url: urlImage,
    onClick: action("onClick"),
  },
  {
    id: "Bianco_err",
    name: "Bianco_err",
    url: urlImage,
    onClick: action("onClick"),
    error: true,
    tooltip: "tooltip error",
  },
  {
    id: "Grigio",
    name: "Grigio",
    url: urlImage2,
    onClick: action("onClick"),
  },
  {
    id: "Rosso",
    name: "Rosso",
    url: urlImage3,
    onClick: action("onClick"),
  },
  {
    id: "Maculato",
    name: "Maculato",
    url: urlImage4,
    onClick: action("onClick"),
    loading: true,
  },
  {
    id: "Nero",
    name: "Nero",
    url: "",
    onClick: action("onClick"),
    loading: true,
  },
  {
    id: "Tigrato",
    name: "Tigrato",
    url: "",
    onClick: action("onClick"),
    loading: true,
  },
  {
    id: "Marrone",
    name: "Marrone",
    url: "",
    onClick: action("onClick"),
    loading: true,
  },
];

export default {
  title: "Core/MultiDownloads",
  component: MultiDownloads,
  args: {
    open: true,
    onClose: action("onClose"),
    items,
  },
};

const Story = (args) => (
  <div
    style={{
      position: "relative",
      width: "inherit",
      minHeight: 300,
      border: "1px solid #f00",
      boxSizing: "border-box",
    }}
  >
    <MultiDownloads {...args} />
  </div>
);

export const Default = Story.bind({});
