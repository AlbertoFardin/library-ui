import * as React from "react";
import FieldInput from "./FieldInput";
import Btn from "../../core/Btn";
import { getTheme } from "../../theme";

const FieldPwd = ({
  className,
  style,
  color = getTheme().colors.theme1,
  value,
  label,
  id,
  placeholder,
  required,
  readOnly,
  loading,
  width,
  error,
  tooltipOpen,
  tooltipValue,
  onChange,
  innerChildren,
  inputName,
  autoComplete,
  icon,
  inputRef,
}: {
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  value: string;
  label: string;
  id?: string;
  placeholder?: string;
  required?: boolean;
  readOnly?: boolean;
  loading?: boolean;
  width?: number;
  error?: boolean;
  tooltipOpen?: boolean;
  tooltipValue?: string[];
  onChange: (value: string, id: string, pressEnter: boolean) => void;
  innerChildren?: JSX.Element | React.ReactNode | React.ReactNode[];
  inputName?: string;
  autoComplete?: string;
  icon?: string;
  inputRef?;
}) => {
  const [visibility, setVisibility] = React.useState<boolean>(false);
  const toggleVisibilty = React.useCallback(() => {
    setVisibility(!visibility);
  }, [visibility]);

  return (
    <FieldInput
      className={className}
      style={style}
      color={color}
      error={error}
      id={id}
      tooltipOpen={tooltipOpen}
      tooltipValue={tooltipValue}
      value={value}
      label={label}
      onChange={onChange}
      inputType={visibility ? "text" : "password"}
      placeholder={placeholder}
      required={required}
      readOnly={readOnly}
      loading={loading}
      width={width}
      innerChildren={
        <>
          {innerChildren}
          <Btn
            icon={visibility ? "visibility" : "visibility_off"}
            onClick={toggleVisibilty}
          />
        </>
      }
      inputName={inputName}
      autoComplete={autoComplete}
      icon={icon}
      inputRef={inputRef}
    />
  );
};

export default FieldPwd;
