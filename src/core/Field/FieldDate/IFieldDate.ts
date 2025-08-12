import * as React from "react";
import { ILabel } from "../Label";
import { IPopoverListItem } from "../../PopoverList";

interface IFieldDate {
  /** Main color */
  color?: string;
  /** component CSS classes */
  className?: string;
  /** date format passed to [moment.format()](https://momentjs.com/docs/#/displaying/format/) function*/
  dateFormat?: string;
  /** Label of the component. It must be a string or an ILabel[] */
  label?: string | ILabel[];
  /** Icon render in InputAdornment position START */
  adornmentIcon?: string;
  /** adornmentIcon's tooltip  */
  adornmentIconTooltip?: string | string[];
  /** adornmentIcon's color  */
  adornmentIconColor?: string;
  /** Avatar render in InputAdornment position START */
  adornmentAvatar?: string;
  /** adornmentAvatar's text */
  adornmentAvatarText?: string;
  /** adornmentAvatar's icon */
  adornmentAvatarIcon?: string;
  /** adornmentAvatar's tooltip */
  adornmentAvatarTooltip?: string | string[];
  /** Elements render in InputAdornment position START */
  adornmentElement?: JSX.Element;
  /** BtnMenu actions configs, if empty Btn isn't render */
  menu?: IPopoverListItem[];
  /** BtnMenu always visible */
  menuVisibled?: boolean;
  /** BtnMenu disable */
  menuDisabled?: boolean;
  /** BtnMenu visible on mouse hover */
  menuOnHover?: boolean;
  /** BtnMenu callback on close menu */
  menuOnClose?: () => void;
  /** Callback fired when the value is changed */
  onChange?: (n: number | null) => void;
  /** The short hint displayed in the input before the user enters a value */
  placeholder?: string;
  /** If true, the input element is in read only */
  readOnly?: boolean;
  /** component CSS style */
  style?: React.CSSProperties;
  /** Timestamp of date render in input element */
  value?: number | string;
  /** Dropdown from year */
  fromYear?: number;
  /** Dropdown to year */
  toYear?: number;
}

export default IFieldDate;
