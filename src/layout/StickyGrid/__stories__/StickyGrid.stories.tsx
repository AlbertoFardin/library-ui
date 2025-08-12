import StickyGrid from "../../StickyGrid";
import StickyGridDemo from "./StickyGridDemo";
import CellThumbnailsStory from "./CellThumbnailsStory";

export default {
  title: "layout/StickyGrid",
  component: StickyGrid,
};

const GridSimpleStory = (args) => <StickyGridDemo {...args} />;
export const Demo = GridSimpleStory.bind({});

export const CellThumbnails = CellThumbnailsStory.bind({});
