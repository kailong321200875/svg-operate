import { action, Action } from "easy-peasy";
import { ImageLayer } from "@/types/image-layer";

type LayerType = ImageLayer;

export interface StageModel {
  layers: LayerType[];
  addLayer: Action<StageModel, ImageLayer>;
}

export const stageModel: StageModel = {
  layers: [],
  addLayer: action((state, layer) => {
    state.layers.push(layer);
  }),
};
