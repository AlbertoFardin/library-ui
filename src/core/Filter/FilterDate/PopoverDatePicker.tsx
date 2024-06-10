import * as React from "react";
import * as moment from "moment";
import Popover, { PopoverOrigin } from "../../Popover";
import Btn from "../../Btn";
import { getFonts, getTheme } from "../../../theme";
import "react-day-picker/dist/style.css";
import "../../Field/FieldDate/daypicker.css";
import { DayPicker, DateRange } from "react-day-picker";

const originAnchor: PopoverOrigin = {
  vertical: "top",
  horizontal: "right",
};
const originTransf: PopoverOrigin = {
  vertical: "auto",
  horizontal: "left",
};

interface IPopoverDatePicker {
  color: string;
  buttonLabel?: string;
  collapsed: boolean;
  valueFrom?: Date;
  valueTo?: Date;
  onChange: (from?: Date, to?: Date) => void;
  dateFormat: string;
  fromYear: number;
  toYear: number;
}

const PopoverDatePicker = ({
  color,
  buttonLabel = "Select a Date",
  collapsed = false,
  valueFrom = null,
  valueTo = null,
  onChange,
  dateFormat,
  fromYear,
  toYear,
}: IPopoverDatePicker) => {
  const fontFamily = getFonts()[0];
  const valued = !!valueFrom || !!valueTo;
  const startMoment = valueFrom ? moment(valueFrom) : null;
  const endMoment = valueTo ? moment(valueTo) : null;
  const startFormat = startMoment ? startMoment.format(dateFormat) : null;
  const endFormat = endMoment ? endMoment.format(dateFormat) : null;
  const showOneDate = startFormat === endFormat || !endFormat;
  const label =
    !valueFrom && !valueTo
      ? buttonLabel
      : showOneDate
        ? `${startFormat}`
        : `${startFormat} - ${endFormat}`;

  const [pickerStaDate, setPickerStaDate] = React.useState(valueFrom);
  const [pickerEndDate, setPickerEndDate] = React.useState(valueTo);
  const [openPopover, setOpenPopover] = React.useState(false);
  const refBtn = React.useRef(null);

  const onPopoverOpen = React.useCallback(() => {
    setPickerStaDate(valueFrom);
    setPickerEndDate(valueTo);
    setOpenPopover(true);
  }, [valueFrom, valueTo]);

  const onPopoverClose = React.useCallback(() => {
    setOpenPopover(false);
  }, []);

  const onSelect = React.useCallback(
    (range: DateRange) => {
      const newValueFrom = range?.from;
      if (
        newValueFrom &&
        pickerStaDate &&
        newValueFrom.getTime() < pickerStaDate.getTime()
      ) {
        const newValueTo = null;
        setPickerStaDate(newValueFrom);
        setPickerEndDate(newValueTo);
      } else {
        const newValueTo = range?.to;
        setPickerStaDate(newValueFrom);
        setPickerEndDate(newValueTo);
        if (!!newValueTo || typeof newValueFrom === "undefined") {
          onChange(newValueFrom, newValueTo);
          setOpenPopover(false);
        }
      }
    },
    [onChange, pickerStaDate],
  );

  const defaultMonth = !!pickerStaDate
    ? new Date(new Date(pickerStaDate).setDate(1))
    : undefined;

  return (
    <>
      <div
        style={{
          borderRadius: getTheme().borderRadius,
          backgroundColor: getTheme().colors.background,
          border: `1px solid ${getTheme().colors.grayBorder}`,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Btn
          color={color}
          cmpRef={refBtn}
          onClick={onPopoverOpen}
          disabled={collapsed}
          label={label}
          selected={valued}
          style={{
            margin: 0,
            maxWidth: 999,
            flex: 1,
            textAlign: "center",
          }}
        />
      </div>
      <Popover
        open={openPopover}
        onClose={onPopoverClose}
        anchorEl={refBtn.current}
        originAnchor={originAnchor}
        originTransf={originTransf}
      >
        <DayPicker
          style={{
            fontFamily,
            fontSize: 10,
            color: getTheme().colors.typography,
          }}
          mode="range"
          numberOfMonths={2}
          captionLayout="dropdown-buttons"
          fromYear={fromYear}
          toYear={toYear}
          selected={{
            from: pickerStaDate,
            to: pickerEndDate,
          }}
          onSelect={onSelect}
          showOutsideDays
          defaultMonth={defaultMonth}
        />
      </Popover>
    </>
  );
};

export default PopoverDatePicker;
