import * as React from "react";
import Icon from "../Icon";
import Text from "../Text";
import Btn from "../Btn";
import { getTheme } from "../../theme";

const Separator = () => (
  <Icon style={{ color: getTheme().colors.disable }} children="chevron_right" />
);
const Ellipsis = () => (
  <Text
    ellipsis
    key="ellipsis"
    weight="bolder"
    style={{ color: getTheme().colors.disable, userSelect: "none" }}
    children="..."
  />
);
interface IBreadcrumbItem {
  color: string;
  id: string;
  name: string;
  onClick?: (id: string) => void;
}
const BreadcrumbItem = ({ color, id, name, onClick }: IBreadcrumbItem) => {
  const cbClick = React.useCallback(() => {
    onClick(id);
  }, [id, onClick]);
  return (
    <Btn
      color={color}
      label={name}
      style={{ margin: 2 }}
      onClick={!!onClick ? cbClick : undefined}
    />
  );
};

export interface IBreadcrumb {
  color?: string;
  maxItems?: number;
  items: { id: string; name: string }[];
  onClick?: (id: string | number) => void;
}
const Breadcrumb = ({
  color = getTheme().colors.theme1,
  maxItems = 3,
  items = [],
  onClick,
}: IBreadcrumb) =>
  !items.length ? null : (
    <div
      style={{
        display: "flex",
        flex: 1,
        alignItems: "center",
      }}
    >
      {items.reduce(
        (acc, p, index) => {
          const fromVisibleIndex = items.length - maxItems + 1;
          if (index >= fromVisibleIndex && index >= 1) {
            acc.push(<Separator key={"s_" + index} />);
            acc.push(
              <BreadcrumbItem
                key={"d_" + index}
                {...p}
                color={color}
                onClick={onClick}
              />,
            );
          }
          return acc;
        },
        [
          <BreadcrumbItem
            key="d_"
            {...items[0]}
            color={color}
            onClick={onClick}
          />,
          items.length > maxItems && <Separator key="s_" />,
          items.length > maxItems && <Ellipsis key="e_" />,
        ],
      )}
    </div>
  );

export default Breadcrumb;
