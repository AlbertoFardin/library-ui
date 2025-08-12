import * as React from "react";
import useStyles from "../utils/useStyles";
import ViewerJson from "../../ViewerJson";
import makeJsonPretty from "../../ViewerJson/utils/makeJsonPretty";
import EditorWysiwyg from "../../EditorWysiwyg";
import { IDecoratedField, IModalField } from "../utils/fieldInterfaces";
import DecoratedModalField from "../utils/DecoratedModalField";
import { getTheme } from "../../../theme";

export interface IFieldPassThrough extends IDecoratedField, IModalField {
  indentWidth?: number;
}

const FieldPassThrough = (props: IFieldPassThrough) => {
  const {
    color = getTheme().colors.theme1,
    value,
    indentWidth,
    labelModal = "PassTrough viewer",
    ...otherProps
  } = props;
  const classes = useStyles({ color });
  const prettyValue = React.useMemo(
    () => makeJsonPretty({ value, indentWidth }),
    [value, indentWidth],
  );
  const modalEnabled = value != null && value.length > 0;
  const renderBodyFieldElement = React.useCallback(() => {
    return (
      <EditorWysiwyg
        placeholder={"No value"}
        toolbarHidden
        readOnly
        value={prettyValue}
        textSelectable={false}
        linkSelectable={false}
      />
    );
  }, [prettyValue]);

  const renderBodyModalElement = React.useCallback(() => {
    return <ViewerJson value={value} />;
  }, [value]);

  return (
    <DecoratedModalField
      {...otherProps}
      color={color}
      value={value}
      labelModal={labelModal}
      bodyfieldElement={renderBodyFieldElement}
      bodyModalElement={renderBodyModalElement}
      readOnly={true}
      modalEnabled={modalEnabled}
      modalContentClassName={classes.jsonViewerInModal}
      modalSuggestion="Click to open in viewer"
    />
  );
};

export default React.memo(FieldPassThrough);
