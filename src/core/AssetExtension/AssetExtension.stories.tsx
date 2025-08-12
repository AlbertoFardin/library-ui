import AssetExtension from ".";

const s = { margin: 10, border: "1px solid #f00" };

export default {
  title: "core/AssetExtension",
  component: AssetExtension,
};

const Story = () => (
  <div style={{ height: "100%", width: "100%" }}>
    <AssetExtension style={s} mimeType="image/png" />
    <AssetExtension style={s} mimeType="image/jpeg" />
    <AssetExtension style={s} mimeType="application/msword" />
    <AssetExtension style={s} mimeType="audio/mp4" />
    <AssetExtension style={s} mimeType="video/avi" />
    <AssetExtension style={s} mimeType="xxxx-undefined-xxx" />
  </div>
);

export const Example = Story.bind({});
