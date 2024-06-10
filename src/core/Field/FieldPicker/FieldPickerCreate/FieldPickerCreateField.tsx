import * as React from "react";
import { createUseStyles } from "react-jss";
import { FieldText } from "../../../Field";
import { IFieldPickerCreateProp } from "../IFieldPicker";

const useStyles = createUseStyles({
  field: {
    position: "relative",
    flex: 1,
    margin: "30px 15px 0",
  },
});

interface IFieldPickerCreateField extends IFieldPickerCreateProp {
  color: string;
  onChange: (id: string, value: string) => void;
}

const FieldPickerCreateField = ({
  color,
  id,
  text,
  icon,
  required,
  onChange,
}: IFieldPickerCreateField) => {
  const classes = useStyles({});
  const cbOnChange = React.useCallback(
    (newValue: string) => {
      onChange(id, newValue);
    },
    [id, onChange],
  );

  return (
    <FieldText
      className={classes.field}
      color={color}
      label={[
        {
          required,
          label: text,
          positionX: "left",
          positionY: "top",
        },
      ]}
      adornmentIcon={icon}
      onChange={cbOnChange}
    />
  );
};

export default FieldPickerCreateField;
