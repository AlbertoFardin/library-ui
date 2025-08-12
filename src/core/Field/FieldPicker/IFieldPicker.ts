/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { ILabel } from "../Label";
import { IPopoverListItem } from "../../PopoverList";
import { IListItem } from "../../ListItem";

export interface IFieldItem extends IListItem, IFieldData {}
export interface IFieldData {
  id: string;
  [key: string]: unknown;
}
export interface IFieldPickerDialogField {
  id: string;
  icon?: string;
  text: string;
  mandatory?: boolean;
  disabled?: boolean;
  singular?: boolean;
}

export interface IFieldPickerDialog {
  /** If true, show button to open the dialog */
  enable: boolean;
  /** Array of fields render in the dialog */
  fields: IFieldPickerDialogField[];
  /** Title of the dialog */
  title?: string;
  /** Title help of the dialog */
  titleHelp?: string | string[];
  /** Label of apply button of the dialog */
  applyText?: string;
  /** Callback fired click the apply button */
  onChange: (newOpt: IFieldData, index: number) => void;
}

interface IFieldPicker {
  /** component CSS classes */
  className?: string;
  /** component CSS style */
  style?: React.CSSProperties;
  /** Main color */
  color?: string;
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
  /** Callback fired when the selected listitems changed */
  onChange?: (newValue: string[]) => void;
  /** The short hint displayed in the input before the user enters a value */
  placeholder?: string;
  /** If true, the input element is in read only */
  readOnly?: boolean;
  /** Ids of options selected */
  value?: string[];
  /** List of options showed */
  items?: IListItem[];
  /** If false, list items can not be sortable */
  itemsSortable?: boolean;
  /** If false, search input is not visible */
  itemsSearchable?: boolean;
  /** Array of key to search */
  itemsSearchKeys?: string[];
  /** Props to render dialog to create a new item */
  dialogToCreate?: IFieldPickerDialog;
  /** Props to render dialog to edit an item */
  dialogToModify?: IFieldPickerDialog;
  /** zIndex for search, create and modify dialog boxes  */
  zIndex?: number;
}

export default IFieldPicker;
