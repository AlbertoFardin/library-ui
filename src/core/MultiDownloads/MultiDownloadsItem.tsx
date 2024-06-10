import * as React from "react";
import ListItem from "../ListItem";
import { createUseStyles } from "react-jss";
import { IMultiDownloadsItem } from "./interfaces";
import MultiDownloadsItemIcon from "./MultiDownloadsItemIcon";
import { getTheme } from "../../theme";

const useStyles = createUseStyles({
  listitem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    padding: "3px 10px 3px 20px",
    backgroundColor: getTheme().colors.background,
    "&:hover": {
      backgroundColor: getTheme().colors.mousehover,
    },
  },
});

interface IMultiDownloadsItemCmp {
  data: IMultiDownloadsItem;
  onCopyUrlToClipboard: (url: string) => void;
}
const MultiDownloadsItem = ({
  data,
  onCopyUrlToClipboard,
}: IMultiDownloadsItemCmp) => {
  const classes = useStyles({});
  const { id, name } = data;
  return (
    <ListItem key={id} className={classes.listitem} id={id} label={name}>
      <MultiDownloadsItemIcon
        data={data}
        onCopyUrlToClipboard={onCopyUrlToClipboard}
      />
    </ListItem>
  );
};

export default MultiDownloadsItem;
