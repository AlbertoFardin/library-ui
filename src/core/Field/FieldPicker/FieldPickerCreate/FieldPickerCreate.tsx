import * as React from "react";
import { createUseStyles } from "react-jss";
import Btn from "../../../Btn";
import FieldPickerCreateModal from "./FieldPickerCreateModal";
import { IFieldPickerCreateProp } from "../IFieldPicker";
import { IListItem } from "../../../ListItem";

interface IStyles {
  color: string;
}
const useStyles = createUseStyles({
  btn: {
    padding: "0 5px",
    margin: "0 5px 5px 5px",
    maxWidth: "none",
  },
  btnLabel: {
    color: ({ color }: IStyles) => color,
  },
});

interface IFieldPickerCreate {
  color: string;
  width: number;
  onCreate: (newOpt) => void;
  title: string;
  titleHelp: string | string[];
  props: IFieldPickerCreateProp[];
  items: IListItem[];
}

const FieldPickerCreate = ({
  color,
  width,
  onCreate,
  title,
  titleHelp,
  props,
  items,
}: IFieldPickerCreate) => {
  const classes = useStyles({ color });
  const buttonRef = React.useRef(null);
  const [dropdown, setDropdown] = React.useState(false);
  const onDropdownOpen = React.useCallback(() => {
    setDropdown(true);
  }, []);
  const onDropdownClose = React.useCallback(() => {
    setDropdown(false);
  }, []);
  const onConfirm = React.useCallback(
    (newOpt) => {
      setDropdown(false);
      onCreate(newOpt);
    },
    [onCreate],
  );

  return (
    <>
      <Btn
        color={color}
        className={classes.btn}
        labelClassName={classes.btnLabel}
        cmpRef={buttonRef}
        label="+ Add an option"
        onClick={onDropdownOpen}
        selected={dropdown}
      />
      {!buttonRef?.current ? null : (
        <FieldPickerCreateModal
          anchorEl={buttonRef.current}
          open={dropdown}
          width={width}
          onCancel={onDropdownClose}
          onConfirm={onConfirm}
          title={title}
          titleHelp={titleHelp}
          props={props}
          color={color}
          items={items}
        />
      )}
    </>
  );
};

export default FieldPickerCreate;
