import * as React from "react";
import isEmpty from "lodash-es/isEmpty";
import { getTheme } from "../../../../theme";
import Popover, { PopoverOrigin } from "../../../Popover";
import Text from "../../../Text";
import Btn from "../../../Btn";
import Divider from "../../../Divider";
import Toolbar from "../../../Toolbar";
import {
  IFieldData,
  IFieldItem,
  IFieldPickerDialogField,
} from "../IFieldPicker";
import IconHelp from "../../../IconHelp";
import FieldPickerDialogField from "./FieldPickerDialogField";

const originAnchor: PopoverOrigin = {
  vertical: "auto",
  horizontal: "auto",
};
const originTransf: PopoverOrigin = {
  vertical: "auto",
  horizontal: "auto",
};
const getErrorMap = (
  item: IFieldItem,
  fields: IFieldPickerDialogField[],
  items: IFieldItem[],
): { [k: string]: string | string[] } => {
  if (!item) return undefined;
  const errorMap = {};
  fields.forEach(({ id, text, singular }) => {
    if (singular) {
      const value = item?.[id];
      const someWithSameValue = items
        .filter((i) => i.id != item.id)
        .some((i) => i[id] === value);
      if (someWithSameValue) {
        errorMap[id] = [
          "It is not possible to bind this value.",
          `There is another element in list with the same ${text}`,
        ];
      }
    }
  });
  return Object.keys(errorMap).length > 0 ? errorMap : undefined;
};
const checkMissRequired = (
  item: IFieldItem,
  fields: IFieldPickerDialogField[],
): boolean => {
  return fields.filter((p) => p.mandatory).some((p) => isEmpty(item?.[p.id]));
};

interface IFieldPickerDialog {
  anchorEl: string;
  color: string;
  open: boolean;
  width: number;
  index: number;
  onCancel: () => void;
  onAccept: (updateOpt: IFieldData, index: number) => void;
  title: string;
  titleHelp: string | string[];
  fields: IFieldPickerDialogField[];
  itemId?: string;
  items: IFieldItem[];
  applyText?: string;
  zIndex?: number;
}

const FieldPickerDialog = ({
  anchorEl,
  color,
  open,
  width,
  index,
  onCancel,
  onAccept,
  title,
  titleHelp,
  items,
  itemId,
  fields,
  applyText = "APPLY",
  zIndex,
}: IFieldPickerDialog) => {
  const [item, setItem] = React.useState<IFieldItem>(
    items.find((item) => item.id === itemId),
  );

  const cbOnChange = React.useCallback(
    (key: string, value: string) => {
      setItem({
        ...item,
        [key]: value,
      });
    },
    [item],
  );

  const errorMap: { [k: string]: string | string[] } = React.useMemo(
    () => getErrorMap(item, fields, items),
    [item, fields, items],
  );
  const missRequired: boolean = React.useMemo(
    () => checkMissRequired(item, fields),
    [item, fields],
  );

  const cbOnAccept = React.useCallback(() => {
    if (missRequired || !!errorMap) {
      return;
    }
    onAccept(item, index);
  }, [errorMap, index, item, missRequired, onAccept]);

  React.useEffect(() => {
    if (open && !!itemId && item == null) {
      const newItem = items.find((item) => item.id === itemId);
      setItem(newItem);
    }
  }, [items, itemId, setItem, open, item]);

  React.useEffect(() => {
    if (!open) {
      setItem(null);
    }
  }, [item, open]);

  return (
    <Popover
      anchorEl={anchorEl}
      originAnchor={originAnchor}
      originTransf={originTransf}
      open={open}
      onClose={onCancel}
      style={{ width }}
      zIndex={zIndex}
    >
      {!title ? null : (
        <>
          <Toolbar>
            <Text weight="bolder" children={title} />
            <IconHelp tooltip={titleHelp} />
          </Toolbar>
          <Divider />
        </>
      )}
      {fields.map((p) => (
        <FieldPickerDialogField
          key={p.id}
          color={color}
          id={p.id}
          icon={p.icon}
          text={p.text}
          mandatory={p.mandatory}
          disabled={p.disabled}
          onChange={cbOnChange}
          error={!!errorMap ? errorMap[p.id] : undefined}
          value={!!item ? (item[p.id] as string) : undefined}
        />
      ))}
      <Toolbar>
        <div style={{ flex: 1 }} />
        <Btn variant="bold" label="CANCEL" onClick={onCancel} />
        <Btn
          color={getTheme().colors.msgSucc}
          variant="bold"
          label={applyText}
          onClick={cbOnAccept}
          disabled={missRequired || !!errorMap}
          tooltip={missRequired ? "Check required" : undefined}
        />
      </Toolbar>
    </Popover>
  );
};

export default FieldPickerDialog;
