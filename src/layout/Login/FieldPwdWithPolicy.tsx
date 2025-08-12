import * as React from "react";
import {
  defaultPwdPolicy,
  IPwdPolicy,
  IPwdValidationResult,
  validatePassword,
} from "./utils/validatePassword";
import { getPwdTooltip } from "./utils/getPwdTooltip";
import Btn from "../../core/Btn";
import FieldPwd from "./FieldPwd";
import { getTheme } from "../../theme";

export interface IFieldPwdCopy {
  label?: string;
  placeholder?: string;
}

export interface IFieldPwdWithPolicy {
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  pwd: string;
  onChange: (pwd: string, valid: boolean) => void;
  required?: boolean;
  readOnly?: boolean;
  loading?: boolean;
  copy?: IFieldPwdCopy;
  pwdPolicy?: IPwdPolicy;
  width?: number;
  inputRef?;
  onCopyToClipboard?: (password: string) => void;
}

const FieldPwdWithPolicy = ({
  className,
  style,
  color = getTheme().colors.theme1,
  pwd,
  onChange,
  required = true,
  readOnly = false,
  loading,
  copy,
  pwdPolicy = defaultPwdPolicy,
  width,
  inputRef,
  onCopyToClipboard,
}: IFieldPwdWithPolicy) => {
  const [password, setPassword] = React.useState<string>(pwd);
  const [pwdValidationResult, setPwdValidationResult] =
    React.useState<IPwdValidationResult>(
      validatePassword({
        password,
        required,
        pwdPolicy,
      }),
    );
  const handleChange = React.useCallback(
    (pwd: string) => {
      if (pwd !== password) {
        const pwdValidationResult = validatePassword({
          password: pwd,
          required,
          pwdPolicy,
        });
        const valid = pwdValidationResult.valid;
        setPassword(pwd);
        setPwdValidationResult(pwdValidationResult);
        onChange(pwd, valid);
      }
    },
    [onChange, password, pwdPolicy, required],
  );
  const handleCopyToClipboard = React.useCallback(() => {
    if (!!onCopyToClipboard) onCopyToClipboard(password);
  }, [onCopyToClipboard, password]);
  const pwdTooltip = React.useMemo<string[]>(
    () => getPwdTooltip({ pwdPolicy, pwdValidationResult }),
    [pwdPolicy, pwdValidationResult],
  );

  React.useEffect(() => {
    setPassword(pwd);
    setPwdValidationResult(
      validatePassword({
        password: pwd,
        required,
        pwdPolicy,
      }),
    );
  }, [pwd, pwdPolicy, required]);

  return (
    <FieldPwd
      className={className}
      style={style}
      color={color}
      error={!pwdValidationResult.valid}
      tooltipOpen={pwdTooltip.length > 0}
      tooltipValue={pwdTooltip}
      value={password}
      label={copy.label}
      onChange={handleChange}
      placeholder={copy.placeholder}
      required={required}
      readOnly={readOnly}
      loading={loading}
      width={width}
      inputRef={inputRef}
      innerChildren={
        !!password?.length && (
          <Btn
            icon="content_copy"
            onClick={handleCopyToClipboard}
            copyToClipboard={password}
          />
        )
      }
    />
  );
};
export default FieldPwdWithPolicy;
