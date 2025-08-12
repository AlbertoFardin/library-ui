import classnames from "classnames";
import { createUseStyles } from "react-jss";
import AccordionsItem from "./AccordionsItem";
import { IAccordions, IAccordion } from "./interfaces";
import { getTheme } from "../../theme";

const useStyles = createUseStyles({
  accordion: {
    width: "100%",
    height: "inherit",
    display: "flex",
    "flex-direction": "column",
    "align-items": "stretch",
  },
});

const Accordions = ({
  style,
  className,
  onChange,
  items,
  value,
}: IAccordions) => {
  const theme = getTheme();
  const color = theme.colors.theme1;
  const classes = useStyles({});

  return (
    <div
      style={style}
      className={classnames({
        [classes.accordion]: true,
        [className]: !!className,
      })}
    >
      {items.map((p: IAccordion) => (
        <AccordionsItem
          {...p}
          key={p.id}
          color={color}
          selected={p.id === value}
          onClick={onChange}
        />
      ))}
    </div>
  );
};

export default Accordions;
