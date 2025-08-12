import * as React from "react";
import { createUseStyles } from "react-jss";
import Btn from "../../Btn";
import FieldPickerDialog from "./FieldPickerDialog";
import { IFieldData, IFieldItem, IFieldPickerDialog } from "./IFieldPicker";

interface IStyles {
  color: string;
}
const useStyles = createUseStyles({
  btn: {
    marginTop: 5,
    padding: "0 5px",
    margin: "0 5px 5px 5px",
    maxWidth: "none",
  },
  btnLabel: {
    color: ({ color }: IStyles) => color,
  },
});

interface IFieldPickerBtnCreate {
  color: string;
  value: string[];
  items: IFieldItem[];
  dialog: IFieldPickerDialog;
  zIndex?: number;
}

const FieldPickerBtnCreate = ({
  color,
  value,
  items,
  dialog,
  zIndex,
}: IFieldPickerBtnCreate) => {
  const classes = useStyles({ color });
  const buttonRef = React.useRef(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const { enable, onChange, title, titleHelp, fields, applyText } = dialog;
  const onDialogOpen = React.useCallback(() => {
    setDialogOpen(true);
  }, []);
  const onCancel = React.useCallback(() => {
    setDialogOpen(false);
  }, []);
  const onAccept = React.useCallback(
    (newOpt: IFieldData, index: number) => {
      onChange(newOpt, index);
      setDialogOpen(false);
    },
    [onChange],
  );
  const dialogWidth = buttonRef?.current?.clientWidth || 0;

  if (!enable) return null;

  return (
    <>
      <Btn
        color={color}
        className={classes.btn}
        labelClassName={classes.btnLabel}
        cmpRef={buttonRef}
        label="+ Add an option"
        onClick={onDialogOpen}
        selected={dialogOpen}
      />
      {buttonRef?.current && (
        <FieldPickerDialog
          anchorEl={buttonRef.current}
          open={dialogOpen}
          width={dialogWidth}
          onCancel={onCancel}
          onAccept={onAccept}
          title={title}
          titleHelp={titleHelp}
          fields={fields}
          color={color}
          index={value.length}
          items={items}
          applyText={applyText}
          zIndex={zIndex}
        />
      )}
    </>
  );
};

export default FieldPickerBtnCreate;
