import * as React from "react";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import { v4 as uuidv4 } from "uuid";
import { getTheme } from "../../theme";
import { Collapse } from "../Transitions";
import Divider from "../Divider";
import List from "../List";
import Toolbar from "../Toolbar";
import Text from "../Text";
import Btn from "../Btn";
import emptyFn from "../../utils/emptyFn";
import { IMultiDownloads } from "./interfaces";
import MultiDownloadsItem from "./MultiDownloadsItem";
import IconDrag from "../IconDrag";
import CardDraggable from "../CardDraggable";

const dragCls = `multidownload_drag_${uuidv4()}`;
const useStyles = createUseStyles({
  draggableDownloads: {
    width: 410,
  },
  toolbar: {
    cursor: "move",
    padding: "0 10px",
    transition: "250ms all",
    backgroundColor: getTheme().colors.background,
    "&:hover": {
      backgroundColor: getTheme().colors.mousehover,
    },
  },
  toolbarButton: {
    margin: "0 !important",
  },
  list: {
    padding: 0,
    maxHeight: 163,
    overflowY: "overlay",
  },
});

const MultiDownloads = ({
  className,
  style,
  items = [],
  onClose = emptyFn,
  open,
  onCopyUrlToClipboard,
  linkTarget = "_self",
}: IMultiDownloads) => {
  const classes = useStyles({});

  const [expanded, setExpanded] = React.useState(true);
  const onExpanded = React.useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);
  const [info, setInfo] = React.useState(false);
  const onInfoShow = React.useCallback(() => setInfo(true), []);
  const onInfoHide = React.useCallback(() => setInfo(false), []);

  if (!open) return null;

  return (
    <CardDraggable
      dragCls={dragCls}
      position={{
        bottom: 25,
        left: 25,
      }}
      cardProps={{
        style,
        className: classnames({
          [classes.draggableDownloads]: true,
          [className]: !!className,
        }),
      }}
    >
      <Toolbar
        className={classnames([dragCls, classes.toolbar])}
        onMouseEnter={onInfoShow}
        onMouseLeave={onInfoHide}
      >
        <IconDrag open={info} />
        <Text
          size={2}
          weight="bolder"
          style={{ marginLeft: 10 }}
          children="Downloads"
        />
        <div style={{ flex: 1 }} />
        <Btn
          className={classes.toolbarButton}
          icon={expanded ? "expand_less" : "expand_more"}
          onClick={onExpanded}
        />
        <Btn className={classes.toolbarButton} icon="close" onClick={onClose} />
      </Toolbar>
      <Collapse open={expanded}>
        <>
          <Divider />
          <List className={classes.list}>
            {items.map((d) => (
              <MultiDownloadsItem
                key={d.id}
                data={d}
                onCopyUrlToClipboard={onCopyUrlToClipboard}
                linkTarget={linkTarget}
              />
            ))}
          </List>
        </>
      </Collapse>
    </CardDraggable>
  );
};

export default MultiDownloads;
