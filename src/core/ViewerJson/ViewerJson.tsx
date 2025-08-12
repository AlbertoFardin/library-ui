import * as React from "react";
import ReactJson from "react-json-view";
import classnames from "classnames";
import parseJson, { ParseJsonResult } from "./utils/parseJson";
import getJsonViewerTheme from "./utils/getJsonViewerTheme";
import { defaultIndentWidth } from "./utils/constants";
import useStyles from "./utils/useStyles";

export interface IViewerJson {
  value: string;
  theme?: string;
  collapsed?: boolean;
  enableClipboard?: boolean;
  displayDataTypes?: boolean;
  displayObjectSize?: boolean;
  showParseMessage?: boolean;
  indentWidth?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * is valid ReactJson src
 * Valid ReactJson src are object and array.
 * @param obj
 * @returns
 */
const isValidSrc = (obj): boolean => {
  return obj !== null && (typeof obj === "object" || Array.isArray(obj));
};

const ViewerJson = ({
  value = "",
  theme = "brightInverted",
  collapsed = false,
  enableClipboard = true,
  displayDataTypes = false,
  displayObjectSize = false,
  showParseMessage = true,
  indentWidth = defaultIndentWidth,
  className,
  style,
}: IViewerJson) => {
  const classes = useStyles({});
  const [jsonResult, setJsonResult] = React.useState<ParseJsonResult>({
    success: false,
    error: "",
  });
  const reactJsonTheme = getJsonViewerTheme(theme);

  React.useEffect(() => {
    const result = parseJson(value);
    setJsonResult(result);
  }, [value, reactJsonTheme]);

  return (
    <div
      className={classnames({
        [classes.container]: true,
        [className]: !!className,
      })}
      style={style}
    >
      {jsonResult.success === true ? (
        isValidSrc(jsonResult.jsonObject) ? (
          <ReactJson
            src={jsonResult.jsonObject}
            theme={reactJsonTheme}
            collapsed={collapsed}
            enableClipboard={enableClipboard}
            displayDataTypes={displayDataTypes}
            displayObjectSize={displayObjectSize}
            name={false}
            iconStyle={"triangle"}
            indentWidth={indentWidth}
          />
        ) : (
          <div className={classes.valueContainer}>{value}</div>
        )
      ) : (
        <>
          {showParseMessage && jsonResult.error && (
            <div className={classes.errorMessage}>{jsonResult.error}</div>
          )}
          <div className={classes.valueContainer}>{value}</div>
        </>
      )}
    </div>
  );
};

export default React.memo(ViewerJson);
