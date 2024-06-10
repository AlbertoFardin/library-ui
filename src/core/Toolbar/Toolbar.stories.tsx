import * as React from "react";
import Toolbar from ".";
import Text from "../Text";
import Icon from "../Icon";

export default {
  title: "Core/Toolbar",
  component: Toolbar,
};

const CmpStory = () => {
  const ref = React.useRef(null);
  const [render, setRender] = React.useState(false);
  const [count, setCount] = React.useState(0);
  const onCount = React.useCallback(() => {
    setCount(count + 1);
  }, [count]);

  React.useEffect(() => {
    if (!render) setRender(true);
  }, [render]);

  return (
    <>
      <Toolbar style={{ border: "1px solid #f00" }}>
        <Icon children="home" />
        <Text children="This is a toolbar with role 'presentation' " />
        <div style={{ flex: 1 }} />
        <Text children="TEST" />
      </Toolbar>
      <Toolbar style={{ border: "1px solid #00f" }} onClick={onCount}>
        <Icon children="edit" />
        <Text children="This is a toolbar with role 'button' - try click me - COUNT: " />
        <Text children={String(count)} />
      </Toolbar>
      <Toolbar style={{ border: "1px solid #0f0" }} ref={ref}>
        <Icon children="help" />
        <Text children="This is a toolbar with ref " />
      </Toolbar>
      <Text children="ref:" />
      {!render ? null : <Text children={String(ref.current.outerHTML)} />}
    </>
  );
};

export const Example = CmpStory.bind({});
