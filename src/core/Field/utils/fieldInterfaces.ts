import { ILabel } from "../Label";
import { IPopoverListItem } from "../../PopoverList";
import { IReducerState } from "./reducer";

export interface IFieldColor {
  /** Main color */
  color?: string;
}
export interface IAdornmentAvatar {
  /** Avatar render in InputAdornment position START */
  adornmentAvatar?: string;
  /** adornmentAvatar's text */
  adornmentAvatarText?: string;
  /** adornmentAvatar's icon */
  adornmentAvatarIcon?: string;
  /** adornmentAvatar's tooltip */
  adornmentAvatarTooltip?: string | string[];
}

export interface IAdornmentIcon {
  /** Icon render in InputAdornment position START */
  adornmentIcon?: string;
  /** adornmentIcon's tooltip  */
  adornmentIconTooltip?: string | string[];
  /** adornmentIcon's color  */
  adornmentIconColor?: string;
}

export interface IAdornmentMenu {
  /** If true, the input element is in read only */
  readOnly?: boolean;
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
}

export interface IEditableField {
  /** If true, the input element is in read only */
  readOnly?: boolean;
  /** Callback fired when the value is changed (*different* from *defaultValue*) */
  onChange?: (s: string) => void;
}

export interface IModalField {
  labelModal?: string;
  modalEnabled?: boolean;
  modalContentClassName?: string;
  modalSuggestion?: string;
}

export interface IDecoratedField
  extends IFieldColor,
    IEditableField,
    IAdornmentMenu,
    IAdornmentAvatar,
    IAdornmentIcon {
  /** The value of the input element */
  value?: string;
  /** Label of the component. It must be a string or an ILabel[] */
  label?: string | ILabel[];
  /** component CSS classes */
  className?: string;
  /** component CSS style */
  style?: React.CSSProperties;
  /** Elements render in InputAdornment position START */
  adornmentElement?: JSX.Element;
  /** The short hint displayed in the input before the user enters a value */
  placeholder?: string;
  /** The short hint displayed in the input if the field is disabled */
  placeholderDisabled?: string;
  reducerInitState?: IReducerState;
  /** Callback on mouse over */
  onMouseOver?: () => void;
  /** Callback on mouse leave */
  onMouseLeave?: () => void;
}
