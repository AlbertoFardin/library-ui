import { action } from "@storybook/addon-actions";
import DemoFieldSearch from "../FieldSelect/DemoFieldSearch";
import DemoFieldSelect from "../FieldSelect/DemoFieldSelect";
import FieldSelect, { IFieldSelect } from "../FieldSelect";
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
import Tooltip from "../../Tooltip";
import Btn from "../../Btn";

const manyOptions = [];
for (let i = 0; i < 30; i++) {
  const id = `item_${i + 1}`;
  manyOptions.push({
    id,
    label: id,
  });
}

const args: IFieldSelect = {
  color,
  label: "FieldSelect",
  onChange: action("onChange"),
  style,
  value: ["apple"],
  options: [
    {
      id: "apple",
      label: "apple",
    },
  ],
  menu: menuItems,
};

export default {
  title: "core/Field/FieldSelect",
  component: FieldSelect,
  args,
};

const DemoStorySearch = () => <DemoFieldSearch />;
export const DemoSearch = DemoStorySearch.bind({});

const DemoStorySelect = () => <DemoFieldSelect />;
export const DemoSelect = DemoStorySelect.bind({});

const Story = (args) => (
  <CardDemo>
    <FieldSelect {...args} />
  </CardDemo>
);
export const Default = Story.bind({});

export const Disabled = Story.bind({});
Disabled.args = {
  readOnly: true,
};

export const Placeholder = Story.bind({});
Placeholder.args = {
  value: undefined,
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

export const ManyItems = Story.bind({});
ManyItems.args = {
  options: manyOptions,
  value: manyOptions.map((o) => o.id),
};

const TooltipStory = (args) => (
  <CardDemo>
    <Tooltip title="Tooltip" place="right">
      <FieldSelect
        {...args}
        readOnly
        adornmentElement={
          <Btn
            style={{
              margin: 0,
              minHeight: 32,
              maxWidth: "inherit",
            }}
            icon="info_outline"
            label="No attributes available"
            labelStyle={{ textAlign: "left" }}
          />
        }
      />
    </Tooltip>
  </CardDemo>
);

export const WrappedToTooltip = TooltipStory.bind({});
