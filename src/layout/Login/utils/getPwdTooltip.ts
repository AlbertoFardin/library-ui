import { IPwdPolicy, IPwdValidationResult } from "./validatePassword";

export const getPwdTooltip = ({
  pwdPolicy,
  pwdValidationResult,
}: {
  pwdPolicy: IPwdPolicy;
  pwdValidationResult: IPwdValidationResult;
}): string[] => {
  if (pwdValidationResult?.valid ?? true) {
    return [];
  }
  return [
    addValidationLabel(
      !!pwdPolicy.minimumLength,
      pwdValidationResult.validMinLength,
      `Minimum password length of ${pwdPolicy.minimumLength} characters`,
    ),
    addValidationLabel(
      !!pwdPolicy.maximumLength,
      pwdValidationResult.validMaxLength,
      `Maximum password length of ${pwdPolicy.maximumLength} characters`,
    ),
    addValidationLabel(
      !!pwdPolicy.requireLowercase,
      pwdValidationResult.validLowercase,
      "Password must contain a lower case",
    ),
    addValidationLabel(
      !!pwdPolicy.requireUppercase,
      pwdValidationResult.validUppercase,
      "Password must contain a upper case",
    ),
    addValidationLabel(
      !!pwdPolicy.requireNumbers,
      pwdValidationResult.validNumbers,
      "Password must contain at least one number",
    ),
    addValidationLabel(
      !!pwdPolicy.requireSymbols,
      pwdValidationResult.validSymbols,
      "Password must contain at least one symbol",
    ),
  ];
};
export const addValidationLabel = (
  require: boolean,
  valid: boolean,
  text: string,
): string => {
  if (!require) return "";
  return (valid ? "✅" : "❌") + " " + text;
};
