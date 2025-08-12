import * as React from "react";
import Skeleton from "./Skeleton";
import InputText from "../../stories/InputText";

export default {
  title: "core/Skeleton",
  component: Skeleton,
};

const ExampleStory = () => {
  const [animation, setAnimation] = React.useState("pulse" as "pulse" | "wave");
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div style={{ flex: 1 }} />
      <Skeleton height={200} width={200} animation={animation} />
      <InputText
        style={{ width: 250, margin: 10 }}
        label="animation (pulse, wave)"
        value={animation}
        onChange={setAnimation}
      />
      <div style={{ flex: 1 }} />
    </div>
  );
};
export const Example = ExampleStory.bind({});

const AnimStory = (args) => <Skeleton {...args} />;

export const AnimPulse = AnimStory.bind({});
AnimPulse.args = {
  animation: "pulse",
  height: 200,
  width: 200,
  style: { border: "1px solid red", margin: 20 },
};

export const AnimWave = AnimStory.bind({});
AnimWave.args = {
  animation: "wave",
  height: 200,
  width: 200,
  style: { border: "1px solid red", margin: 20 },
};
