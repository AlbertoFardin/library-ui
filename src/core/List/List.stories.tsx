import { action } from "@storybook/addon-actions";
import List from "./List";
import ListItem from "../ListItem";

export default {
  title: "core/List",
  component: List,
};

const Story = () => (
  <List
    style={{
      width: "auto",
      margin: 25,
      maxHeight: 220,
      border: "1px solid #f00",
    }}
  >
    <div role="presentation" onClick={action("onClick_nav")}>
      <ListItem
        id="nav"
        label="nav_clickPropagation"
        style={{ padding: 10, borderBottom: "1px solid #00f" }}
        onClick={action("onClick_nav_item")}
        clickPropagation
      />
    </div>
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((n) => (
      <ListItem
        key={n}
        id={String(n)}
        label={String(`ListItem_${n}`)}
        style={{ padding: 10, borderBottom: "1px solid #00f" }}
        onClick={action(`onClick_${n}`)}
      />
    ))}
  </List>
);

export const Default = Story.bind({});
