import * as React from "react";
import { action } from "@storybook/addon-actions";
import Preview from "./Preview";
import DemoCmp from "./Demo";

const onLoadSuccess = (event) => {
  action("onLoadSuccess")(event);
  console.log("onLoadSuccess URL", event.target.src);
};

export default {
  title: "Core/Preview",
  component: Preview,
  args: {
    style: {
      border: "1px solid #f00",
      margin: 25,
    },
    onClick: action("onClick"),
    onDoubleClick: action("onDoubleClick"),
    onLoadError: action("onLoadError"),
    onLoadSuccess: onLoadSuccess,
    placeholderIcon: "settings",
    placeholderLabel: "settings",
  },
};

const Story = (args) => {
  const { onLoadSuccess, onLoadError, loadtimeSrcUrl, loadtimeSucc, srcUrl } =
    args;

  const [loadTime, setLoadTime] = React.useState(0);
  const onLoadTime = React.useCallback(() => {
    setLoadTime(loadTime + 1);
  }, [loadTime]);
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

  const cbLoadError = React.useCallback(
    (event) => {
      onLoadTime();
      onLoadError(event);
    },
    [onLoadError, onLoadTime],
  );
  const cbLoadSuccess = React.useCallback(
    (event) => {
      onLoadTime();
      onLoadSuccess(event);
    },
    [onLoadSuccess, onLoadTime],
  );

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
      <p style={{ margin: "0 10px" }}>
        <span>load time:</span>
        <span style={{ marginLeft: 5, fontWeight: "bold" }}>{loadTime}</span>
      </p>
      <Preview
        {...args}
        mousehover={mousehover}
        previewHeight={previewH}
        previewWidth={previewW}
        onLoadError={cbLoadError}
        onLoadSuccess={cbLoadSuccess}
        srcUrl={
          !!loadtimeSrcUrl && !!loadtimeSucc && loadTime >= loadtimeSucc
            ? loadtimeSrcUrl
            : srcUrl
        }
      />
    </div>
  );
};

const DemoStory = () => <DemoCmp />;
export const Demo = DemoStory.bind({});

export const NoSrc = Story.bind({});

export const SrcNotFound = Story.bind({});
SrcNotFound.args = {
  placeholderIcon: "hide_image",
  placeholderLabel: "not_found",
  srcUrl: "https://upload.wikimedia.org/wikipedia/not-fount.jpg",
  mimeType: "image/jpeg",
};

export const SrcFoundOnTime3 = Story.bind({});
SrcFoundOnTime3.args = {
  placeholderIcon: "hide_image",
  placeholderLabel: "not_found",
  srcUrl: "https://upload.wikimedia.org/wikipedia/not-fount.jpg",
  mimeType: "image/jpeg",
  loadtimeSucc: 3,
  loadtimeSrcUrl: "./images/width_128/test_image1.jpeg",
};

export const SrcImage = Story.bind({});
SrcImage.args = {
  srcUrl: "./images/width_128/test_image1.jpeg",
  mimeType: "image/jpeg",
};

export const SrcVideo = Story.bind({});
SrcVideo.args = {
  srcUrl: "./video/width_128/test_video.mp4",
  mimeType: "video/mp4",
};
