import CardDraggable from "./CardDraggable";
import Toolbar from "../Toolbar";
import Icon from "../Icon";
import Text from "../Text";

export default {
  title: "core/CardDraggable",
  component: CardDraggable,
};

const dragCls = "draggableCls_story";

const ExampleStory = () => (
  <>
    <div
      style={{
        position: "relative",
        height: "inherit",
        width: "inherit",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        border: "1px solid #f00",
      }}
    >
      <Text weight="bolder">Fixed text</Text>
      <CardDraggable
        dragCls={dragCls}
        position={{
          top: 50,
          left: 150,
        }}
        cardProps={{
          style: { width: 200, height: 200 },
          elevation: 3,
        }}
      >
        <Toolbar style={{ backgroundColor: "#f00" }} className={dragCls}>
          <Icon children="drag_indicator" />
          <Text children="DRAG HERE" />
        </Toolbar>
        <div style={{ flex: 1 }}>
          <Text children="CARD CONTENT" />
        </div>
      </CardDraggable>
      <Text>Other text</Text>
    </div>
  </>
);
export const Example = ExampleStory.bind({});
