import * as React from "react";
import { ILabel } from "../Label";
import { IPopoverListItem } from "../../PopoverList";
import { IListItem } from "../../ListItem";

interface IFieldSelect {
  /** Main color */
  color?: string;
  /** component CSS style */
  style?: React.CSSProperties;
  /** component CSS classes */
  className?: string;
  /** menu options CSS classes */
  classNameMenu?: string;
  /** Function to render chip  */
  getChipLabel?: (item: IListItem) => string;
  /** chips CSS style */
  chipsStyle?: React.CSSProperties;
  /** chips CSS classes */
  chipsClassName?: string;
  /** chips can be remove */
  chipsCanRemove?: boolean;
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
  /** Type of selection */
  type?: "singleselect" | "multiselect";
  /** Label of the component. It must be a string or an ILabel[] */
  label?: string | ILabel[] | React.ReactElement;
  /** Show loading spinner */
  loading?: boolean;
  /** Callback fired when click input */
  onClick?: () => void;
  /** Callback fired when close menu options */
  onClose?: () => void;
  /** Callback fired when value change */
  onChange?: (slcId: string, slcArray: string[]) => void;
  /** Callback fired when search input */
  onSearch?: (text: string) => void;
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
  /** Array of options */
  options: IListItem[];
  /** Array of string ids of selected options */
  value: string[];
  /** The short hint displayed in the input before the user enters a value */
  placeholder?: string;
  /** If true, the input element is in read only */
  readOnly?: boolean;
  /** If true, the menu options render a search input */
  searchable?: boolean;
}

export default IFieldSelect;
