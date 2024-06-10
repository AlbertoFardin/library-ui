import * as React from "react";
import ViewerVideo from ".";

export default {
  title: "Core/ViewerVideo",
  component: ViewerVideo,
};

const ExampleStory = () => (
  <div
    style={{
      height: "inherit",
      width: "inherit",
      display: "flex",
      flexDirection: "column",
      boxSizing: "border-box",
      border: "1px solid #f00",
    }}
  >
    <ViewerVideo src="./video/width_128/test_video.mp4" />
  </div>
);

export const Example = ExampleStory.bind({});
