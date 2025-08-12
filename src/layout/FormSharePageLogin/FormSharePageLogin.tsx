import * as React from "react";
import { IResLogin, useStylesForm } from "../Login/utils";
import { ACTION, reducerInitState, reducer } from "./reducer";
import Button from "../Login/Button";
import { getTheme } from "../../theme";
import { Initialize } from "../../interfaces";
import MessageError, { getErrors } from "../Login/MessageError";
import inLoading from "../../utils/inLoading";
import FieldPwd from "../Login/FieldPwd";

export interface IFormSharePageLogin {
  header?: JSX.Element | React.ReactNode;
  onRequest: (password: string) => Promise<IResLogin>;
}

const FormSharePageLogin = ({ header, onRequest }: IFormSharePageLogin) => {
  const classes = useStylesForm();
  const [state, dispatch] = React.useReducer(reducer, reducerInitState);
  const { errors, init, password } = state;

  const onConfirm = React.useCallback(() => {
    dispatch({ type: ACTION.INIT_START });
  }, []);

  const onEnter = React.useCallback(() => {
    onConfirm();
    document.documentElement.blur();
  }, [onConfirm]);
  const onChangePass = React.useCallback(
    (value: string, _, pressEnter: boolean) => {
      dispatch({ type: ACTION.PASSWORD, value });
      if (pressEnter) onEnter();
    },
    [onEnter],
  );

  const loading = inLoading(init);

  React.useEffect(() => {
    (async () => {
      if (init === Initialize.START) {
        dispatch({ type: ACTION.INIT_LOADING });
        try {
          const { success, message } = await onRequest(password);
          if (!success) throw message;
        } catch (err) {
          const errors = await getErrors(err);
          dispatch({ type: ACTION.INIT_FAIL, errors });
        }
      }
    })();
  }, [init, onRequest, password]);

  const allfilled = !!password;

  return (
    <form className={classes.form}>
      <div style={{ flex: 1 }} />
      {header}
      <FieldPwd
        autoComplete="current-password"
        inputName="password"
        icon="lock"
        label="Password"
        value={password}
        onChange={onChangePass}
        readOnly={loading}
        error={init === Initialize.FAIL}
      />
      <Button
        color={
          init === Initialize.FAIL
            ? getTheme().colors.msgFail
            : getTheme().colors.theme1
        }
        label={loading ? "LOADING" : "LOGIN"}
        disabled={loading || !allfilled}
        onClick={onConfirm}
      />
      <MessageError init={init} messagesFail={errors} messagesSucc={[]} />
      <div style={{ margin: 10 }} />
      <div style={{ flex: 1 }} />
    </form>
  );
};

export default FormSharePageLogin;
