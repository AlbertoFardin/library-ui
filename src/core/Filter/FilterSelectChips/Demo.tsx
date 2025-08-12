import * as React from "react";
import FilterSelectChips from ".";
import InputText from "../../../stories/InputText";
import InputBoolean from "../../../stories/InputBoolean";
import CardDemo from "../../../stories/CardDemo";
import { IMngChipGroup, IMngChipValue } from "../../../layout/WindowMngSets";

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

const DemoFieldText = () => {
  const [chipsSelected, setChipsSelected] = React.useState([] as string[]);
  const [showFilterMandatory, setShowFilterMandatory] = React.useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "row", height: "inherit" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <FilterSelectChips
          color="#f00"
          style={{ maxWidth: 300, border: "1px solid #f00" }}
          label="FieldSelectChips"
          chipsSelected={chipsSelected}
          chipsValues={chipsValues}
          chipsGroups={chipsGroups}
          onChange={setChipsSelected}
          showFilterMandatory={showFilterMandatory}
        />
      </div>
      <CardDemo>
        <InputText label="value" value={JSON.stringify(chipsSelected)} />
        <InputBoolean
          label="visibledFilterMandatory"
          value={showFilterMandatory}
          onChange={setShowFilterMandatory}
        />
      </CardDemo>
    </div>
  );
};

export default DemoFieldText;
