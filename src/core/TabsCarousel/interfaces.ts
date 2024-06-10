export interface ITabsCarouselItem {
  id: string;
  children: JSX.Element;
  className?: string;
  style?: React.CSSProperties;
  tabLabel?: string | JSX.Element;
  tabIcon?: string;
  tabTooltip?: string | string[];
  tabClassName?: string;
  tabStyle?: React.CSSProperties;
}

export interface ITabsCarousel {
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  onChange?: (tabId: string) => void;
  value: string;
  items: ITabsCarouselItem[];
  tabsDivider?: boolean;
  tabsHidden?: boolean;
  tabsClassName?: string;
  tabsStyle?: React.CSSProperties;
}
