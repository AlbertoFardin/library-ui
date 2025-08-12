import * as React from "react";
import {
  useStylesForm,
  getQueryStringValue,
  FORM_TITLE,
  getFormCurrentUrl,
  IResLogin,
} from "../utils";
import Text from "../../../core/Text";
import Toolbar from "../../../core/Toolbar";
import { getTheme } from "../../../theme";
import { Initialize } from "../../../interfaces";
import { ACTION, reducerInitState, reducer } from "./reducer";
import Button from "../Button";
import getErrorMsg from "../../../utils/getErrorMsg";
import MessageError, { getErrors } from "../MessageError";
import { ERROR_GENERIC } from "../../../constants";
import inLoading from "../../../utils/inLoading";
import Btn from "../../../core/Btn";
import TextLoading from "../../../core/TextLoading";
import { IPwdPolicy } from "../utils/validatePassword";
import FieldPwdWithPolicy from "../FieldPwdWithPolicy";
import FieldPwd from "../FieldPwd";

export interface IFormChoosePassword {
  goBack: () => void;
  onRequest: (p: {
    authTmpCode: string;
    authGroupId: string;
    username: string;
    password: string;
  }) => Promise<IResLogin>;
  getPasswordPolicy: (groupId: string) => Promise<IPwdPolicy>;
}
const FormChoosePassword = ({
  goBack,
  onRequest,
  getPasswordPolicy,
}: IFormChoosePassword) => {
  const classes = useStylesForm({});
  const [state, dispatch] = React.useReducer(reducer, reducerInitState);
  const {
    errors,
    initConfirm,
    initRequire,
    passwordOne,
    passwordTwo,
    pwdPolicy,
    validPasswordOne,
  } = state;
  const form = getFormCurrentUrl();
  const email = getQueryStringValue("email");
  const username = email || getQueryStringValue("userId");
  const authTmpCode = getQueryStringValue("code");
  const authGroupId = getQueryStringValue("groupId");

  const onChangePasswordOne = React.useCallback(
    (value: string, valid: boolean) => {
      dispatch({ type: ACTION.EDITING_PWD, value, valid });
    },
    [],
  );
  const onChangePasswordTwo = React.useCallback((value: string) => {
    dispatch({ type: ACTION.EDITING_CONFIRM_PWD, value });
  }, []);
  const onClickBtnConfirm = React.useCallback(() => {
    dispatch({ type: ACTION.INIT_CONFIRM_START });
  }, []);
  const validPasswordTwo = validPasswordOne
    ? passwordOne === passwordTwo
    : true;
  const hasRequire = initRequire === Initialize.SUCC;
  const success = initConfirm === Initialize.SUCC;
  const loadingConfirm = inLoading(initConfirm);
  const loadingRequire = inLoading(initRequire);

  React.useEffect(() => {
    (async () => {
      if (initRequire === Initialize.START) {
        try {
          dispatch({ type: ACTION.INIT_REQUIRE_LOADING });
          const policy = await getPasswordPolicy(authGroupId);
          dispatch({
            type: ACTION.INIT_REQUIRE_SUCC,
            pwdPolicy: { requireMaxLength: 256, ...policy },
          });
        } catch (err) {
          const error = await getErrorMsg(err);
          dispatch({ type: ACTION.INIT_REQUIRE_FAIL, error });
        }
      }
    })();
  }, [getPasswordPolicy, authGroupId, initRequire]);

  React.useEffect(() => {
    (async () => {
      if (initConfirm === Initialize.START) {
        try {
          dispatch({ type: ACTION.INIT_CONFIRM_LOADING });
          const { success, message } = await onRequest({
            authTmpCode,
            authGroupId,
            username,
            password: passwordOne,
          });
          if (!success) throw message;
          dispatch({ type: ACTION.INIT_CONFIRM_SUCC });
        } catch (err) {
          const errors = await getErrors(err);
          dispatch({ type: ACTION.INIT_CONFIRM_FAIL, errors });
        }
      }
    })();
  }, [authTmpCode, username, authGroupId, initConfirm, onRequest, passwordOne]);

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
          children={FORM_TITLE[form]}
        />
      </Toolbar>
      {email && (
        <Text
          style={{ marginTop: "-20px", marginBottom: 20 }}
          size={0}
          weight="lighter"
          children={`Please set a new password for ${email}`}
        />
      )}
      {initRequire === Initialize.FAIL ? (
        <>
          <Text
            style={{ color: getTheme().colors.msgFail }}
            size={2}
            children="UNABLE GET PASSWORD POLICY"
          />
          <Text
            style={{ color: getTheme().colors.msgFail }}
            size={2}
            children={ERROR_GENERIC}
          />
        </>
      ) : (
        <>
          <FieldPwdWithPolicy
            pwd={passwordOne}
            required={true}
            readOnly={loadingRequire || loadingConfirm || success}
            copy={{ label: "Type password" }}
            onChange={onChangePasswordOne}
            pwdPolicy={pwdPolicy}
          />
          <FieldPwd
            error={hasRequire && !validPasswordTwo}
            tooltipOpen={hasRequire && !validPasswordTwo}
            tooltipValue={["❌ Password doesn't match"]}
            readOnly={loadingRequire || loadingConfirm || success}
            value={passwordTwo}
            label="Re-type password"
            onChange={onChangePasswordTwo}
          />
          {success ? (
            <Button
              color={getTheme().colors.msgSucc}
              label="GO TO LOGIN"
              onClick={goBack}
            />
          ) : loadingRequire ? (
            <TextLoading style={{ marginTop: 25 }} />
          ) : (
            <Button
              color={
                initConfirm === Initialize.FAIL
                  ? getTheme().colors.msgFail
                  : getTheme().colors.theme1
              }
              disabled={
                loadingConfirm || !validPasswordOne || !validPasswordTwo
              }
              label={loadingConfirm ? "LOADING" : "CONFIRM"}
              onClick={onClickBtnConfirm}
            />
          )}
        </>
      )}
      <MessageError
        init={initConfirm}
        messagesFail={errors}
        messagesSucc={["Your password has been set!"]}
      />
      <div style={{ flex: 1 }} />
    </form>
  );
};

export default FormChoosePassword;
