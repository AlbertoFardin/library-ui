import { action } from "@storybook/addon-actions";
import BtnPulse from "./BtnPulse";
import Toolbar from "../Toolbar";
import { getTheme } from "../../theme";

export default {
  title: "core/BtnPulse",
  component: BtnPulse,
};

const Story = () => (
  <>
    <Toolbar />
    <Toolbar style={{ background: getTheme().colors.grayDrawer }}>
      <BtnPulse
        style={{ margin: "0 15px" }}
        pulse={false}
        icon="tune"
        tooltip="Your Filters Sets"
        onClick={action("onClick")}
      />
      <BtnPulse
        style={{ margin: "0 15px" }}
        pulse={true}
        icon="view_column"
        tooltip="Your Column Sets"
        onClick={action("onClick")}
      />
      <BtnPulse
        style={{ margin: "0 15px" }}
        pulse={false}
        selected
        icon="text_snippet"
        tooltip="Your Fields Sets"
        onClick={action("onClick")}
      />
      <BtnPulse
        style={{ margin: "0 15px" }}
        pulse={false}
        disabled
        icon="text_snippet"
        tooltip="Your Fields Sets"
        onClick={action("onClick")}
      />
    </Toolbar>
    <Toolbar />
  </>
);

export const Default = Story.bind({});
