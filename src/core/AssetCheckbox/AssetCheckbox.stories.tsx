import { action } from "@storybook/addon-actions";
import AssetCheckbox from ".";
import Text from "../Text";

export default {
  title: "core/AssetCheckbox",
  component: AssetCheckbox,
};

interface IStoryListItem {
  type: "none" | "mousehover" | "always";
  mouseHover: boolean;
  selected: boolean;
}
const StoryListItem = ({ type, mouseHover, selected }: IStoryListItem) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      borderBottom: `1px solid #eee`,
    }}
  >
    <AssetCheckbox
      style={{ margin: 10 }}
      color="#00f"
      icon="image"
      type={type}
      mouseHover={mouseHover}
      selected={selected}
      onClick={action("onClick")}
    />
    <Text style={{ margin: 10 }} size={0} children={`type: ${type}`} />
    <Text
      style={{ margin: 10 }}
      size={0}
      children={`mouseHover: ${mouseHover}`}
    />
    <Text style={{ margin: 10 }} size={0} children={`selected: ${selected}`} />
  </div>
);

const Story = () => (
  <div style={{ height: "100%", width: "100%" }}>
    <StoryListItem type="mousehover" mouseHover={false} selected={false} />
    <StoryListItem type="mousehover" mouseHover={true} selected={false} />
    <StoryListItem type="mousehover" mouseHover={false} selected={false} />
    <StoryListItem type="mousehover" mouseHover={true} selected={true} />
    <StoryListItem type="always" mouseHover={true} selected={false} />
    <StoryListItem type="none" mouseHover={true} selected={false} />
  </div>
);

export const Example = Story.bind({});
