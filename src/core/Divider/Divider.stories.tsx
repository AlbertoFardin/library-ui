import Divider from ".";
import Toolbar from "../Toolbar";

export default {
  title: "core/Divider",
  component: Divider,
};

const CmpStory = () => {
  return (
    <>
      <Toolbar />
      <Divider />
      <Toolbar />
    </>
  );
};

export const Example = CmpStory.bind({});
