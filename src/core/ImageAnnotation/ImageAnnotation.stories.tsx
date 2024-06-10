import * as React from "react";
import DemoImageAnnotation from "./Demo";
import ImageAnnotation from ".";

export default {
  title: "Core/ImageAnnotation",
  component: ImageAnnotation,
};

const StoryDemo = () => <DemoImageAnnotation />;
export const Demo = StoryDemo.bind({});
