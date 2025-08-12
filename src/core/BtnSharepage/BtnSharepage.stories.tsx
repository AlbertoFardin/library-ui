import { action } from "@storybook/addon-actions";
import BtnSharepage, { IBtnSharepage } from "./BtnSharepage";
import Text from "../Text";

const args: IBtnSharepage = {
  onClick: action("onClick"),
};

export default {
  title: "core/BtnSharepage",
  component: BtnSharepage,
  args,
};

const cases: { title: string; data: IBtnSharepage }[] = [
  {
    title: "Default",
    data: args,
  },
  {
    title: "Default + Clock Active",
    data: {
      ...args,
      dateStart: new Date().getTime() - 1000,
      dateUntil: new Date().getTime() + 1000,
    },
  },
  {
    title: "Default + Clock Pending",
    data: {
      ...args,
      dateStart: new Date().getTime() + 1000,
    },
  },
  {
    title: "Default + Clock Expired",
    data: {
      ...args,
      dateUntil: new Date().getTime() - 1000,
    },
  },
  {
    title: "Security",
    data: {
      ...args,
      security: true,
    },
  },
  {
    title: "Security + Clock Active",
    data: {
      ...args,
      security: true,
      dateStart: new Date().getTime() - 1000,
      dateUntil: new Date().getTime() + 1000,
    },
  },
  {
    title: "Security + Clock Pending",
    data: {
      ...args,
      security: true,
      dateStart: new Date().getTime() + 1000,
    },
  },
  {
    title: "Security + Clock Expired",
    data: {
      ...args,
      security: true,
      dateUntil: new Date().getTime() - 1000,
    },
  },
];

const Story = () => (
  <table style={{ margin: 15 }}>
    <tbody>
      {cases.map((a) => (
        <tr key={a.title}>
          <td style={{ width: 200 }}>
            <Text children={a.title} style={{ fontFamily: "monospace" }} />
          </td>
          <td
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <BtnSharepage {...a.data} layout="button" />
            <BtnSharepage {...a.data} layout="badge" />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export const Default = Story.bind({});
