import * as React from "react";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import FieldText from "../../core/Field/FieldText";
import { WIDTH_INPUT } from "./utils";
import Tooltip from "../../core/Tooltip";
import { getTheme } from "../../theme";
import TextLoading from "../../core/TextLoading";

interface IStyles {
  width?: number;
}

const useStyles = createUseStyles({
  field: {
    width: ({ width }: IStyles) => width || "100%",
  },
  fieldError: {
    borderColor: getTheme().colors.msgFail,
  },
});

const FieldInput = ({
  className,
  style,
  color = getTheme().colors.theme1,
  id,
  icon,
  label,
  onChange,
  inputType,
  inputName,
  autoComplete,
  value,
  readOnly,
  tooltipPlace = "right",
  tooltipValue = [],
  tooltipOpen = false,
  error,
  required,
  placeholder,
  width = WIDTH_INPUT,
  innerChildren,
  loading,
  inputRef,
}: {
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  id?: string;
  icon?: string;
  label: string;
  onChange: (value: string, id: string, pressEnter: boolean) => void;
  inputType?: string;
  inputName?: string;
  autoComplete?: string;
  value: string;
  readOnly?: boolean;
  tooltipPlace?: "right" | "left";
  tooltipValue?: string[];
  tooltipOpen?: boolean;
  error?: boolean;
  required?: boolean;
  placeholder?: string;
  width?: number;
  innerChildren?: JSX.Element | React.ReactNode | React.ReactNode[];
  loading?: boolean;
  inputRef?;
}) => {
  const classes = useStyles({ width });
  const onFieldKeyPress = React.useCallback(
    (key: string, value: string) => {
      if (key === "Enter") {
        onChange(value, id, true);
      }
    },
    [id, onChange],
  );
  const onFieldChange = React.useCallback(
    (value: string) => {
      onChange(value, id, false);
    },
    [id, onChange],
  );

  return (
    <Tooltip place={tooltipPlace} title={tooltipValue} open={tooltipOpen}>
      <FieldText
        style={style}
        className={classnames({
          [classes.field]: true,
          [classes.fieldError]: error,
          [className]: !!className,
        })}
        color={color}
        label={[
          {
            text: label,
            textMandatory: required,
            positionX: "left",
            positionY: "top",
          },
        ]}
        value={value}
        onChange={onFieldChange}
        inputType={inputType}
        inputName={inputName}
        autoComplete={autoComplete}
        adornmentIcon={icon}
        onKeyPress={onFieldKeyPress}
        readOnly={readOnly}
        placeholder={placeholder ?? label}
        innerChildren={innerChildren}
        adornmentElement={loading && <TextLoading />}
        inputRef={inputRef}
      />
    </Tooltip>
  );
};

export default FieldInput;
