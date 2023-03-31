import { BaseLayer, LayerTypeEnum } from "./base-layer";

export interface ImageLayer extends BaseLayer {
  layerType: LayerTypeEnum.Image;
  url: string;
  name?: string;
}
