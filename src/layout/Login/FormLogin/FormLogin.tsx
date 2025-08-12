import * as React from "react";
import { IResLogin, useStylesForm, WIDTH_INPUT } from "../utils";
import { ACTION, reducerInitState, reducer } from "./reducer";
import FieldInput from "../FieldInput";
import Button from "../Button";
import { getTheme } from "../../../theme";
import { Initialize } from "../../../interfaces";
import Btn from "../../../core/Btn";
import MessageError, { getErrors } from "../MessageError";
import isValidEmail from "../../../utils/isValidEmail";
import { ERROR_EMAIL } from "../../../constants";
import inLoading from "../../../utils/inLoading";
import FieldPwd from "../FieldPwd";

export interface IFormLogin {
  header?: JSX.Element | React.ReactNode;
  onRequest: (p: {
    tenantId: string;
    username: string;
    password: string;
  }) => Promise<IResLogin>;
  hiddenTenant?: boolean;
  hiddenRegistration?: boolean;
  hiddenForgotPassword?: boolean;
  onClickRegistration: () => void;
  onClickForgotPassword: () => void;
}

const FormLogin = ({
  header,
  onRequest,
  hiddenTenant,
  hiddenRegistration,
  hiddenForgotPassword,
  onClickRegistration,
  onClickForgotPassword,
}: IFormLogin) => {
  const classes = useStylesForm();
  const [state, dispatch] = React.useReducer(reducer, reducerInitState);
  const { errors, init, tenantId, username, password } = state;

  const onConfirm = React.useCallback(() => {
    dispatch({ type: ACTION.INIT_START });
  }, []);
  const onEnter = React.useCallback(() => {
    onConfirm();
    document.documentElement.blur();
  }, [onConfirm]);
  const onChangeTent = React.useCallback(
    (value: string, _, pressEnter: boolean) => {
      dispatch({ type: ACTION.TENANT, value });
      if (pressEnter) onEnter();
    },
    [onEnter],
  );
  const onChangeUser = React.useCallback(
    (value: string, _, pressEnter: boolean) => {
      dispatch({ type: ACTION.USERNAME, value });
      if (pressEnter) onEnter();
    },
    [onEnter],
  );
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
          const { success, message } = await onRequest({
            tenantId,
            username,
            password,
          });
          if (!success) throw message;
        } catch (err) {
          const errors = await getErrors(err);
          dispatch({ type: ACTION.INIT_FAIL, errors });
        }
      }
    })();
  }, [init, onRequest, password, tenantId, username]);

  const errorEmail = !!username && !isValidEmail(username) ? ERROR_EMAIL : "";
  const allfilled =
    (hiddenTenant || !!tenantId) && !!password && !!username && !errorEmail;

  return (
    <form className={classes.form}>
      <div style={{ flex: 1 }} />
      {header}
      {hiddenTenant ? null : (
        <FieldInput
          autoComplete="organization"
          inputType="text"
          inputName="organization"
          icon="domain"
          label="Company"
          value={tenantId}
          onChange={onChangeTent}
          readOnly={loading}
          error={init === Initialize.FAIL}
        />
      )}
      <FieldInput
        autoComplete="username email"
        inputType="text"
        inputName="username"
        icon="person"
        label="Email"
        value={username}
        onChange={onChangeUser}
        readOnly={loading}
        error={init === Initialize.FAIL}
        tooltipOpen={!!errorEmail}
        tooltipValue={[errorEmail]}
      />
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
      <div style={{ display: "flex", width: WIDTH_INPUT }}>
        {hiddenForgotPassword ? null : (
          <Btn
            style={{ margin: 0 }}
            label="Forgotten credentials?"
            onClick={onClickForgotPassword}
          />
        )}
        <div style={{ flex: 1 }} />
        {hiddenRegistration ? null : (
          <Btn
            style={{ margin: 0 }}
            labelStyle={{ color: getTheme().colors.theme1 }}
            label="REGISTER"
            onClick={onClickRegistration}
          />
        )}
      </div>
      <div style={{ flex: 1 }} />
    </form>
  );
};

export default FormLogin;
