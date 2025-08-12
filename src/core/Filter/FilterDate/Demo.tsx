import * as React from "react";
import { action } from "@storybook/addon-actions";
import * as moment from "moment";
import FilterDate from "./FilterDate";
import Btn from "../../Btn";
import Text from "../../Text";
import Toolbar from "../../Toolbar";
import { DATE_FORMAT } from "../../../constants";

const FilterDateDemo = () => {
  const [value, setValue] = React.useState<
    | {
        startDate: number;
        endDate: number;
      }
    | undefined
  >(undefined);
  const [collapsed, setCollased] = React.useState(false);
  const [labelSub, setLabelSub] = React.useState(false);
  const onChange = React.useCallback((v) => {
    setValue(v.value);
    action("onChange")(v);
  }, []);
  const onClear = React.useCallback(() => setValue(undefined), []);
  const onSetDate1 = React.useCallback(
    () =>
      setValue({
        startDate: 1705532400000, //Thursday, January 18, 2024 12:00:00 AM GMT+01:00
        endDate: 1705618740000, //Thursday, January 18, 2024 11:59:00 PM GMT+01:00
      }),
    [],
  );
  const onSetDate2 = React.useCallback(
    () =>
      setValue({
        startDate: 1710457200000, //Friday, March 15, 2024 12:00:00 AM GMT+01:00
        endDate: 1710629940000, //Saturday, March 16, 2024 11:59:00 PM GMT+01:00
      }),
    [],
  );
  const onCollased = React.useCallback(
    () => setCollased(!collapsed),
    [collapsed],
  );
  const onLabelSub = React.useCallback(
    () => setLabelSub(!labelSub),
    [labelSub],
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <FilterDate
        value={value}
        onChange={onChange}
        id="facetDate"
        label="facetDate"
        style={{
          border: "1px solid #f00",
          width: 250,
        }}
        dateFormat={DATE_FORMAT}
        collapsed={collapsed}
        collapsedHelp="Please enable to edit"
        labelSub={!labelSub ? undefined : "This is a sub-label"}
      />
      <Toolbar>
        <Text children="startDate:" style={{ marginRight: 15 }} />
        <Text
          style={{ marginRight: 15 }}
          weight="bolder"
          children={
            !!value?.startDate
              ? moment(value.startDate).format(DATE_FORMAT)
              : "undefined"
          }
        />
        <Text
          style={{ marginRight: 15 }}
          weight="bolder"
          children={!!value?.startDate ? "" + value.startDate : "undefined"}
        />
      </Toolbar>
      <Toolbar>
        <Text children="endDate:" style={{ marginRight: 15 }} />
        <Text
          style={{ marginRight: 15 }}
          weight="bolder"
          children={
            !!value?.endDate
              ? moment(value.endDate).format(DATE_FORMAT)
              : "undefined"
          }
        />
        <Text
          style={{ marginRight: 15 }}
          weight="bolder"
          children={!!value?.endDate ? "" + value.endDate : "undefined"}
        />
      </Toolbar>
      <Btn variant="bold" label="Clear input" onClick={onClear} />
      <Btn variant="bold" label="Set Date1" onClick={onSetDate1} />
      <Btn variant="bold" label="Set Date2" onClick={onSetDate2} />
      <Btn
        variant="bold"
        label={"disabeld: " + String(collapsed)}
        onClick={onCollased}
      />
      <Btn
        variant="bold"
        label={"labelSub: " + String(labelSub)}
        onClick={onLabelSub}
      />
    </div>
  );
};

export default FilterDateDemo;
