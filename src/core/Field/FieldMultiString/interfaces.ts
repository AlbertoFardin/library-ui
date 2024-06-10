import * as React from "react";
import { ILabel } from "../Label";
import { IPopoverListItem } from "../../PopoverList";

export interface IFieldMultiStringItem {
  id: string;
  label: string;
}

export interface IFieldMultiStringRenderChip {
  id: string;
  label: string;
  readOnly: boolean;
  onClick: (id: string) => void;
}

export interface IFieldMultiString {
  /** Main color */
  color?: string;
  /** component CSS classes */
  className?: string;
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
  /** Function to return the component to render as chips */
  renderChip?: (
    r: IFieldMultiStringRenderChip,
  ) => JSX.Element | React.ReactNode;
  /** Type of selection */
  type?: "singleselect" | "multiselect";
  /** Label of the component. It must be a string or an ILabel[] */
  label?: string | ILabel[] | React.ReactElement;
  /** Callback fired when value change */
  onChange?: (
    item: IFieldMultiStringItem,
    array: IFieldMultiStringItem[],
  ) => void;
  /** Callback fired when input click */
  onClick?: () => void;
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
  /** The short hint displayed in the input before the user enters a value */
  placeholder?: string;
  /** If true, the input element is in read only */
  readOnly?: boolean;
  /** If true, the inner text input element is in read only */
  readOnlyInput?: boolean;
  /** component CSS style */
  style?: React.CSSProperties;
  /** Array of item to render inside the input */
  value?: IFieldMultiStringItem[];
  /** Separator between multi strings */
  separator?: string;
}

export default IFieldMultiString;
