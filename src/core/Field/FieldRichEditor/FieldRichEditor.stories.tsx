import { action } from "@storybook/addon-actions";
import FieldRichEditor from "./FieldRichEditor";
import DemoFieldRichEditor from "./Demo";
import {
  color,
  style,
  multiLabels,
  adornmentElement,
  adornmentIcon,
  adornmentAvatar,
  menuItems,
} from "../utils/story";
import CardDemo from "../../../stories/CardDemo";

const value =
  "<p><strong>Lorem ipsum dolor</strong> <em>sit amet, consectetur adipiscing elit.</em>&nbsp;</p><ul>  <li>Vivamus accumsan lectus ut libero vulputate.</li></ul><p>Elementum felis aliquet. Fusce non tincidunt turpis, sit amet tincidunt magna. Nulla nec aliquam diam, eget gravida nisi. Nulla facilisis, dui lacinia sodales tristique, tellus magna bibendum enim, a tincidunt justo urna sit amet leo. Nulla facilisis nibh nec purus tempor, eu rutrum purus convallis. In sollicitudin velit urna, vitae iaculis justo fermentum in. Nam finibus augue nec elit varius, quis ultricies felis suscipit. Integer ac gravida risus. Sed vel urna vel mauris pellentesque interdum.</p><p>Elementum felis aliquet. Fusce non tincidunt turpis, sit amet tincidunt magna. Nulla nec aliquam diam, eget gravida nisi. Nulla facilisis, dui lacinia sodales tristique, tellus magna bibendum enim, a tincidunt justo urna sit amet leo. Nulla facilisis nibh nec purus tempor, eu rutrum purus convallis. In sollicitudin velit urna, vitae iaculis justo fermentum in. Nam finibus augue nec elit varius, quis ultricies felis suscipit. Integer ac gravida risus. Sed vel urna vel mauris pellentesque interdum.</p>";

export default {
  title: "core/Field/FieldRichEditor",
  component: FieldRichEditor,
  args: {
    color,
    style,
    label: "FieldRichEditor",
    labelModal: "FieldRichEditor label modal",
    onChange: action("onChange"),
    onBlur: action("onBlur"),
    onFocus: action("onFocus"),
    menu: menuItems,
    value,
  },
};

const DemoStory = () => <DemoFieldRichEditor />;
export const Demo = DemoStory.bind({});

const Story = (args) => (
  <CardDemo>
    <FieldRichEditor {...args} />
  </CardDemo>
);
export const Default = Story.bind({});

export const Disabled = Story.bind({});
Disabled.args = {
  readOnly: true,
};

export const UndefinedValue = Story.bind({});
UndefinedValue.args = {
  title: "test",
  value: undefined,
};

export const DefinedValue = Story.bind({});
DefinedValue.args = {
  title: "test",
  value:
    '"\\"{\\\\\\"eu\\\\\\":\\\\\\"19,99\\\\\\",\\\\\\"us\\\\\\":\\\\\\"24,99\\\\\\",\\\\\\"ru\\\\\\":{\\\\\\"full\\\\\\":\\\\\\"499\\\\\\",\\\\\\"discount\\\\\\":\\\\\\"399\\\\\\"}}\\""',
};

export const MultiLabels = Story.bind({});
MultiLabels.args = {
  label: multiLabels,
};

export const AdornmentElement = Story.bind({});
AdornmentElement.args = {
  adornmentElement,
};

export const AdornmentAvatar = Story.bind({});
AdornmentAvatar.args = {
  adornmentAvatar,
};

export const AdornmentIcon = Story.bind({});
AdornmentIcon.args = {
  adornmentIcon,
};
