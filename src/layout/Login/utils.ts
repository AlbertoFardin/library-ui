import { createUseStyles } from "react-jss";

export const WIDTH_INPUT = 360;
export const WIDTH_PANEL = 500;
export const BREAKPOINT_DEFAULT = WIDTH_PANEL * 2;

export enum FORM {
  LOGIN = "login",
  REGISTRATION = "registration",
  CHOOSE_PASSWORD = "choosepassword", // concordato col BE - arriva nel link email
  FORGOT_PASSWORD = "forgotpassword", // concordato col BE - arriva nel link email
  DEMAND_PASSWORD = "resetpassword",
}
export const FORM_TITLE: { [k in FORM]: string } = {
  [FORM.LOGIN]: "Login",
  [FORM.REGISTRATION]: "Registration",
  [FORM.CHOOSE_PASSWORD]: "Choose Password",
  [FORM.FORGOT_PASSWORD]: "Forgot Password",
  [FORM.DEMAND_PASSWORD]: "Request Credentials",
};

export const getQueryStringValue = (key: string): string => {
  const query = new URLSearchParams(window.location.search);
  return query.get(key) || "";
};
export const addQueryStringValue = (key: string, value: string): void => {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  window.history.pushState({}, "", url.toString());
};
export const getPathCurrentUrl = (): string => {
  const urlObject = new URL(window.location.href);
  const pathname = urlObject.pathname;
  const segments = pathname.split("/");
  const lastSegment = segments.pop();
  return lastSegment;
};
export const getFormCurrentUrl = (): FORM => {
  const array = new Set(Object.values(FORM));
  const f = getPathCurrentUrl() as FORM;
  return array.has(f) ? f : FORM.LOGIN;
};
export const addPathCurrentUrl = (newPath: string) => {
  const currentUrl = new URL(window.location.href);
  const currentPath = getPathCurrentUrl();
  if (currentPath !== newPath) {
    currentUrl.pathname = `${newPath}`;
    window.history.pushState({}, "", currentUrl.toString());
  }
};
export const getBaseUrl = () => {
  const urlObject = new URL(window.location.href);
  const baseUrl = `${urlObject.protocol}//${urlObject.host}/`;
  return baseUrl;
};
export const goToBaseUrl = () => {
  window.history.pushState({}, "", getBaseUrl());
  location.reload();
};

export const defaultEmptyFn = async (p?) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log("->function not defined", p);
  return null;
};

export const useStylesForm = createUseStyles({
  form: {
    padding: "20px 0",
    position: "relative",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflowY: "overlay",
  },
  formTitle: {
    padding: "0 !important",
    width: WIDTH_INPUT + "px !important",
    justifyContent: "center",
    marginBottom: 20,
  },
  formBtnBack: {
    position: "absolute !important",
    top: 0,
    bottom: 0,
    left: 0,
    margin: "auto !important",
  },
});

export interface IRegistrationField {
  id: string;
  label: string;
  required: boolean;
}

export interface IResLogin {
  success: boolean;
  message: string | string[];
}

export interface ITermsOfService {
  privacyTermsOfService: {
    name: string;
    url: string;
    description?: string;
  };
  additionalTermsOfService: {
    [keyId: string]: {
      name: string;
      url?: string;
      description: string;
      isMandatory: boolean;
      orderNumber: number;
    };
  };
}

export interface ISignUp {
  email: string;
  firstName: string;
  lastName: string;
  acceptPrivacyTermsOfService: boolean;
  acceptAdditionalTermsOfService: {
    [keyId: string]: boolean;
  };
}
