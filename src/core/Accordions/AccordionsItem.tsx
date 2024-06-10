import * as React from "react";
import { createUseStyles } from "react-jss";
import BtnBase from "../BtnBase";
import classnames from "classnames";
import { IAccordion } from "./interfaces";

const useStyles = createUseStyles({
  accordionHeader: {
    display: "flex",
    "flex-direction": "row",
    "align-items": "stretch",
    width: "-webkit-fill-available",
    overflow: "hidden",
    "text-overflow": "ellipsis",
  },
  accordionContent: {
    flex: "none",
    height: 0,
    transition: "all 250ms",
    overflow: "hidden",
  },
  accordionContentExpanded: {
    flex: 1,
    height: "initial",
    "overflow-y": "overlay",
  },
});

interface IAccordionsCmp extends IAccordion {
  color: string;
  selected: boolean;
  onClick: (id: string, expanded: boolean) => void;
}

const AccordionsCmp = ({
  id,
  color,
  selected,
  onClick,
  headerNode,
  contentNode,
}: IAccordionsCmp) => {
  const classes = useStyles({});
  const cbClick = React.useCallback(() => {
    onClick(id, !selected);
  }, [id, onClick, selected]);

  return (
    <>
      <BtnBase
        color={color}
        className={classes.accordionHeader}
        onClick={cbClick}
        children={headerNode}
      />
      <div
        className={classnames({
          [classes.accordionContent]: true,
          [classes.accordionContentExpanded]: selected,
        })}
        children={contentNode}
      />
    </>
  );
};

export default AccordionsCmp;
