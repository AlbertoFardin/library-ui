import * as React from "react";
import FieldLabel from "./FieldLabel";
import Text from "../Text";

export default {
  title: "Core/FieldLabel",
  component: FieldLabel,
  args: {
    label: "ciao mamma",
    mandatory: true,
  },
};

const ExampleStory = (args) => (
  <Text style={{ margin: 25 }} size={3} children={<FieldLabel {...args} />} />
);
export const Example = ExampleStory.bind({});
