export interface IAccordion {
  id: string;
  headerNode: React.ReactNode;
  contentNode: React.ReactNode;
}

export interface IAccordions {
  style?: React.CSSProperties;
  className?: string;
  onChange: (id: string, expanded: boolean) => void;
  items: IAccordion[];
  value: string;
}
