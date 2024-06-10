import * as React from "react";
import Btn from "../Btn";
import { getTheme } from "../../theme";

interface IBtnAutoDownload {
  style?: React.CSSProperties;
  url: string;
  name: string;
  tooltip?: string;
}

const BtnAutoDownload = ({ style, url, name, tooltip }: IBtnAutoDownload) => {
  const linkRef = React.useRef(null);
  const [mousehover, setMousehover] = React.useState(false);
  const [downloaded, setDownloaded] = React.useState(false);
  const onCbMouseEnter = React.useCallback(() => {
    setMousehover(true);
  }, []);
  const onCbMouseLeave = React.useCallback(() => {
    setMousehover(false);
  }, []);
  const cbOnClick = React.useCallback(() => {
    linkRef.current.click();
  }, []);

  React.useEffect(() => {
    setDownloaded(false);
    setMousehover(false);
  }, [name]);

  React.useEffect(() => {
    if (!downloaded) {
      linkRef.current.click();
      setDownloaded(true);
    }
  }, [downloaded]);

  return (
    <a
      ref={linkRef}
      href={url}
      download={name}
      style={{ textDecoration: "none" }}
      children={
        <Btn
          small
          variant="bold"
          color={
            !downloaded || mousehover
              ? getTheme().colors.theme2
              : getTheme().colors.msgSucc
          }
          icon={mousehover ? "file_download" : "check"}
          onClick={cbOnClick}
          tooltip={tooltip}
          onMouseEnter={onCbMouseEnter}
          onMouseLeave={onCbMouseLeave}
          style={style}
        />
      }
    />
  );
};

export default BtnAutoDownload;
