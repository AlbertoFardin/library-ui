import * as React from "react";
import Tooltip from ".";
import Text from "../Text";

const ExampleStory = (args) => (
  <div
    style={{
      width: 300,
      height: 100,
      border: `1px solid #f00`,
      overflow: "hidden",
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      margin: "auto",
    }}
  >
    <div
      style={{
        background: "#f00",
        position: "absolute",
        right: 0,
        left: 0,
        top: 0,
        width: "inherit",
        height: 10,
        margin: "auto",
        zIndex: 5,
      }}
    />
    <Tooltip {...args}>
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          margin: "auto",
          border: "1px solid #00f",
          height: 50,
          width: 100,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
        children="Example"
      />
    </Tooltip>
  </div>
);

export default {
  title: "Core/Tooltip",
  component: Tooltip,
  args: {
    open: true,
    title: "tooltip",
  },
};

export const Example = ExampleStory.bind({});

export const PlacementTop = ExampleStory.bind({});
PlacementTop.args = {
  place: "top",
};

export const PlacementRight = ExampleStory.bind({});
PlacementRight.args = {
  place: "right",
};

export const PlacementLeft = ExampleStory.bind({});
PlacementLeft.args = {
  place: "left",
};

export const PlacementBottom = ExampleStory.bind({});
PlacementBottom.args = {
  place: "bottom",
};

export const RenderArrayString = ExampleStory.bind({});
RenderArrayString.args = {
  title: ["line_1", "line_2", "line_3", "very long line_4 with emoji ✅"],
};

export const RenderJsxElement = ExampleStory.bind({});
RenderJsxElement.args = {
  title: (
    <>
      <Text style={{ color: "#fff" }} size={0} children="TEST size0" />
      <Text style={{ color: "#fff" }} size={1} children="TEST size1" />
      <Text style={{ color: "#fff" }} size={3} children="TEST size2" />
      <Text style={{ color: "#f00" }} size={3} children="TEST colored" />
    </>
  ),
};

const ExampleStory2 = () => (
  <div
    style={{
      width: 300,
      height: 100,
      border: `1px solid #f00`,
      overflow: "hidden",
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      margin: "auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <Tooltip
      open
      title={
        <>
          <span>TooltipTextExample_nodejs</span>
        </>
      }
    >
      <div
        style={{
          border: "1px solid #00f",
          height: 50,
          width: 100,
        }}
        children="A"
      />
    </Tooltip>
    <Tooltip open title={"TooltipTextExample_string"}>
      <div
        style={{
          border: "1px solid #00f",
          height: 50,
          width: 100,
        }}
        children="B"
      />
    </Tooltip>
  </div>
);
export const RenderJsxElemen2 = ExampleStory2.bind({});

export const RenderVeryLongText = ExampleStory.bind({});
RenderVeryLongText.args = {
  title:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc mattis, urna non fringilla malesuada, justo nibh dignissim ante, sed ornare ligula odio sed magna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec sit amet dignissim nibh. Integer eu diam quis dolor dapibus auctor. Mauris porta lectus non ex gravida, vel vehicula nisl dapibus. Aenean ut pretium erat, eget vestibulum urna. Sed blandit, felis sit amet ultrices elementum, magna libero congue felis, eu molestie ligula massa vel orci. Pellentesque euismod lectus diam, finibus cursus velit laoreet nec. Etiam eget eros a justo consequat condimentum vel nec sem. Cras eleifend diam ut eros ornare placerat.",
};
