import { IUserMock } from "../../../utils/getUser";
import { IPopoverListItem } from "../../PopoverList";
import { ILabel } from "../Label";

interface IFieldMentions {
  /** Main color */
  color?: string;
  /** If true, the input will autofocused */
  autoFocus?: boolean;
  /** Component CSS classes */
  className?: string;
  /** component CSS style */
  style?: React.CSSProperties;
  /** Component' s label */
  label?: string | ILabel[] | React.ReactElement;
  /** Callback fired on change input */
  onChange?: (value: string, mentions: IUserMock[]) => void;
  /** Component's placeholder */
  placeholder?: string;
  /** If true, the input element is in read only */
  readOnly?: boolean;
  /** Array of users */
  users: IUserMock[];
  /** Component's text value */
  value?: string;
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
}

export default IFieldMentions;
