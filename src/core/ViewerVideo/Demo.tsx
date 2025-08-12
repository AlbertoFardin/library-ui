import * as React from "react";
import Toolbar from "../Toolbar";
import Btn from "../Btn";
import { FieldText } from "../Field";
import ViewerVideo from "./ViewerVideo";

const DemoViewerVideo = () => {
  const [srcUrl, setSrcUrl] = React.useState(
    "./video/width_128/test_video.mp4",
  );
  const onSetVid1 = React.useCallback(() => {
    setSrcUrl(
      "https://videos.pexels.com/video-files/7484641/7484641-hd_1080_1920_24fps.mp4",
    );
  }, []);
  const onSetVid2 = React.useCallback(() => {
    setSrcUrl(
      "https://videos.pexels.com/video-files/7492891/7492891-uhd_2560_1440_25fps.mp4",
    );
  }, []);
  const onSetVidErr = React.useCallback(() => {
    setSrcUrl("https://upload.wikimedia.org/wikipedia/not-found.mp4");
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", height: "inherit" }}
    >
      <Toolbar>
        <FieldText style={{ flex: 1 }} value={srcUrl} onChange={setSrcUrl} />
        <div style={{ minWidth: 50 }} />
        <Btn variant="bold" color="#f00" label="video1" onClick={onSetVid1} />
        <Btn variant="bold" color="#f00" label="video2" onClick={onSetVid2} />
        <Btn
          variant="bold"
          color="#f00"
          label="videoErr"
          onClick={onSetVidErr}
        />
      </Toolbar>
      <div
        style={{
          flex: 1,
          display: "flex",
          boxSizing: "border-box",
          border: "1px solid #f00",
        }}
      >
        <ViewerVideo src={srcUrl} />
      </div>
    </div>
  );
};

export default DemoViewerVideo;
