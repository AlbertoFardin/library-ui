import { createUseStyles } from "react-jss";
import classnames from "classnames";
import Tabs from "../Tabs";
import Carousel from "./Carousel";
import Divider from "../Divider";
import { ITabsCarousel, ITabsCarouselItem } from "./interfaces";
import { getTheme } from "../../theme";

const useStyles = createUseStyles({
  tabscarousel: {
    height: "100%",
    width: "100%",
    position: "relative",
    display: "inline-flex",
    "flex-direction": "column",
    "align-items": "stretch",
    overflow: "hidden",
  },
});

const TabsCarousel = ({
  className,
  style,
  color = getTheme().colors.theme1,
  value,
  items,
  onChange,
  tabsDivider = true,
  tabsHidden,
  tabsClassName,
  tabsStyle,
}: ITabsCarousel) => {
  const classes = useStyles({});
  const slcItem = items.find(({ id }: ITabsCarouselItem) => id === value);

  return (
    <div
      style={style}
      className={classnames({
        [classes.tabscarousel]: true,
        [className]: !!className,
      })}
    >
      {tabsHidden || !slcItem || items.length <= 1 ? null : (
        <>
          <Tabs
            className={tabsClassName}
            style={tabsStyle}
            color={color}
            value={value}
            items={items.map((p) => ({
              id: p.id,
              label: p.tabLabel,
              icon: p.tabIcon,
              tooltip: p.tabTooltip,
              style: p.tabStyle,
              className: p.tabClassName,
            }))}
            onChange={onChange}
          />
          {!tabsDivider ? null : <Divider />}
        </>
      )}
      <Carousel value={value} items={items} />
    </div>
  );
};

export default TabsCarousel;
