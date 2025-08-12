import { action } from "@storybook/addon-actions";
import Login, { ILogin } from "./Login";
import LogoWarda from "../../core/LogoWarda";
import Text from "../../core/Text";

const args: ILogin = {
  header: (
    <>
      <LogoWarda />
      <Text size={3} children="LOGIN AND EXPLORE THE CONTENT" />
      <div style={{ margin: 25 }} />
    </>
  ),
  background: (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "url('./images/original/photofashion.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        position: "relative",
      }}
    >
      <Text
        size={3}
        style={{
          color: "#fff",
          padding: "25px 60px",
          backgroundColor: "rgba(0,0,0,0.75)",
        }}
        children="THIS IS A CUSTOM BACKGROUND"
      />
    </div>
  ),
  onLogin: async (p) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    action("onLogin")(p);
    return {
      success: false,
      message: [
        "la mail contiene caratteri non consentiti",
        "company contiene caratteri numerici",
      ],
    };
  },
  onRegistration: async (p) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    action("onRegistration")(p);
    throw new Error("Errore non gestito");
  },
  onDemandPassword: async (p) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    action("onDemandPassword")(p);
    throw new Error("Errore non gestito");
  },
  onChoosePassword: async (p) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    action("onChoosePassword")(p);
    throw new Error("Errore non gestito");
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
  registrationFields: [
    { id: "d1", label: "desc1", required: false },
    { id: "d2", label: "desc2", required: false },
    { id: "d3", label: "desc3", required: false },
    { id: "d4", label: "desc4", required: false },
    { id: "d5", label: "desc5", required: false },
    { id: "d6", label: "desc6", required: false },
    { id: "d7", label: "desc7", required: false },
  ],
};

export default {
  title: "layout/Login",
  component: Login,
  args,
};

const Story = (args) => <Login {...args} />;

export const Default = Story.bind({});

export const PositionModal = Story.bind({});
PositionModal.args = {
  position: "modal",
};
export const PositionLeft = Story.bind({});
PositionLeft.args = {
  position: "left",
};
export const PositionRight = Story.bind({});
PositionRight.args = {
  position: "right",
};
