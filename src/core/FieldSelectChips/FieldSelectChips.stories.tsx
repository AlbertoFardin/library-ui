import * as React from "react";
import { action } from "@storybook/addon-actions";
import FieldSelectChips from "./FieldSelectChips";
import { IFieldSelectChips } from "./interfaces";
import { IMngChipValue, IMngChipGroup } from "../WindowMngSets";
import DemoCmp from "./Demo";

const chipsValues: IMngChipValue[] = [
  {
    id: "1",
    label: "Product",
    groupId: "1",
    mandatory: true,
  },
  {
    id: "2",
    label: "Type",
    groupId: "1",
  },
  {
    id: "3a",
    label: "Start Date",
    groupId: "2",
    mandatory: true,
  },
  {
    id: "3b",
    label: "End Date",
    groupId: "2",
    mandatory: true,
  },
  {
    id: "3",
    label: "Date Online",
    groupId: "2",
  },
  {
    id: "4",
    label: "Detail Code",
    groupId: "3",
  },
  {
    id: "444",
    label: "Description Online",
    groupId: "3",
    mandatory: true,
  },
  {
    id: "5",
    label: "Color",
    groupId: "1",
  },
  {
    id: "6",
    label: "Model Description",
    groupId: "1",
  },
  {
    id: "7",
    label: "Saleline Code",
    groupId: "1",
    mandatory: true,
  },
  {
    id: "8",
    label: "Macro Category",
    groupId: "1",
  },
  {
    id: "9",
    label: "Season",
    groupId: "1",
  },
  {
    id: "10",
    label: "Publish",
    groupId: "1",
  },
  {
    id: "mela",
    label: "mela",
    groupId: "fff",
  },
  {
    id: "banana",
    label: "banana",
    groupId: "fff",
  },
  {
    id: "arancia",
    label: "arancia",
    groupId: "fff",
  },
  {
    id: "pomodoro",
    label: "pomodoro",
    groupId: "fff",
  },
  {
    id: "melanzana",
    label: "melanzana",
    groupId: "fff",
  },
  {
    id: "zucchina",
    label: "zucchina",
    groupId: "fff",
  },
  {
    id: "insalata",
    label: "insalata",
    groupId: "fff",
  },
  {
    id: "radicchio",
    label: "radicchio",
    groupId: "fff",
  },
  {
    id: "uva",
    label: "uva",
    groupId: "fff",
  },
  {
    id: "gatto",
    label: "gatto",
  },
];
const chipsGroups: IMngChipGroup[] = [
  {
    id: "1",
    label: "Grouping",
  },
  {
    id: "2",
    label: "MONITORING",
  },
  {
    id: "3",
    label:
      "Group column with a title label very very long, it should show the tooltip",
  },
  {
    id: "fff",
    label: "Vegetali",
  },
];

export default {
  title: "Core/FieldSelectChips",
  component: FieldSelectChips,
  args: {
    style: { margin: "50px 25px" },
    label: "FieldSelectChips",
    chipsSelected: ["zucchina"],
    chipsValues,
    chipsGroups,
    onChange: action("onChange"),
  } as IFieldSelectChips,
};

const DemoStory = () => <DemoCmp />;
export const Demo = DemoStory.bind({});

const Story = (args) => <FieldSelectChips {...args} />;
export const Default = Story.bind({});

export const NoChipsValues = Story.bind({});
NoChipsValues.args = {
  chipsValues: [],
};

export const NoChipsGroups = Story.bind({});
NoChipsGroups.args = {
  chipsGroups: [],
};
