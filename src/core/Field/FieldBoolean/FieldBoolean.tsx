import * as React from "react";
import FieldSelect from "../FieldSelect/FieldSelect";
import { ILabel } from "../Label";
import { IListItem } from "../../ListItem";
import { IPopoverListItem } from "../../PopoverList";

const idY = "idYes";
const idN = "idNo";
const options: IListItem[] = [
  {
    id: idY,
    label: "Yes",
  },
  {
    id: idN,
    label: "No",
  },
];
const getValue = (v: boolean | undefined): string[] => {
  if (v === true) return [idY];
  if (v === false) return [idN];
  return [];
};

export interface IFieldBoolean {
  color?: string;
  value?: boolean;
  onChange?: (value: boolean | undefined) => void;
  //
  style?: React.CSSProperties;
  className?: string;
  classNameMenu?: string;
  getChipLabel?: (item: IListItem) => string;
  adornmentIcon?: string;
  adornmentIconTooltip?: string;
  adornmentIconColor?: string;
  adornmentAvatar?: string;
  adornmentAvatarTooltip?: string;
  adornmentElement?: JSX.Element;
  label?: string | ILabel[] | React.ReactElement;
  loading?: boolean;
  onClick?: () => void;
  onClose?: () => void;
  menu?: IPopoverListItem[];
  menuVisibled?: boolean;
  menuDisabled?: boolean;
  menuOnHover?: boolean;
  menuOnClose?: () => void;
  placeholder?: string;
  readOnly?: boolean;
  autoComplete?: string;
  chipsCanRemove?: boolean;
}

const FieldBoolean = (p: IFieldBoolean) => {
  const { value, onChange } = p;
  const onChangeCb = React.useCallback(
    (slcId: string) => {
      onChange(slcId === undefined ? undefined : slcId === idY);
    },
    [onChange],
  );

  return (
    <FieldSelect
      {...p}
      type="singleselect"
      options={options}
      value={getValue(value)}
      onChange={onChangeCb}
      chipsStyle={{
        width: "-webkit-fill-available",
        marginRight: p.readOnly ? 0 : 35,
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        height: 25,
      }}
    />
  );
};

export default FieldBoolean;
