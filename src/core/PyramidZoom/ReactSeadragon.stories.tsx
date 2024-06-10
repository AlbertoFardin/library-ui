import * as React from "react";
import ReactSeadragon from "./ReactSeadragon";
import { FieldText } from "../Field";

// const defaultTileSources = 'http://openseadragon.github.io/example-images/highsmith/highsmith.dzi'
const defaultTileSources =
  "https://openseadragon.github.io/example-images/highsmith/highsmith.dzi";

const DemoReactSeadragon = () => {
  const [tileSources, setTileSources] = React.useState(defaultTileSources);
  return (
    <div
      style={{
        width: "inherit",
        height: "inherit",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <FieldText
        label="Url dzi image"
        value={tileSources}
        multiline
        style={{ width: 700, padding: 10 }}
        onChange={setTileSources}
      />
      <ReactSeadragon tileSources={tileSources} />
    </div>
  );
};

export default {
  title: "Core/PyramidZoom/ReactSeadragon",
  component: ReactSeadragon,
};

const Story = () => <DemoReactSeadragon />;
export const Example = Story.bind({});
