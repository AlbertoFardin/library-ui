import * as React from "react";
import { action } from "@storybook/addon-actions";
import Btn, { IBtn } from ".";
import { getTheme } from "../../theme";
import DemoBtn from "./Demo";
import Text from "../Text";
import Toolbar from "../Toolbar";
import InputFile from "../InputFile";

const args: IBtn = {
  icon: "photo_camera",
  label: "Camera_Camera_Camera_Camera_Camera_",
  onClick: action("onClick"),
  copyToClipboard: "_copyToClipboard_",
  tooltip: "tooltip",
  style: { maxWidth: 100 },
};

export default {
  title: "Core/Btn",
  component: Btn,
  args,
};

const DemoStory = () => <DemoBtn />;
export const Demo = DemoStory.bind({});

const StorySimple = (args) => <Btn {...args} />;

const Story = (args) => (
  <table>
    <thead>
      <tr>
        <th>
          <Text weight="bolder" children="VARIANT" />
        </th>
        <th>
          <Text weight="bolder" children="icon" />
        </th>
        <th>
          <Text weight="bolder" children="label" />
        </th>
        <th>
          <Text weight="bolder" children="selected" />
        </th>
        <th>
          <Text weight="bolder" children="disabled" />
        </th>
        <th>
          <Text weight="bolder" children="small" />
        </th>
      </tr>
    </thead>
    <tbody>
      {["light", "bold"].map((v) => {
        const color = v === "bold" ? getTheme().colors.msgSucc : undefined;
        return (
          <tr key={v}>
            <td>
              <Text style={{ fontStyle: "italic" }} children={v} />
            </td>
            <td>
              <Btn {...args} label="" variant={v} color={color} />
            </td>
            <td>
              <Btn {...args} icon="" variant={v} color={color} />
            </td>
            <td>
              <Btn {...args} variant={v} color={color} selected />
            </td>
            <td>
              <Btn {...args} variant={v} color={color} disabled />
            </td>
            <td>
              <Btn {...args} label="" variant={v} color={color} small />
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

export const Default = Story.bind({});

const menu = {
  items: ["1", "2", "3", "4", "5"].map((n) => ({
    id: n,
    label: "listimtem___" + n,
  })),
};

const MenuStory = () => (
  <div
    style={{
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <Toolbar>
      <Btn variant="bold" label="label1" menu={menu} />
      <div style={{ flex: 1 }} />
      <Btn variant="bold" label="label2" menu={menu} />
    </Toolbar>
    <div style={{ flex: 1 }} />
    <Toolbar>
      <Btn variant="bold" label="label_3" menu={menu} />
      <div style={{ flex: 1 }} />
      <Btn variant="bold" label="label_4" menu={menu} />
    </Toolbar>
  </div>
);
export const MenuPosition = MenuStory.bind({});

export const AdditionalChildren = StorySimple.bind({});
AdditionalChildren.args = {
  variant: "bold",
  color: getTheme().colors.msgInfo,
  label: "Select a file",
  children: (
    <InputFile acceptFiles="*" onChangeInput={action("onChangeInput")} />
  ),
};
