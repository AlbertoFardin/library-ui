import * as React from "react";
import Btn from "../../Btn";
import { IFieldData, IFieldItem, IFieldPickerDialog } from "./IFieldPicker";
import FieldPickerDialog from "./FieldPickerDialog";

interface IFieldPickerBtnModify extends IFieldPickerDialog {
  color: string;
  index: number;
  items: IFieldItem[];
  itemId: string;
  dialogWidth: number;
  zIndex?: number;
  onDialogClose?: () => void;
}
const FieldPickerBtnModify = ({
  color,
  index,
  items,
  itemId,
  dialogWidth,
  zIndex,
  enable,
  fields,
  title,
  titleHelp,
  onChange,
  onDialogClose,
  applyText,
}: IFieldPickerBtnModify) => {
  const buttonRef = React.useRef(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const onDialogOpen = React.useCallback(() => {
    setDialogOpen(true);
  }, []);
  const onCancel = React.useCallback(() => {
    setDialogOpen(false);
    onDialogClose();
  }, [onDialogClose]);
  const onAccept = React.useCallback(
    (updatedOpt: IFieldData, index: number) => {
      onChange(updatedOpt, index);
      setDialogOpen(false);
      onDialogClose();
    },
    [onChange, onDialogClose],
  );

  if (!enable) return null;

  return (
    <>
      <Btn
        cmpRef={buttonRef}
        color={color}
        icon="edit"
        onClick={onDialogOpen}
        selected={dialogOpen}
      />
      {buttonRef?.current && (
        <FieldPickerDialog
          anchorEl={buttonRef.current}
          color={color}
          open={dialogOpen}
          width={dialogWidth}
          index={index}
          onCancel={onCancel}
          onAccept={onAccept}
          title={title}
          titleHelp={titleHelp}
          items={items}
          itemId={itemId}
          fields={fields}
          applyText={applyText}
          zIndex={zIndex}
        />
      )}
    </>
  );
};

export default FieldPickerBtnModify;
