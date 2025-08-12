import * as React from "react";
import Icon from "../Icon";
import Toolbar from "../Toolbar";
import Text from "../Text";
import Accordions from ".";
import { getTheme } from "../../theme";

const IconAdd = () => <Icon children="add" style={{ marginRight: 15 }} />;
const headerStyle = {
  borderBottom: `1px solid ${getTheme().colors.grayBorder}`,
  backgroundColor: getTheme().colors.grayDrawer,
  padding: "5px 15px",
  display: "flex",
  width: "100%",
};
const panels = [
  {
    id: "1",
    headerNode: (
      <div style={headerStyle}>
        <IconAdd />
        <Text
          ellipsis
          children={
            "Long title Long title Long title Long title Long title Long title" +
            " Long title Long title Long title Long title Long title Long title Long title Long title "
          }
        />
      </div>
    ),
    contentNode: (
      <div>
        <Text children="contenuto pannello 1" />
      </div>
    ),
  },
  {
    id: "2",
    headerNode: (
      <Toolbar style={headerStyle}>
        <IconAdd />
        <Text children="Header_2 -- as Toolbar" />
      </Toolbar>
    ),
    contentNode: (
      <Toolbar>
        <Text children="content_2" />
      </Toolbar>
    ),
  },
  {
    id: "3",
    headerNode: (
      <div
        style={{
          ...headerStyle,
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <Toolbar style={{ padding: 0 }}>
          <IconAdd />
          <Text children="Header_3 -- as div complex" />
        </Toolbar>
        <Toolbar style={{ padding: 0 }}>
          <div
            style={{ border: "1px solid red", padding: 10, color: "red" }}
            children="CustomComponent"
          />
        </Toolbar>
      </div>
    ),
    contentNode: (
      <div>
        <Text style={{ height: 200 }} children="contenuto pannello 3A" />
        <Text style={{ height: 200 }} children="contenuto pannello 3B" />
        <Text style={{ height: 200 }} children="contenuto pannello 3C" />
        <Text style={{ height: 200 }} children="contenuto pannello 3A" />
        <Text children="contenuto pannello 3B" />
        <Text children="contenuto pannello 3C" />
        <Text children="contenuto pannello 3A" />
        <Text children="contenuto pannello 3B" />
        <Text children="contenuto pannello 3C" />
      </div>
    ),
  },
];

export default {
  title: "core/Accordions",
  component: Accordions,
};

const Story = () => {
  const [value, setValue] = React.useState("1");
  return <Accordions value={value} items={panels} onChange={setValue} />;
};
export const Example = Story.bind({});
