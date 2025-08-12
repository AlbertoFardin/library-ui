import { action } from "@storybook/addon-actions";
import FormDemandPassword, { IFormDemandPassword } from "./FormDemandPassword";

const args: IFormDemandPassword = {
  goBack: () => {
    action("goBack")();
  },
  onRequest: async (p) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    action("onRequest")(p);
    return { success: true, message: "" };
  },
};

export default {
  title: "layout/Login/FormDemandPassword",
  component: FormDemandPassword,
  args,
};

const Story = (args) => <FormDemandPassword {...args} />;

export const Default = Story.bind({});

export const ErrorOnRequest = Story.bind({});
ErrorOnRequest.args = {
  onRequest: async (p) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    action("onRequest")(p);
    throw new Error("Errore non gestito");
  },
};
