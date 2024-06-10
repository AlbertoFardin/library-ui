import * as React from "react";
import Text from "../Text";
import { createUseStyles } from "react-jss";
import { IFacetToggle } from "./interfaces";
import FacetToggleButton from "./FacetToggleButton";
import Tooltip from "../Tooltip";
import classnames from "classnames";
import { getTheme } from "../../theme";

const useStyles = createUseStyles({
  facetToggle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  divider: {
    flex: 1,
    display: "flex",
  },
  buttons: {
    display: "flex",
    backgroundColor: getTheme().colors.background,
    boxShadow: "0 0 2px 0px rgb(0, 0, 0, 0.15)",
    borderRadius: getTheme().borderRadius,
    overflow: "hidden",
    maxWidth: 140,
    boxSizing: "border-box",
  },
});

const FacetToggle = ({
  className,
  style,
  help,
  label,
  color = getTheme().colors.theme1,
  actions,
  onChange,
}: IFacetToggle) => {
  const classes = useStyles({});
  return (
    <div
      className={classnames({
        [classes.facetToggle]: true,
        [className]: !!className,
      })}
      style={style}
    >
      {!label ? null : <Text weight="bolder" children={label} />}
      <div style={{ flex: 1 }} />
      <Tooltip title={help}>
        <div className={classes.buttons}>
          {actions.map((a) => (
            <FacetToggleButton
              key={a.id}
              onClick={onChange}
              color={color}
              {...a}
            />
          ))}
        </div>
      </Tooltip>
    </div>
  );
};

export default FacetToggle;
