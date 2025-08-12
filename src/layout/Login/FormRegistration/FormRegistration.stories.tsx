import { action } from "@storybook/addon-actions";
import FormRegistration, { IFormRegistration } from "./FormRegistration";
import { IRegistrationField } from "../utils";

const fields: IRegistrationField[] = [
  { id: "ao1", label: "Additional option 1", required: false },
  { id: "ao2", label: "Additional option 2", required: false },
  { id: "ao3", label: "Additional option 3", required: false },
];

const args: IFormRegistration = {
  goBack: () => {
    action("goBack")();
  },
  onRequest: async (p) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    action("onRequest")(p);
    return { success: true, message: "" };
  },
  getTermsOfService: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    action("getTermsOfService")();
    return {
      privacyTermsOfService: {
        name: "demo-showcase-privacy-policy",
        url: "https://gdpr-info.eu/issues/personal-data/",
        description: "Agree to showcase privacy policy to sign up",
      },
      additionalTermsOfService: {
        "showcase-tos": {
          name: "terms of service to use showcase",
          url: "https://gdpr-info.eu/issues/consent/",
          description: "I agree to the expanded policy",
          isMandatory: true,
          orderNumber: 2,
        },
        "showcase-newsletter-tos": {
          name: "terms of service to use showcase",
          url: null,
          description: "I agree to receive the newsletter",
          isMandatory: false,
          orderNumber: 1,
        },
      },
    };
  },
  fields,
};

export default {
  title: "layout/Login/FormRegistration",
  component: FormRegistration,
  args,
};

const Story = (args) => <FormRegistration {...args} />;

export const Default = Story.bind({});

export const ErrorOnRequest = Story.bind({});
ErrorOnRequest.args = {
  onRequest: async (p) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    action("onRequest")(p);
    throw new Error("Errore non gestito");
  },
};

export const ErrorNoPrivacyPolicy = Story.bind({});
ErrorNoPrivacyPolicy.args = {
  getTermsOfService: async () => null,
};
