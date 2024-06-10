import * as React from "react";
import { getTheme } from "../../theme";
import Btn from "../Btn";

interface IBtnCopyUrl {
  className?: string;
  style?: React.CSSProperties;
  url: string;
  onClick?: (url: string) => void;
}

const BtnCopyUrl = ({ className, style, url, onClick }: IBtnCopyUrl) => {
  const onClickBtnCopyToClipboard = React.useCallback(() => {
    onClick(url);
  }, [onClick, url]);

  if (!onClick) return null;

  return (
    <Btn
      className={className}
      style={style}
      color={getTheme().colors.theme2}
      copyToClipboard={url}
      icon="content_copy"
      tooltip="Copy in clipboard"
      onClick={onClickBtnCopyToClipboard}
      small
    />
  );
};

export default BtnCopyUrl;
