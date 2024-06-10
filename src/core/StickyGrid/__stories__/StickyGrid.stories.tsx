import * as React from "react";
import StickyGrid from "../../StickyGrid";
import StickyGridDemo from "./StickyGridDemo";
import CellThumbnailsStory from "./CellThumbnailsStory";

export default {
  title: "Core/StickyGrid",
  component: StickyGrid,
};

const GridSimpleStory = (args) => <StickyGridDemo {...args} />;
export const Demo = GridSimpleStory.bind({});

export const CellThumbnails = CellThumbnailsStory.bind({});
