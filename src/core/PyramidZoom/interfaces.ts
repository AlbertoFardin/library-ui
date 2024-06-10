export interface INavIconColors {
  typography: string;
  background: string;
  mousehover: string;
  grayBorder: string;
}

export interface IPyramidZoom {
  src: string;
  getSrcFirmed: (src: string) => Promise<string>;
  colors?: INavIconColors;
}
