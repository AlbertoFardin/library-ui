import * as React from "react";
import ImageZoom from "./ImageZoom";
import { FieldText } from "../Field";
import Divider from "../Divider";
import Toolbar from "../Toolbar";
import Text from "../Text";
import { getTheme } from "../../theme";
import SegmentedButton, { ISegmentedButtonOption } from "../SegmentedButton";

const examples: ISegmentedButtonOption[] = [
  {
    id: "https://openseadragon.github.io/example-images/highsmith/highsmith.dzi",
    text: "Cathedral",
    icon: "filter_1",
  },
  {
    id: "https://openseadragon.github.io/example-images/pnp/pan/6a32000/6a32400/6a32487.dzi",
    text: "Troop",
    icon: "filter_2",
  },
  {
    id: "",
    text: "Undefined",
    icon: "filter",
  },
  {
    id: "https://openseadragon.github.io/error",
    text: "Error",
    icon: "warning",
  },
  {
    id: "https://api-test.wardacloud.com/mcr/media-content/729d462d-1245-4c4d-8090-e2abc9b87637/zoom-tiles/tiles.dzi",
    text: "SC test demo - product://WD755000030033S01/color:333 vista F ",
    icon: "filter",
  },
  {
    id: "https://api-test.wardacloud.com/mcr/media-content/eebad04b-bf2d-40c9-84bf-556ed5d3b437/zoom-tiles/tiles.dzi",
    text: "SC test demo - in touchpoint LIBRARY-UI",
    icon: "filter",
  },
  {
    id: "https://api-dev.wardacloud.com/mcr/media-content/fe6feb5b-0781-4ce6-9703-9dd069ab915b/zoom-tiles/tiles.dzi",
    text: "SC dev demo - in touchpoint LIBRARY-UI",
    icon: "filter",
  },
];

const Demo = () => {
  const [srcId, setSrcId] = React.useState(examples[0].id);
  const [idToken, setIdToken] = React.useState("");
  const getAuthorization = React.useMemo(() => {
    let getAuthorization: () => string;
    if (
      !!srcId &&
      !!idToken &&
      idToken.length > 0 &&
      new URL(srcId).origin.endsWith(".wardacloud.com")
    ) {
      getAuthorization = () => `Bearer ${idToken}`;
    }
    return getAuthorization;
  }, [srcId, idToken]);

  return (
    <div
      style={{
        width: "inherit",
        height: "inherit",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#000",
      }}
    >
      <Toolbar style={{ backgroundColor: getTheme().colors.grayDrawer }}>
        <Text
          style={{ margin: "0 15px" }}
          weight="bolder"
          children="URL DZI:"
        />
        <FieldText style={{ width: 500 }} value={srcId} onChange={setSrcId} />
        <Text
          style={{ margin: "0 15px" }}
          weight="bolder"
          children="ID TOKEN:"
        />
        <FieldText
          style={{ width: 500 }}
          value={idToken}
          onChange={setIdToken}
        />
      </Toolbar>
      <Divider />
      <ImageZoom src={srcId} getAuthorization={getAuthorization} />
      <Divider />
      <Toolbar style={{ backgroundColor: getTheme().colors.grayDrawer }}>
        <SegmentedButton value={srcId} options={examples} onChange={setSrcId} />
      </Toolbar>
    </div>
  );
};

export default {
  title: "core/ImageZoom",
  component: ImageZoom,
};

const Story = () => <Demo />;
export const Example = Story.bind({});
