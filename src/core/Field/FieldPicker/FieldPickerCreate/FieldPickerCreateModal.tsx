import * as React from "react";
import { getTheme } from "../../../../theme";
import Popover from "../../../Popover";
import Text from "../../../Text";
import Btn from "../../../Btn";
import Divider from "../../../Divider";
import Toolbar from "../../../Toolbar";
import { IFieldPickerCreateProp } from "../IFieldPicker";
import IconHelp from "../../../IconHelp";
import isEmpty from "lodash-es/isEmpty";
import FieldPickerCreateField from "./FieldPickerCreateField";
import { IListItem } from "../../../ListItem";

interface ICheckSameId {
  newItem;
  props: IFieldPickerCreateProp[];
  items: IListItem[];
}
const checkSameId = ({ newItem, props, items }: ICheckSameId): boolean => {
  if (items.length === 0) return false;
  const propId = props.find((p) => p.id === "id");
  if (!propId) return false;
  const newItemId = newItem["id"];
  return items.some((i) => i.id === newItemId);
};

interface ICheckMissRequired {
  newItem;
  props: IFieldPickerCreateProp[];
}
const checkMissRequired = ({ newItem, props }: ICheckMissRequired) => {
  return props.filter((p) => p.required).some((p) => isEmpty(newItem[p.id]));
};

interface IFieldPickerCreateModal {
  color: string;
  anchorEl;
  open: boolean;
  width: number;
  onCancel: () => void;
  onConfirm: (newOpt) => void;
  title: string;
  titleHelp: string | string[];
  props: IFieldPickerCreateProp[];
  items: IListItem[];
}

const FieldPickerCreateModal = ({
  color,
  anchorEl,
  open,
  width,
  onCancel,
  onConfirm,
  title,
  titleHelp,
  props,
  items,
}: IFieldPickerCreateModal) => {
  const [newItem, setNewItem] = React.useState({});
  const cbOnChange = React.useCallback(
    (key: string, value: string) => {
      setNewItem({
        ...newItem,
        [key]: value,
      });
    },
    [newItem],
  );
  const cbOnConfirm = React.useCallback(() => {
    onConfirm(newItem);
  }, [newItem, onConfirm]);
  const sameId = checkSameId({
    newItem,
    props,
    items,
  });
  const disabled =
    props.length === 0 ||
    sameId ||
    checkMissRequired({
      newItem,
      props,
    });

  React.useEffect(() => {
    if (!open && !isEmpty(newItem)) {
      setNewItem({});
    }
  }, [newItem, open]);

  return (
    <Popover
      anchorEl={anchorEl}
      originAnchor={{
        vertical: "auto",
        horizontal: "left",
      }}
      originTransf={{
        vertical: "auto",
        horizontal: "left",
      }}
      open={open}
      onClose={onCancel}
      style={{ width }}
    >
      <Toolbar>
        <Text weight="bolder" children={title || "Add an option"} />
        <IconHelp tooltip={titleHelp} />
      </Toolbar>
      <Divider />
      {props.map((p) => (
        <FieldPickerCreateField
          {...p}
          key={p.id}
          color={color}
          onChange={cbOnChange}
        />
      ))}
      {props.length > 0 ? null : (
        <Text
          style={{
            padding: 15,
            color: getTheme().colors.disable,
            fontStyle: "italic",
          }}
          children="No fields configured"
        />
      )}
      <Toolbar>
        {!sameId ? null : (
          <Text
            style={{ color: getTheme().colors.msgFail }}
            children="id already exists"
          />
        )}
        <div style={{ flex: 1 }} />
        <Btn variant="bold" label="CANCEL" onClick={onCancel} />
        <Btn
          color={getTheme().colors.msgSucc}
          variant="bold"
          label="CREATE"
          onClick={cbOnConfirm}
          disabled={disabled}
        />
      </Toolbar>
    </Popover>
  );
};

export default FieldPickerCreateModal;
