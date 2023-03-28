import { BaseLayer, LayerType } from "./base-layer";

export interface ImageLayer extends BaseLayer {
  layerType: LayerType.Image;
  url: string;
  name?: string;
}
