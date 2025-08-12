import * as React from "react";
import {
  FORM,
  FORM_TITLE,
  IRegistrationField,
  IResLogin,
  ISignUp,
  ITermsOfService,
  useStylesForm,
} from "../utils";
import { ACTION, reducerInitState, reducer } from "./reducer";
import { getTheme } from "../../../theme";
import Text from "../../../core/Text";
import Btn from "../../../core/Btn";
import FieldInput from "../FieldInput";
import FieldCheckbox from "../FieldCheckbox";
import { Initialize } from "../../../interfaces";
import Toolbar from "../../../core/Toolbar";
import Button from "../Button";
import MessageError, { getErrors } from "../MessageError";
import isValidEmail from "../../../utils/isValidEmail";
import { ERROR_EMAIL } from "../../../constants";
import inLoading from "../../../utils/inLoading";

const defaultFields: IRegistrationField[] = [
  { id: "email", label: "Email", required: true },
  { id: "firstName", label: "First Name", required: true },
  { id: "lastName", label: "Last Name", required: true },
];

export interface IFormRegistration {
  goBack: () => void;
  getTermsOfService: () => Promise<ITermsOfService>;
  onRequest: (p: ISignUp) => Promise<IResLogin>;
  fields: IRegistrationField[];
}
const FormRegistration = ({
  goBack,
  getTermsOfService,
  onRequest,
  fields: additionalFields,
}: IFormRegistration) => {
  const classes = useStylesForm();

  const [state, dispatch] = React.useReducer(reducer, reducerInitState);
  const {
    initConfirm,
    initTermsservice: initPrivacy,
    termsservice,
    errors,
    userdata,
  } = state;

  const fields = defaultFields.concat(additionalFields);

  const onConfirm = React.useCallback(() => {
    dispatch({ type: ACTION.CONFIRM_START });
  }, []);
  const onEnter = React.useCallback(() => {
    onConfirm();
    document.documentElement.blur();
  }, [onConfirm]);
  const onChangeInput = React.useCallback(
    (value: string, id: string, pressEnter: boolean) => {
      dispatch({ type: ACTION.SET_INPUT, id, value });
      if (pressEnter) onEnter();
    },
    [onEnter],
  );
  const onChangeBoolAdterms = React.useCallback(
    (value: boolean, id: string) => {
      dispatch({ type: ACTION.SET_BOOL_ADTERMS, id, value });
    },
    [],
  );
  const onChangeBoolPrivacy = React.useCallback((value: boolean) => {
    dispatch({ type: ACTION.SET_BOOL_PRIVACY, value });
  }, []);
  const loading = inLoading(initConfirm);
  const success = initConfirm === Initialize.SUCC;

  const errorInputEmail = !isValidEmail(userdata.email);
  const errorCheckPrivacy = userdata.acceptPrivacyTermsOfService === false;
  const errorCheckAdTerms = Object.keys(
    userdata.acceptAdditionalTermsOfService || [],
  ).some((key) => {
    if (!termsservice?.additionalTermsOfService[key]?.isMandatory) return false;
    return userdata.acceptAdditionalTermsOfService[key] === false;
  });
  const errorFields = fields.some((f) => f.required && !userdata[f.id]);
  const tooltipOpens: Record<string, boolean> = {
    email: !userdata.email ? false : errorInputEmail,
  };
  const tooltipValues: Record<string, string[]> = {
    email: [ERROR_EMAIL],
  };
  const someError =
    errorCheckPrivacy || errorCheckAdTerms || errorInputEmail || errorFields;

  React.useEffect(() => {
    (async () => {
      if (initConfirm === Initialize.START) {
        dispatch({ type: ACTION.CONFIRM_WAIT });
        try {
          const { success, message } = await onRequest(userdata);
          if (!success) throw message;
          dispatch({ type: ACTION.CONFIRM_SUCC });
        } catch (err) {
          const errors = await getErrors(err);
          dispatch({ type: ACTION.CONFIRM_FAIL, errors });
        }
      }
    })();
  }, [initConfirm, onRequest, userdata]);

  React.useEffect(() => {
    (async () => {
      if (initPrivacy === Initialize.START) {
        let value: ITermsOfService = null;
        try {
          value = await getTermsOfService();
        } catch (err) {
          console.error("getTermsOfService ", err);
        }
        dispatch({ type: ACTION.TERMSSERVICE, value });
      }
    })();
  }, [getTermsOfService, initPrivacy]);

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
          children={FORM_TITLE[FORM.REGISTRATION]}
        />
      </Toolbar>
      {fields.length === 0 ? (
        <>
          <Text
            style={{ color: getTheme().colors.msgFail }}
            size={2}
            children="UNABLE REGISTER IN THIS APPLICATIONS"
          />
          <Text
            style={{ color: getTheme().colors.msgFail }}
            size={2}
            children="Please return to login"
          />
        </>
      ) : (
        <>
          {fields.map((f) => (
            <FieldInput
              key={f.id}
              id={f.id}
              label={f.label}
              required={f.required}
              value={userdata[f.id] as string}
              onChange={onChangeInput}
              readOnly={loading || success}
              error={initConfirm === Initialize.FAIL && f.required}
              tooltipOpen={tooltipOpens[f.id]}
              tooltipValue={tooltipValues[f.id]}
            />
          ))}
          <FieldCheckbox
            id="acceptPrivacyTermsOfService"
            selected={userdata.acceptPrivacyTermsOfService}
            onChange={onChangeBoolPrivacy}
            readOnly={loading || success}
            required
            link={termsservice?.privacyTermsOfService?.url}
            label={
              termsservice?.privacyTermsOfService?.description ||
              "By checking this box I declare that I have read the Privacy Policy"
            }
          />
          {Object.keys(termsservice?.additionalTermsOfService || [])
            .sort((a, b) => {
              const sortA =
                termsservice.additionalTermsOfService[a].orderNumber;
              const sortB =
                termsservice.additionalTermsOfService[b].orderNumber;
              if (sortA > sortB) return 1;
              if (sortA < sortB) return -1;
              return 0;
            })
            .map((key) => (
              <FieldCheckbox
                key={key}
                id={key}
                selected={userdata.acceptAdditionalTermsOfService[key]}
                onChange={onChangeBoolAdterms}
                readOnly={loading || success}
                required={
                  termsservice?.additionalTermsOfService[key]?.isMandatory
                }
                link={termsservice?.additionalTermsOfService[key]?.url}
                label={termsservice?.additionalTermsOfService[key]?.description}
              />
            ))}
          {success ? (
            <Button
              color={getTheme().colors.msgSucc}
              label="GO TO LOGIN"
              onClick={goBack}
            />
          ) : (
            <Button
              color={
                initConfirm === Initialize.FAIL
                  ? getTheme().colors.msgFail
                  : getTheme().colors.theme1
              }
              label={loading ? "LOADING" : "CONFIRM"}
              disabled={loading || someError}
              onClick={onConfirm}
            />
          )}
          <MessageError
            init={initConfirm}
            messagesFail={errors}
            messagesSucc={[
              "We have sent your registration request to the admin",
            ]}
          />
        </>
      )}
      <div style={{ flex: 1 }} />
    </form>
  );
};

export default FormRegistration;
