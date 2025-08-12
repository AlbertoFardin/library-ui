export interface IPwdPolicy {
  minimumLength: number;
  maximumLength?: number;
  requireLowercase: boolean;
  requireUppercase: boolean;
  requireNumbers: boolean;
  requireSymbols: boolean;
}

export interface IPwdValidationResult {
  valid: boolean;
  validMinLength: boolean;
  validMaxLength: boolean;
  validLowercase: boolean;
  validUppercase: boolean;
  validNumbers: boolean;
  validSymbols: boolean;
}

export const defaultPwdPolicy: IPwdPolicy = {
  minimumLength: 8,
  maximumLength: 256,
  requireLowercase: true,
  requireUppercase: true,
  requireNumbers: true,
  requireSymbols: true,
};

const SPECIAL_CHARS = [
  "^",
  "$",
  "*",
  ".",
  "[",
  "]",
  "{",
  "}",
  "(",
  ")",
  "?",
  "!",
  "@",
  "#",
  "%",
  "&",
  ">",
  "<",
  ":",
  ";",
  "|",
  "_",
  "=",
  "+",
  "-",
];

const haveValidMinLength = (
  required: boolean,
  pass: string,
  n: number,
): boolean => {
  return !required ? true : pass.length >= n;
};
const haveValidMaxLength = (
  required: boolean,
  pass: string,
  n: number,
): boolean => {
  return !required ? true : pass.length <= n;
};
const haveValidLowercase = (required: boolean, pass: string): boolean => {
  return !required ? true : /[a-z]/.test(pass);
};
const haveValidUppercase = (required: boolean, pass: string): boolean => {
  return !required ? true : /[A-Z]/.test(pass);
};
const haveValidNumbers = (required: boolean, pass: string): boolean => {
  return !required ? true : /[0-9]/.test(pass);
};
const haveValidSymbols = (required: boolean, pass: string): boolean => {
  return !required ? true : SPECIAL_CHARS.some((s) => pass.indexOf(s) > -1);
};

export const validatePassword = ({
  password = "",
  pwdPolicy = defaultPwdPolicy,
  required = true,
}: {
  password?: string;
  pwdPolicy?: IPwdPolicy;
  required?: boolean;
}): IPwdValidationResult => {
  if (password !== null && password.length > 0) {
    const validMinLength = haveValidMinLength(
      !!pwdPolicy.minimumLength,
      password,
      pwdPolicy.minimumLength,
    );
    const validMaxLength = haveValidMaxLength(
      !!pwdPolicy.maximumLength,
      password,
      pwdPolicy.maximumLength,
    );
    const validLowercase = haveValidLowercase(
      pwdPolicy.requireLowercase,
      password,
    );
    const validUppercase = haveValidUppercase(
      pwdPolicy.requireUppercase,
      password,
    );
    const validNumbers = haveValidNumbers(pwdPolicy.requireNumbers, password);
    const validSymbols = haveValidSymbols(pwdPolicy.requireSymbols, password);

    return {
      validMinLength,
      validMaxLength,
      validLowercase,
      validUppercase,
      validNumbers,
      validSymbols,
      valid:
        validMinLength &&
        validMaxLength &&
        validLowercase &&
        validUppercase &&
        validNumbers &&
        validSymbols,
    };
  } else {
    return {
      validMinLength: false,
      validMaxLength: false,
      validLowercase: false,
      validUppercase: false,
      validNumbers: false,
      validSymbols: false,
      valid: !required,
    };
  }
};
