import * as React from "react";
import { createUseStyles } from "react-jss";
import FieldText from "../../FieldText";
import { getTheme } from "../../../../theme";

const useStyles = createUseStyles({
  field: {
    position: "relative",
    flex: 1,
    margin: "30px 15px 0",
  },
});

interface IDialogField {
  color: string;
  id: string;
  icon: string;
  text: string;
  mandatory: boolean;
  disabled: boolean;
  onChange: (id: string, value: string) => void;
  error?: string | string[];
  value?: string;
}

const DialogField = ({
  color,
  id,
  icon,
  text,
  mandatory,
  disabled,
  onChange,
  error,
  value,
}: IDialogField) => {
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
          textMandatory: mandatory,
          text,
          positionX: "left",
          positionY: "top",
        },
      ]}
      adornmentIcon={!error ? icon : "warning"}
      adornmentIconTooltip={!error ? undefined : error}
      adornmentIconColor={!error ? undefined : getTheme().colors.msgFail}
      onChange={cbOnChange}
      readOnly={disabled}
      value={value}
    />
  );
};

export default DialogField;
