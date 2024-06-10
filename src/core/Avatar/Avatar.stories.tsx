import * as React from "react";
import Avatar from ".";

export default {
  title: "Core/Avatar",
  component: Avatar,
};

const src = "./images/width_128/test_image1.jpeg";
const ExampleStory = () => (
  <>
    <Avatar style={{ margin: 5 }} size={100} src={src} />
    <Avatar style={{ margin: 5 }} src={src} />
    <Avatar style={{ margin: 5 }} size={100} src={"./undefined"} />
    <Avatar style={{ margin: 5 }} src={"./undefined"} />
    <Avatar style={{ margin: 5 }} size={100} src={null} />
    <Avatar style={{ margin: 5 }} src={null} />
    <Avatar style={{ margin: 5 }} size={100} text="AB" />
    <Avatar style={{ margin: 5 }} text="AB" />
    <Avatar style={{ margin: 5 }} size={100} icon="settings" />
    <Avatar style={{ margin: 5 }} icon="settings" />
  </>
);
export const Example = ExampleStory.bind({});
