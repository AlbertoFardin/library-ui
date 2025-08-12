interface ITransitions {
  style?: React.CSSProperties;
  className?: string;
  open: boolean;
  children: JSX.Element | React.ReactNode;
  timeout?: number;
  onEnter?: () => void;
  onEntered?: () => void;
  onExit?: () => void;
  onExited?: () => void;
  direction?: "top" | "bottom" | "right" | "left";
  unmountOnExit?: boolean;
}

export default ITransitions;
