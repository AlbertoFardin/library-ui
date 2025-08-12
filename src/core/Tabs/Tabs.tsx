import Toolbar from "../Toolbar";
import { getTheme } from "../../theme";
import TabsItem from "./TabsItem";
import { ITabs } from "./interfaces";

const Tabs = ({
  className,
  style,
  onChange,
  items,
  value,
  color: colorProp,
}: ITabs) => {
  const theme = getTheme();
  const color = colorProp || theme.colors.theme1;
  const borderRadius = theme.borderRadius;

  return (
    <Toolbar
      style={{ ...style, alignItems: "stretch", overflowY: "hidden" }}
      className={className}
    >
      <div style={{ flex: 1 }} />
      {items.map((t) => (
        <TabsItem
          {...t}
          key={t.id}
          color={color}
          borderRadius={borderRadius}
          selected={t.id === value}
          onClick={onChange}
        />
      ))}
      <div style={{ flex: 1 }} />
    </Toolbar>
  );
};

export default Tabs;
