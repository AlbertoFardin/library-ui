import * as React from "react";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import { WIDTH_INPUT } from "./utils";
import BtnCheckbox from "../../core/BtnCheckbox";
import Icon from "../../core/Icon";
import { getTheme } from "../../theme";

const color = getTheme().colors.theme1;
const useStyles = createUseStyles({
  button: {
    width: WIDTH_INPUT,
    marginBottom: 5,
    boxSizing: "border-box",
  },
  buttonCheckbox: {
    alignSelf: "start",
    marginTop: 2,
  },
  buttonText: {
    zIndex: 2,
  },
  buttonMandatory: {
    color: "#f00",
    marginLeft: 2,
  },
  buttonLink: {
    color,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "fit-content",
  },
  buttonLinkText: {
    color,
    "&:hover": {
      textDecoration: "underline",
    },
  },
  buttonLinkIcon: {
    color,
    fontSize: 12,
    marginLeft: 2,
  },
});

const FieldCheckbox = ({
  className,
  style,
  id,
  selected,
  onChange,
  readOnly,
  required,
  label,
  link,
}: {
  className?: string;
  style?: React.CSSProperties;
  id;
  selected: boolean;
  onChange: (value: boolean, id: string) => void;
  readOnly?: boolean;
  required?: boolean;
  label: string;
  link: string;
}) => {
  const classes = useStyles({});

  const onCheckboxClick = React.useCallback(() => {
    onChange(!selected, id);
  }, [id, onChange, selected]);
  const onOpenLink = React.useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      window.open(link, "_blank");
    },
    [link],
  );

  return (
    <BtnCheckbox
      className={classnames({
        [classes.button]: true,
        [className]: !!className,
      })}
      style={style}
      color={color}
      onClick={onCheckboxClick}
      disabled={readOnly}
      selected={selected}
      checkboxClassName={classes.buttonCheckbox}
      labelClassName={classes.buttonText}
      label={
        <>
          <span>
            <>
              {label}
              {!required ? null : (
                <span className={classes.buttonMandatory} children="*" />
              )}
            </>
          </span>
          {!link ? null : (
            <span
              role="presentation"
              className={classes.buttonLink}
              onClick={onOpenLink}
            >
              <span
                className={classes.buttonLinkText}
                role="presentation"
                children="Open link"
              />
              <Icon className={classes.buttonLinkIcon} children="open_in_new" />
            </span>
          )}
        </>
      }
    />
  );
};

export default FieldCheckbox;
