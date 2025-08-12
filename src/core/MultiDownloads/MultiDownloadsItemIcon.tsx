import { getTheme } from "../../theme";
import CircularProgress from "../CircularProgress";
import BtnClickDownload from "./BtnClickDownload";
import BtnAutoDownload from "./BtnAutoDownload";
import Btn from "../Btn";
import { IMultiDownloadsItem, LinkTarget } from "./interfaces";
import BtnCopyUrl from "./BtnCopyUrl";

const MultiDownloadsItemIcon = ({
  data,
  onCopyUrlToClipboard,
  linkTarget,
}: {
  data: IMultiDownloadsItem;
  onCopyUrlToClipboard: (url: string) => void;
  linkTarget?: LinkTarget;
}) => {
  const { loading, name, url, tooltip, error, onClick } = data;
  const styleBtn = { marginRight: 4 };

  if (loading)
    return (
      <CircularProgress
        color={getTheme().colors.theme2}
        style={{ padding: "0 8px" }}
        size={16}
      />
    );

  if (error)
    return (
      <Btn
        small
        variant="bold"
        color={getTheme().colors.msgFail}
        icon="warning"
        tooltip={tooltip}
        selected
        style={styleBtn}
      />
    );

  if (!!onClick)
    return (
      <>
        <BtnCopyUrl url={url} onClick={onCopyUrlToClipboard} />
        <BtnClickDownload
          url={url}
          name={name}
          tooltip={tooltip}
          onClick={onClick}
          style={styleBtn}
          linkTarget={linkTarget}
        />
      </>
    );

  return (
    <>
      <BtnCopyUrl url={url} onClick={onCopyUrlToClipboard} />
      <BtnAutoDownload
        url={url}
        name={name}
        tooltip={tooltip}
        style={styleBtn}
        linkTarget={linkTarget}
      />
    </>
  );
};

export default MultiDownloadsItemIcon;
