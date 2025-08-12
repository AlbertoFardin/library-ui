import * as React from "react";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import { ACTION, reducerInitState, reducer } from "./reducer";
import { getTheme } from "../../theme";
import { isMobile } from "../../utils/deviceUtils";
import FormLogin from "./FormLogin";
import FormDemandPassword from "./FormDemandPassword";
import FormChoosePassword from "./FormChoosePassword";
import FormRegistration from "./FormRegistration";
import {
  FORM,
  IRegistrationField,
  IResLogin,
  ISignUp,
  ITermsOfService,
  WIDTH_PANEL,
  defaultEmptyFn,
  getFormCurrentUrl,
} from "./utils";
import { Slide, Zoom } from "../../core/Transitions";
import Card from "../../core/Card";

const useStyles = createUseStyles({
  login: {
    width: "inherit",
    height: "inherit",
    backgroundColor: getTheme().colors.grayDrawer,
    display: "flex",
    flexDirection: "row",
    position: "relative",
  },
  transition: {
    height: "100%",
    width: "100%",
  },
  cardPush: {
    width: WIDTH_PANEL,
    minWidth: WIDTH_PANEL,
  },
  card: {
    height: "inherit",
    width: WIDTH_PANEL,
    minWidth: WIDTH_PANEL,
    zIndex: 1,
    position: "absolute",
    top: 0,
    overflowY: "overlay",
    overflowX: "hidden",
    borderRadius: 0,
    border: 0,
  },
  cardRight: {
    right: 0,
  },
  cardLeft: {
    left: 0,
  },
  cardCenter: {
    right: 0,
    left: 0,
    margin: "auto",
  },
  cardModal: {
    minHeight: WIDTH_PANEL + 50,
    bottom: 0,
    right: 0,
    left: 0,
    margin: "auto",
    height: "fit-content",
    padding: "20px 0px",
    borderRadius: 10,
    border: `1px solid ${getTheme().colors.grayBorder}`,
  },
});

export interface ILogin {
  style?: React.CSSProperties;
  className?: string;
  position?: "center" | "left" | "right" | "modal";
  background?: JSX.Element | React.ReactNode;
  header?: JSX.Element | React.ReactNode;
  onLogin: (p: {
    tenantId: string;
    username: string;
    password: string;
  }) => Promise<IResLogin>;
  onDemandPassword?: (p: {
    tenantId: string;
    username: string;
  }) => Promise<IResLogin>;
  onRegistration?: (p: ISignUp) => Promise<IResLogin>;
  onChoosePassword?: (p: {
    authTmpCode: string;
    authGroupId: string;
    username: string;
    password: string;
  }) => Promise<IResLogin>;
  getTermsOfService?: () => Promise<ITermsOfService>;
  getPasswordPolicy?: (groupId: string) => Promise<{
    minimumLength: number;
    requireLowercase: boolean;
    requireUppercase: boolean;
    requireNumbers: boolean;
    requireSymbols: boolean;
  }>;
  hiddenTenant?: boolean;
  hiddenRegistration?: boolean;
  hiddenForgotPassword?: boolean;
  registrationFields?: IRegistrationField[];
}

const Login = ({
  className,
  style,
  position = "center",
  background,
  header,
  onLogin,
  onRegistration = defaultEmptyFn,
  onDemandPassword = defaultEmptyFn,
  onChoosePassword = defaultEmptyFn,
  getTermsOfService = defaultEmptyFn,
  getPasswordPolicy = defaultEmptyFn,
  hiddenTenant,
  hiddenRegistration,
  hiddenForgotPassword,
  registrationFields = [],
}: ILogin) => {
  const classes = useStyles();
  const [state, dispatch] = React.useReducer(reducer, reducerInitState);
  const { width, form } = state;
  const toLogin = React.useCallback(() => {
    dispatch({ type: ACTION.SHOW_FORM, value: FORM.LOGIN });
  }, []);
  const toRegistration = React.useCallback(() => {
    dispatch({ type: ACTION.SHOW_FORM, value: FORM.REGISTRATION });
  }, []);
  const toDemandPassword = React.useCallback(() => {
    dispatch({ type: ACTION.SHOW_FORM, value: FORM.DEMAND_PASSWORD });
  }, []);
  const minimal = width < WIDTH_PANEL || isMobile();

  React.useEffect(() => {
    const value = getFormCurrentUrl();
    dispatch({ type: ACTION.SHOW_FORM, value });
  }, []);

  React.useEffect(() => {
    const onResize = () => dispatch({ type: ACTION.WIDTH });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className={classes.login}>
      {minimal ? null : (
        <>
          {position === "left" ? (
            <div
              style={style}
              className={classnames({
                [classes.cardPush]: true,
                [className]: !!className,
              })}
            />
          ) : null}
          {background}
          {position === "right" ? (
            <div
              style={style}
              className={classnames({
                [classes.cardPush]: true,
                [className]: !!className,
              })}
            />
          ) : null}
        </>
      )}
      <Card
        style={style}
        className={classnames({
          [classes.card]: true,
          [classes.cardLeft]: !minimal && position === "left",
          [classes.cardRight]: !minimal && position === "right",
          [classes.cardCenter]: minimal || position === "center",
          [classes.cardModal]: !minimal && position === "modal",
          [className]: !!className,
        })}
      >
        <Zoom
          open={!form || form === FORM.LOGIN}
          className={classes.transition}
        >
          <FormLogin
            header={header}
            onRequest={onLogin}
            onClickRegistration={toRegistration}
            onClickForgotPassword={toDemandPassword}
            hiddenTenant={hiddenTenant}
            hiddenRegistration={hiddenRegistration}
            hiddenForgotPassword={hiddenForgotPassword}
          />
        </Zoom>
        <Slide
          direction="left"
          open={form === FORM.DEMAND_PASSWORD}
          className={classes.transition}
        >
          <FormDemandPassword
            goBack={toLogin}
            onRequest={onDemandPassword}
            hiddenTenant={hiddenTenant}
          />
        </Slide>
        <Slide
          direction="left"
          open={form === FORM.CHOOSE_PASSWORD || form === FORM.FORGOT_PASSWORD}
          className={classes.transition}
        >
          <FormChoosePassword
            goBack={toLogin}
            onRequest={onChoosePassword}
            getPasswordPolicy={getPasswordPolicy}
          />
        </Slide>
        <Slide
          direction="left"
          open={form === FORM.REGISTRATION}
          className={classes.transition}
        >
          <FormRegistration
            goBack={toLogin}
            onRequest={onRegistration}
            fields={registrationFields}
            getTermsOfService={getTermsOfService}
          />
        </Slide>
      </Card>
    </div>
  );
};

export default Login;
