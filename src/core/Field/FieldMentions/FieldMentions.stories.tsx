import { action } from "@storybook/addon-actions";
import * as React from "react";
import DemoFieldMentions from "./Demo";
import FieldMentions from "./FieldMentions";
import { style } from "../utils/story";
import { IUserMock, IUserType } from "../../../utils/getUser";

const urlImage = "./images/width_128/test_image1.jpeg";
const urlImage2 = "./images/width_128/test_image2.jpeg";
const urlImage3 = "./images/width_128/test_image4.jpeg";
const urlImage4 = "./images/width_128/test_image3.jpeg";

const users: IUserMock[] = [
  {
    id: "_id1",
    avatar: urlImage,
    firstName: "Laura",
    lastName: "Rossi",
  },
  {
    id: "_id2",
    avatar: urlImage2,
    firstName: "Marta",
    lastName: "Draghi",
  },
  {
    id: "_id3",
    avatar: urlImage3,
    firstName: "Elisa",
    lastName: "Tommasi",
  },
  {
    id: "_id4",
    avatar: urlImage4,
    firstName: "Genoveffa",
    lastName: "Strudel",
  },
].map((u) => ({
  ...u,
  type: IUserType.USER,
  name: u.firstName + " " + u.lastName,
  avatarIcon: "person",
  avatarText: "A",
}));

export default {
  title: "Core/Field/FieldMentions",
  component: FieldMentions,
  args: {
    label: "FieldMentions",
    onChange: action("onChange"),
    style,
    users,
    value:
      "Hi @[Laura Rossi](id:_id1)  👋 Do you see @[Elisa Tommasi](id:_id3) ?",
  },
};

const DemoStory = () => <DemoFieldMentions />;
export const Demo = DemoStory.bind({});

const Story = (args) => <FieldMentions {...args} />;
export const Default = Story.bind({});
