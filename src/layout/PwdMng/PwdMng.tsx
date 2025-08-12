import * as React from "react";
import { createUseStyles } from "react-jss";
import classNames from "classnames";
import Text from "../../core/Text";
import { IPwdMng, DEFAULT_COPY, DEFAULT_VALUE } from "./";
import FieldPwdWithPolicy from "../Login/FieldPwdWithPolicy";
import { getTheme } from "../../theme";
import DeleteBtn from "./DeleteBtn";
import Btn from "../../core/Btn";

const useStyles = createUseStyles({
  panel: {
    display: "flex",
    flexDirection: "column",
  },
  inputLine: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  pwd1: {
    flex: 1,
    margin: "5px 0",
    "& > div": {
      flex: 1,
      display: "flex",
    },
  },
  pwd2: {
    flex: 1,
    width: "inherit",
    margin: 0,
  },
  btn1: {
    marginLeft: 5,
    width: 170,
    display: "flex",
    flexDirection: "row",
  },
  btn2: {
    transition: "none",
    flex: 1,
    textAlign: "center",
    margin: 0,
    "&:not(:last-child)": {
      marginRight: 5,
    },
  },
});

const PwdMng = ({
  color = getTheme().colors.theme1,
  className,
  style,
  value = DEFAULT_VALUE,
  onChange,
  onCopyToClipboard,
  required,
  copy = DEFAULT_COPY,
  policy,
  readOnly: readProp,
  loading,
}: IPwdMng) => {
  const classes = useStyles({});
  const inputRef = React.useRef(null);
  const [draft, setDraft] = React.useState<string>(value);
  const [valid, setValid] = React.useState<boolean>(null);
  const [inEditing, setInEditing] = React.useState<boolean>(false);
  const readOnly = readProp || loading;

  const handleChange = React.useCallback(
    (password: string, valid: boolean) => {
      setDraft(password);
      setValid(valid && password.length > 0 && value != password);
    },
    [value],
  );
  const handleSetBtn = React.useCallback(() => {
    setInEditing(false);
    onChange(draft);
  }, [onChange, draft]);
  const handleDeleteBtn = React.useCallback(() => {
    setInEditing(false);
    onChange(DEFAULT_VALUE);
  }, [onChange]);
  const handleCancelBtn = React.useCallback(() => {
    setDraft(value);
    setValid(null);
    setInEditing(false);
  }, [value]);
  const handleModifyBtn = React.useCallback(async () => {
    setInEditing(true);
    // delay perché non posso essere in focus su un input in readonly
    await new Promise((resolve) => setTimeout(resolve, 50));
    inputRef.current.focus();
  }, []);
  const passwordUnset = !value;

  React.useEffect(() => {
    setDraft(value);
    setValid(null);
  }, [value]);

  return (
    <div
      className={classNames({
        [classes.panel]: true,
        [className]: !!className,
      })}
      style={style}
    >
      <Text weight="bolder" children={copy.title} />
      <Text children={copy.description} />
      <div className={classes.inputLine}>
        <div className={classes.pwd1}>
          <FieldPwdWithPolicy
            className={classes.pwd2}
            pwd={draft}
            color={color}
            required={required}
            copy={{ placeholder: copy.placeholder }}
            onChange={handleChange}
            onCopyToClipboard={onCopyToClipboard}
            pwdPolicy={policy}
            readOnly={readOnly || (!!value && !inEditing)}
            loading={loading}
            inputRef={inputRef}
          />
        </div>
        {readOnly ? null : (
          <div className={classes.btn1}>
            {passwordUnset ? (
              <Btn
                className={classes.btn2}
                variant="bold"
                label={copy.btnSetPwd}
                onClick={handleSetBtn}
                color={getTheme().colors.msgInfo}
                disabled={readOnly || !valid}
              />
            ) : inEditing ? (
              <>
                <Btn
                  className={classes.btn2}
                  variant="bold"
                  label={copy.btnUpdate}
                  onClick={handleSetBtn}
                  color={getTheme().colors.msgWarn}
                  disabled={readOnly || !valid}
                />
                <Btn
                  className={classes.btn2}
                  variant="bold"
                  label={copy.btnCancel}
                  onClick={handleCancelBtn}
                />
              </>
            ) : (
              <>
                <Btn
                  className={classes.btn2}
                  variant="bold"
                  label={copy.btnModify}
                  onClick={handleModifyBtn}
                  color={color}
                  disabled={readOnly}
                />
                <DeleteBtn
                  className={classes.btn2}
                  disabled={readOnly}
                  copy={copy.modalDelete}
                  onDelete={handleDeleteBtn}
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default PwdMng;
