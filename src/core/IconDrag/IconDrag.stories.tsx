import IconDrag from "./IconDrag";

export default {
  title: "core/IconDrag",
  component: IconDrag,
  args: {
    open: true,
  },
};

const ExampleStory = (args) => <IconDrag {...args} />;
export const Example = ExampleStory.bind({});
