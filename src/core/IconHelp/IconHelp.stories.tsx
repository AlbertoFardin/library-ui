import IconHelp from "./IconHelp";

export default {
  title: "core/IconHelp",
  component: IconHelp,
  args: {
    open: true,
    tooltip: "_tooltip_",
  },
};

const ExampleStory = (args) => <IconHelp {...args} />;
export const Example = ExampleStory.bind({});
