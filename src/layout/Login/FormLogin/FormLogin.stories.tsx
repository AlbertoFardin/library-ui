import { action } from "@storybook/addon-actions";
import FormLogin, { IFormLogin } from "./FormLogin";
import Text from "../../../core/Text";

const args: IFormLogin = {
  header: <Text children="-formHeader-" />,
  onRequest: async (p) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    action("onRequest")(p);
    return { success: true, message: "" };
  },
  onClickRegistration: () => {
    action("onClickRegistration")();
  },
  onClickForgotPassword: () => {
    action("onClickForgotPassword")();
  },
};

export default {
  title: "layout/Login/FormLogin",
  component: FormLogin,
  args,
};

const Story = (args) => <FormLogin {...args} />;

export const Default = Story.bind({});

export const ErrorOnRequest = Story.bind({});
ErrorOnRequest.args = {
  onRequest: async (p) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    action("onRequest")(p);
    throw new Error("Errore non gestito");
  },
};
