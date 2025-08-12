import { color, style } from "../utils/story";
import CardDemo from "../../../stories/CardDemo";
import FieldPassThrough from "./FieldPassThrough";
import DemoFieldPassThrough from "./Demo";

const jsonObject = {
  name: "John Doe",
  age: 30,
  address: {
    street: "123 Main St",
    city: "Springfield",
  },
  hobbies: ["Reading", "Traveling", "Gaming"],
  isAdmin: false,
};

export default {
  title: "core/Field/FieldPassThrough",
  component: FieldPassThrough,
  args: {
    value: JSON.stringify(jsonObject),
    label: "Field PassThrough",
    // labelModal: "Field PassThrough Viewer",
    color,
    style,
  },
};

const DemoStory = () => <DemoFieldPassThrough />;
export const Demo = DemoStory.bind({});

const Story = (args) => (
  <CardDemo>
    <FieldPassThrough {...args} />
  </CardDemo>
);
export const Default = Story.bind({});
Default.args = {
  value: "",
};
export const InvalidJson = Story.bind({});

InvalidJson.args = {
  value: "ciao",
};

export const LongValidJson = Story.bind({});
LongValidJson.args = {
  value:
    '{"productId":"1A3LP00812F","colorId":"149","priceList":[{"currencyId":"EUR","storeId":"010026","priceValues":[{"priceTypeId":1,"value":184.0000000000}]},{"currencyId":"EUR","storeId":"010028","priceValues":[{"priceTypeId":1,"value":184.0000000000}]},{"currencyId":"EUR","storeId":"010029","priceValues":[{"priceTypeId":1,"value":184.0000000000}]},{"currencyId":"EUR","storeId":"010037","priceValues":[{"priceTypeId":1,"value":184.0000000000}]},{"currencyId":"EUR","storeId":"010038","priceValues":[{"priceTypeId":1,"value":184.0000000000}]},{"currencyId":"EUR","storeId":"010040","priceValues":[{"priceTypeId":1,"value":184.0000000000}]},{"currencyId":"EUR","storeId":"010071","priceValues":[{"priceTypeId":2,"value":184.0000000000}]},{"currencyId":"EUR","storeId":"020068","priceValues":[{"priceTypeId":1,"value":184.0000000000}]},{"currencyId":"EUR","storeId":"030049","priceValues":[{"priceTypeId":1,"value":184.0000000000}]},{"currencyId":"EUR","storeId":"140039","priceValues":[{"priceTypeId":1,"value":184.0000000000}]},{"currencyId":"EUR","storeId":"160046","priceValues":[{"priceTypeId":1,"value":184.0000000000}]}]}',
  labelModal: "prices",
};

export const ObjectJsonValue = Story.bind({});
ObjectJsonValue.args = {
  value: JSON.stringify({ name: "Mario", age: 30 }),
};

export const EmptyString = Story.bind({});
EmptyString.args = {
  value: "",
};

export const NullValue = Story.bind({});
NullValue.args = {
  value: null,
};

export const InvalidString = Story.bind({});
InvalidString.args = {
  value:
    '"\\"{\\\\\\"eu\\\\\\":\\\\\\"19,99\\\\\\",\\\\\\"us\\\\\\":\\\\\\"24,99\\\\\\",\\\\\\"ru\\\\\\":{\\\\\\"full\\\\\\":\\\\\\"499\\\\\\",\\\\\\"discount\\\\\\":\\\\\\"399\\\\\\"}}\\""',
};
