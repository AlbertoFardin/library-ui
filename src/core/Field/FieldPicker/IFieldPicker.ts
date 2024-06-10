/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { ILabel } from "../Label";
import { IPopoverListItem } from "../../PopoverList";
import { IListItem } from "../../ListItem";

export interface IFieldPickerCreateProp {
  id: string;
  text: string;
  icon?: string;
  required?: boolean;
}

interface IFieldPicker {
  /** component CSS classes */
  className?: string;
  /** component CSS style */
  style?: React.CSSProperties;
  /** Main color */
  color?: string;
  /** Label of the component. It must be a string or an ILabel[] */
  label?: string | ILabel[] | React.ReactElement;
  /** Icon render in InputAdornment position START */
  adornmentIcon?: string;
  /** adornmentIcon's tooltip  */
  adornmentIconTooltip?: string;
  /** adornmentIcon's color  */
  adornmentIconColor?: string;
  /** Avatar render in InputAdornment position START */
  adornmentAvatar?: string;
  /** adornmentAvatar's text */
  adornmentAvatarText?: string;
  /** adornmentAvatar's icon */
  adornmentAvatarIcon?: string;
  /** adornmentAvatar's tooltip */
  adornmentAvatarTooltip?: string;
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
  /** Callback fired when the selected listitems changed */
  onCreate?: (newOpt) => void;
  /** The short hint displayed in the input before the user enters a value */
  placeholder?: string;
  /** If true, the input element is in read only */
  readOnly?: boolean;
  /** Ids of options selected */
  value?: string[];
  /** List of options showed */
  items?: IListItem[];
  /** If true, list items can be sortable */
  itemsSortable?: boolean;
  /** Function to search items */
  itemsOnSearch?: (inputValue: string, item: IListItem) => boolean;
  /** If true, show button to Create Modal */
  createEnabled?: boolean;
  /** Array of fields in Create Modal */
  createProps?: IFieldPickerCreateProp[];
  /** Title of Create Modal */
  createTitle?: string;
  /** Title help of Create Modal */
  createTitleHelp?: string | string[];
}

export default IFieldPicker;
