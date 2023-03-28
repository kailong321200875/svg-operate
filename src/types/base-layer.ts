export enum LayerType {
  Image = "image",
  Text = "text",
}

export interface BaseLayer {
  id: string;
  layerType: LayerType;
  width: number;
  height: number;
  x: number;
  y: number;
}
