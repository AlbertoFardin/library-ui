import ViewerVideo from ".";
import DemoCmp from "./Demo";

export default {
  title: "core/ViewerVideo",
  component: ViewerVideo,
};

const ExampleStory = (args) => {
  const { srcUrl } = args;
  return (
    <div
      style={{
        height: "inherit",
        width: "inherit",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        border: "1px solid #f00",
      }}
    >
      <ViewerVideo src={srcUrl} />
    </div>
  );
};

const DemoStory = () => <DemoCmp />;
export const Demo = DemoStory.bind({});

const protocol = window.location.protocol; // Es: 'https:' o 'http:'
const host = window.location.hostname; // Es: 'www.example.com' (senza la porta)
const port = window.location.port;
const baseUrl = `${protocol}//${host}${port ? `:${port}` : ""}`;

export const SrcFoundVideo = ExampleStory.bind({});
SrcFoundVideo.args = {
  srcUrl: `${baseUrl}/video/width_128/test_video.mp4`,
};

export const SrcNotFoundVideo = ExampleStory.bind({});
SrcNotFoundVideo.args = {
  srcUrl: "https://upload.wikimedia.org/wikipedia/not-found.mp4",
};
