import * as React from "react";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import Text from "../Text";
import { getTheme } from "../../theme";
import * as extensions from "../../utils/extensions.json";

export const getExtension = (mimeType: string): string => {
  const k = Object.keys(extensions).find((k) => {
    return extensions[k].mime === mimeType;
  });
  if (!!k) {
    return String(k).toLocaleUpperCase();
  }
  return undefined;
};

const useStyles = createUseStyles({
  extension: {
    zIndex: 1,
    color: getTheme().colors.typography,
    backgroundColor: getTheme().colors.isDark
      ? "rgba(0, 0, 0, 0.6)"
      : "rgba(250, 250, 250, 0.8)",
    borderRadius: getTheme().borderRadius,
    padding: "1px 6px",
    height: 20,
    width: "fit-content",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

export interface IAssetExtension {
  className?: string;
  style?: React.CSSProperties;
  mimeType: string;
}

const AssetExtension = ({ className, style, mimeType }: IAssetExtension) => {
  const classes = useStyles({});
  const ext = getExtension(mimeType);
  if (!ext) return null;
  return (
    <div
      style={style}
      className={classnames({
        [classes.extension]: true,
        [className]: !!className,
      })}
    >
      <Text children={ext} />
    </div>
  );
};

export default AssetExtension;
