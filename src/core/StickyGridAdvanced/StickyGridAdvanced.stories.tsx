import * as React from "react";
import StickyGridAdvancedDemo from "./StickyGridAdvancedDemo";
import StickyGridAdvanced from "./StickyGridAdvanced";

export default {
  title: "Core/StickyGridAdvanced",
  component: StickyGridAdvanced,
};

const GridAdvancedStory = (args) => <StickyGridAdvancedDemo {...args} />;
export const Demo = GridAdvancedStory.bind({});

export const ContentOverride = GridAdvancedStory.bind({});
ContentOverride.args = {
  demoContentOverride: true,
};

export const ContentEmpty = GridAdvancedStory.bind({});
ContentEmpty.args = {
  demoContentEmpty: true,
};

export const ContentLoading = GridAdvancedStory.bind({});
ContentLoading.args = {
  demoContentLoading: true,
};

export const ContentError = GridAdvancedStory.bind({});
ContentError.args = {
  demoContentError: true,
};
