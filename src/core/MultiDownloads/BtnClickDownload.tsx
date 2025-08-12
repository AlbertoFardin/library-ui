import * as React from "react";
import Btn from "../Btn";
import { getTheme } from "../../theme";
import { LinkTarget } from "./interfaces";

const BtnClickDownload = ({
  style,
  url,
  name,
  tooltip,
  onClick,
  linkTarget = "_self",
}: {
  style?: React.CSSProperties;
  url: string;
  name: string;
  tooltip?: string;
  onClick: () => void;
  linkTarget?: LinkTarget;
}) => {
  const linkRef = React.useRef(null);
  const cbOnClick = React.useCallback(() => {
    linkRef.current.click();
    onClick();
  }, [onClick]);
  return (
    <a
      ref={linkRef}
      rel="noreferrer"
      target={linkTarget}
      href={url}
      download={name}
      style={{ textDecoration: "none" }}
      children={
        <Btn
          small
          variant="bold"
          color={getTheme().colors.theme2}
          icon="file_download"
          tooltip={tooltip}
          onClick={cbOnClick}
          style={style}
        />
      }
    />
  );
};

export default BtnClickDownload;
