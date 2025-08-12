import { action } from "@storybook/addon-actions";
import FormSharePageLogin, { IFormSharePageLogin } from "./FormSharePageLogin";
import Text from "../../core/Text";

const args: IFormSharePageLogin = {
  header: <Text children="-formHeader-" />,
  onRequest: async (p) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    action("onRequest")(p);
    return { success: true, message: "" };
  },
};

export default {
  title: "layout/FormSharePageLogin",
  component: FormSharePageLogin,
  args,
};

const Story = (args) => <FormSharePageLogin {...args} />;

export const Default = Story.bind({});

export const ErrorOnRequest = Story.bind({});
ErrorOnRequest.args = {
  onRequest: async (p) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    action("onRequest")(p);
    throw new Error("Errore non gestito");
  },
};
