import { action } from "@storybook/addon-actions";
import FormChoosePassword, { IFormChoosePassword } from "./FormChoosePassword";

const args: IFormChoosePassword = {
  goBack: () => {
    action("goBack")();
  },
  onRequest: async (p) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    action("onRequest")(p);
    return { success: true, message: "" };
  },
  getPasswordPolicy: async (p) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    action("getPasswordPolicy")(p);
    return {
      minimumLength: 5,
      requireLowercase: true,
      requireUppercase: true,
      requireNumbers: true,
      requireSymbols: true,
    };
  },
};

export default {
  title: "layout/Login/FormChoosePassword",
  component: FormChoosePassword,
  args,
};

const Story = (args) => <FormChoosePassword {...args} />;

export const Default = Story.bind({});

export const ErrorOnRequest = Story.bind({});
ErrorOnRequest.args = {
  onRequest: async (p) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    action("onRequest")(p);
    throw new Error("Errore non gestito");
  },
};

export const ErrorGetPwdPolicy = Story.bind({});
ErrorGetPwdPolicy.args = {
  getPasswordPolicy: async (p) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    action("onRequest")(p);
    throw new Error("Errore non gestito");
  },
};
