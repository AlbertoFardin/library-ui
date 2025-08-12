import * as React from "react";
import Draggable from "react-draggable";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import Portal from "../Portal";
import { getTheme } from "../../theme";
import Card, { ICard } from "../Card";

const useStyles = createUseStyles({
  draggable: {
    position: "fixed",
    "z-index": getTheme().zIndex.modal,
    height: "fit-content",
    width: "fit-content",
  },
  card: {
    display: "flex",
    "flex-direction": "column",
    "align-items": "stretch",
    overflow: "hidden",
    "min-height": 50,
    "min-width": 50,
  },
});

export interface ICardDraggable {
  dragCls: string;
  children: JSX.Element | React.ReactNode;
  position: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  cardProps: ICard;
}
const CardDraggable = ({
  dragCls,
  children,
  position,
  cardProps,
}: ICardDraggable) => {
  const classes = useStyles({});
  return (
    <Portal>
      <Draggable handle={`.${dragCls}`} bounds="parent">
        <div className={classes.draggable} style={position}>
          <Card
            elevation={6}
            {...cardProps}
            className={classnames({
              [classes.card]: true,
              [cardProps.className]: !!cardProps.className,
            })}
            children={children}
          />
        </div>
      </Draggable>
    </Portal>
  );
};

export default CardDraggable;
