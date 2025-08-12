import * as React from "react";
import { action } from "@storybook/addon-actions";
import Preview, { IPreview } from "./Preview";
import DemoCmp from "./Demo";

const args: IPreview = {
  style: {
    border: "1px solid #f00",
    margin: 25,
  },
  previewHeight: 300,
  previewWidth: 300,
  srcUrl: "",
  mimeType: "",
  onClick: action("onClick"),
  onDoubleClick: action("onDoubleClick"),
  onLoadFail: action("onLoadFail"),
  onLoadSucc: action("onLoadSucc"),
  placeholderIcon: "settings",
  placeholderLabel: "settings",
};

export default {
  title: "core/Preview",
  component: Preview,
  args,
};

const Story = (args) => {
  const { onLoadSuccess, onLoadError, srcUrl } = args;
  const [previewH, setPreviewH] = React.useState(350);
  const onPreviewH = React.useCallback((event) => {
    setPreviewH(Number(event.target.value));
  }, []);
  const [previewW, setPreviewW] = React.useState(350);
  const onPreviewW = React.useCallback((event) => {
    setPreviewW(Number(event.target.value));
  }, []);
  const [mousehover, setMousehover] = React.useState(false);
  const onMousehover = React.useCallback(() => {
    setMousehover(!mousehover);
  }, [mousehover]);

  return (
    <div>
      <div>
        <button
          style={{ width: 150, margin: 10 }}
          children={`mousehover ${mousehover ? "ON" : "OFF"}`}
          onClick={onMousehover}
        />
        <input
          type="number"
          style={{ width: 50, margin: 5 }}
          value={previewW}
          onChange={onPreviewW}
        />
        x
        <input
          type="number"
          style={{ width: 50, margin: 5 }}
          value={previewH}
          onChange={onPreviewH}
        />
      </div>
      <Preview
        {...args}
        mousehover={mousehover}
        previewHeight={previewH}
        previewWidth={previewW}
        onLoadError={onLoadError}
        onLoadSuccess={onLoadSuccess}
        srcUrl={srcUrl}
      />
    </div>
  );
};

const protocol = window.location.protocol; // Es: 'https:' o 'http:'
const host = window.location.hostname; // Es: 'www.example.com' (senza la porta)
const port = window.location.port;
const baseUrl = `${protocol}//${host}${port ? `:${port}` : ""}`;

const DemoStory = () => <DemoCmp />;
export const Demo = DemoStory.bind({});

export const NoSrc = Story.bind({});

export const SrcNotFound = Story.bind({});
SrcNotFound.args = {
  placeholderIcon: "hide_image",
  placeholderLabel: "not_found",
  srcUrl: "https://upload.wikimedia.org/wikipedia/not-found.jpg",
  mimeType: "image/jpeg",
};

export const SrcImage = Story.bind({});
SrcImage.args = {
  srcUrl: `${baseUrl}/images/width_128/test_image1.jpeg`,
  mimeType: "image/jpeg",
};

export const SrcNotFoundVideo = Story.bind({});
SrcNotFoundVideo.args = {
  placeholderIcon: "hide_image",
  placeholderLabel: "not_found",
  srcUrl: "https://upload.wikimedia.org/wikipedia/not-found.mp4",
  mimeType: "video/mp4",
};

export const SrcVideo = Story.bind({});
SrcVideo.args = {
  srcUrl: `${baseUrl}/video/width_128/test_video.mp4`,
  mimeType: "video/mp4",
};

export const SrcFont = Story.bind({});
SrcFont.args = {
  srcUrl: `${baseUrl}/sb-common-assets/fonts.css`,
  mimeType: "text/css",
};
