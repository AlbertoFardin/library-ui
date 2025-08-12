import * as React from "react";
import { FORM, FORM_TITLE, IResLogin, useStylesForm } from "../utils";
import { ACTION, reducerInitState, reducer } from "./reducer";
import { getTheme } from "../../../theme";
import Text from "../../../core/Text";
import Btn from "../../../core/Btn";
import FieldInput from "../FieldInput";
import { Initialize } from "../../../interfaces";
import Button from "../Button";
import Toolbar from "../../../core/Toolbar";
import MessageError, { getErrors } from "../MessageError";
import isValidEmail from "../../../utils/isValidEmail";
import { ERROR_EMAIL } from "../../../constants";
import inLoading from "../../../utils/inLoading";

export interface IFormDemandPassword {
  goBack: () => void;
  onRequest: (p: { tenantId: string; username: string }) => Promise<IResLogin>;
  hiddenTenant?: boolean;
}
const FormDemandPassword = ({
  goBack,
  onRequest,
  hiddenTenant,
}: IFormDemandPassword) => {
  const classes = useStylesForm();

  const [state, dispatch] = React.useReducer(reducer, reducerInitState);
  const { init, errors, tenantId, username } = state;

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
  const loading = inLoading(init);
  const success = init === Initialize.SUCC;

  React.useEffect(() => {
    (async () => {
      if (init === Initialize.START) {
        dispatch({ type: ACTION.INIT_LOADING });
        try {
          const { success, message } = await onRequest({
            tenantId,
            username,
          });
          if (!success) throw message;
          dispatch({ type: ACTION.INIT_SUCC });
        } catch (err) {
          const errors = await getErrors(err);
          dispatch({ type: ACTION.INIT_FAIL, errors });
        }
      }
    })();
  }, [init, onRequest, tenantId, username]);

  const errorEmail = !!username && !isValidEmail(username) ? ERROR_EMAIL : "";
  const allfilled = (hiddenTenant || !!tenantId) && !!username && !errorEmail;

  return (
    <form className={classes.form}>
      <div style={{ flex: 1 }} />
      <Toolbar className={classes.formTitle}>
        <Btn
          className={classes.formBtnBack}
          onClick={goBack}
          icon="arrow_back"
        />
        <Text
          size={5}
          weight="bolder"
          style={{ textTransform: "uppercase" }}
          children={FORM_TITLE[FORM.DEMAND_PASSWORD]}
        />
      </Toolbar>
      {hiddenTenant ? null : (
        <FieldInput
          autoComplete="organization"
          inputType="text"
          inputName="organization"
          icon="domain"
          label="Company"
          value={tenantId}
          onChange={onChangeTent}
          readOnly={loading || success}
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
        readOnly={loading || success}
        error={init === Initialize.FAIL}
        tooltipOpen={!!errorEmail}
        tooltipValue={[errorEmail]}
      />
      {success ? (
        <Button
          color={getTheme().colors.msgSucc}
          label="GO TO LOGIN"
          onClick={goBack}
        />
      ) : (
        <Button
          color={
            init === Initialize.FAIL
              ? getTheme().colors.msgFail
              : getTheme().colors.theme1
          }
          label={loading ? "LOADING" : "RESET PASSWORD"}
          disabled={loading || !allfilled}
          onClick={onConfirm}
        />
      )}
      <MessageError
        init={init}
        messagesFail={errors}
        messagesSucc={[
          "We have sent an email with a link to reset your password",
        ]}
      />
      <div style={{ flex: 1 }} />
    </form>
  );
};

export default FormDemandPassword;
