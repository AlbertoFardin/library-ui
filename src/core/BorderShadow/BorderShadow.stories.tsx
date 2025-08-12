import BorderShadow from ".";
import Text from "../Text";

export default {
  title: "core/BorderShadow",
  component: BorderShadow,
};

const ExampleStory = () => (
  <>
    <div style={{ position: "relative", margin: 25 }}>
      <BorderShadow position="top" />
      <Text children="THIS IS default" />
    </div>
    <div style={{ position: "relative", margin: 25 }}>
      <BorderShadow position="top" shadow={false} />
      <Text children="THIS IS only border" />
    </div>
    <div style={{ position: "relative", margin: 25 }}>
      <BorderShadow position="top" border={false} />
      <Text children="THIS IS only shadow" />
    </div>
    <div style={{ position: "relative", margin: 25 }}>
      <BorderShadow position="top" shadow={false} border={false} />
      <Text children="THIS IS all false" />
    </div>
  </>
);
export const Example = ExampleStory.bind({});
