import * as React from "react";
import Card from ".";
import Text from "../Text";
import { action } from "@storybook/addon-actions";

const style = { padding: 25, margin: 25 };

export default {
  title: "Core/Card",
  component: Card,
};

const ExampleStory = () => (
  <Card style={style}>
    <Text children="THIS IS A CARD" />
  </Card>
);
export const Example = ExampleStory.bind({});

const ElevationStory = () => (
  <>
    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((k: number) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <Card key={k} elevation={k as any} style={style}>
        <Text children={`elevation_${k}`} />
      </Card>
    ))}
    <div style={{ minHeight: 50 }} />
  </>
);
export const Elevation = ElevationStory.bind({});

const ActionsStory = () => (
  <Card
    style={style}
    onClick={action("onClick")}
    onDoubleClick={action("onDoubleClick")}
    onContextMenu={action("onContextMenu")}
    onMouseEnter={action("onMouseEnter")}
    onMouseLeave={action("onMouseLeave")}
  >
    <Text children="THIS IS A CARD with actions" />
  </Card>
);
export const Actions = ActionsStory.bind({});
