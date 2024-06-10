import { ILabel } from "../Label";
import { IPopoverListItem } from "../../PopoverList";

interface IFieldRichEditor {
  /** Main color */
  color?: string;
  /** Icon render in InputAdornment position START */
  adornmentIcon?: string;
  /** adornmentIcon's tooltip  */
  adornmentIconTooltip?: string;
  /** adornmentIcon's color  */
  adornmentIconColor?: string;
  /** Avatar render in InputAdornment position START */
  adornmentAvatar?: string;
  /** adornmentAvatar's tooltip */
  adornmentAvatarTooltip?: string;
  /** Elements render in InputAdornment position START */
  adornmentElement?: JSX.Element;
  /** Label of the component. It must be a string or an ILabel[] */
  label?: string | ILabel[] | React.ReactElement;
  /** Label of the editor modal */
  labelModal?: string;
  /** component CSS style */
  style?: React.CSSProperties;
  /** component CSS classes */
  className?: string;
  /** The value of the input element */
  value?: string;
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
  /** Callback fired when the value is changed (*different* from *defaultValue*) */
  onChange?: (s: string) => void;
  /** If true, the input element is in read only */
  readOnly?: boolean;
  /** The short hint displayed in the input before the user enters a value */
  placeholder?: string;
  /** The short hint displayed in the input if the field is disabled */
  placeholderDisabled?: string;
}

export default IFieldRichEditor;
