import Placeholder from ".";

export default {
  title: "core/Placeholder",
  component: Placeholder,
  args: {
    icon: "camera",
    label: "CAMERA",
  },
};

const Story = (args) => (
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
    <Placeholder {...args} />
  </div>
);

export const Example = Story.bind({});

export const Label = Story.bind({});
Label.args = {
  icon: "",
  labelRequired: true,
};

export const Icon = Story.bind({});
Icon.args = {
  label: "",
};

export const Spinner = Story.bind({});
Spinner.args = {
  spinner: true,
};

export const CustomStyle = Story.bind({});
CustomStyle.args = {
  style: { backgroundColor: "rgba(0,250,0,0.1)" },
  icon: "check_circle",
  iconStyle: {
    fontSize: 150,
    color: "yellowgreen",
  },
  label: "Placeholder is OK",
  labelStyle: {
    color: "green",
  },
  background: true,
};
