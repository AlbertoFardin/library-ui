import * as deviceUtils from "./deviceUtils";
import InputText from "../stories/InputText";
import Text from "../core/Text";
import Divider from "../core/Divider";

export default {
  title: "utils/deviceUtils",
};

const DemoComponent = () => {
  return (
    <div
      style={{
        height: "inherit",
        width: "inherit",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Text
        weight="bolder"
        size={3}
        style={{ margin: 10 }}
        children="deviceUtils"
      />
      <Text
        style={{ margin: 10 }}
        children="funzioni di utilità per intercettare i device utilizzatori"
      />
      <Divider style={{ margin: 10 }} />
      <InputText
        label="isMacintosh"
        disabled
        value={String(deviceUtils.isMacintosh())}
      />
      <InputText
        label="isWindows"
        disabled
        value={String(deviceUtils.isWindows())}
      />
      <InputText
        label="isMobile"
        disabled
        value={String(deviceUtils.isMobile())}
      />
      <InputText
        label="isDeviceLandscape"
        disabled
        value={String(deviceUtils.isDeviceLandscape())}
      />
      <InputText
        label="isBrowserChrome"
        disabled
        value={String(deviceUtils.isBrowserChrome())}
      />
    </div>
  );
};

export const Demo = DemoComponent.bind({});
