import SetCount, { ISetCount } from ".";
import { IChip } from "../../core/Chip";

export default {
  title: "layout/SetCount",
  component: SetCount,
};

const Story = (p: ISetCount) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "inherit",
        margin: 50,
      }}
    >
      <div style={{ display: "flex", flex: 1 }}></div>
      <div style={{ display: "flex", flex: 1 }}>
        <SetCount {...p} />
      </div>
    </div>
  );
};

export const Default = Story.bind({});

export const NoChips = Story.bind({});
NoChips.args = {
  chipValues: [],
};

export const With199Chips = Story.bind({});
With199Chips.args = {
  color: "#007bff",
  chips: Array.from({ length: 199 }, (_, i) => ({
    id: `chip-${i + 1}`,
    label: `Item ${i + 1}`,
  })) as IChip[],
};

export const CustomCopy = Story.bind({});
CustomCopy.args = {
  color: "#28a745",
  chips: Array.from({ length: 5 }, (_, i) => ({
    id: `custom-${i + 1}`,
    label: `Custom ${i + 1}`,
  })) as IChip[],
  copy: {
    title: "Custom Selection",
    placeholderLabel: "No elements chosen yet",
    placeholderIcon: "priority_high",
  },
};

export const NoChipsCustomCopy = Story.bind({});
NoChipsCustomCopy.args = {
  color: "red",
  copy: {
    title: "Custom Selection",
    placeholderLabel: "No elements chosen yet",
    placeholderIcon: "priority_high",
  },
};
