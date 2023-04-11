export enum LayerTypeEnum {
  Image = "image",
  Text = "text",
}

export interface BaseLayer {
  id: string;
  layerType: LayerTypeEnum;
  width: number;
  height: number;
  rotate: number;
  x: number;
  y: number;
}
