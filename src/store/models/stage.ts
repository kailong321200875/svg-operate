import { action, Action } from "easy-peasy";
import { ImageLayer } from "@/types/image-layer";

type LayerType = ImageLayer;

export interface StageModel {
  layers: LayerType[];
  addLayer: Action<StageModel, ImageLayer>;
  activeLayers: undefined | LayerType | LayerType[];
  setActiveLayers: Action<StageModel, undefined | LayerType | LayerType[]>;
  updateLayerByIndex: Action<
    StageModel,
    {
      index: number;
      layer: LayerType;
    }
  >;
}

export const stageModel: StageModel = {
  layers: [],
  addLayer: action((state, layer) => {
    state.layers.push(layer);
  }),
  activeLayers: undefined,
  setActiveLayers: action((state, layers) => {
    // 如果是数组，且长度为0，则设置为undefined
    if (Array.isArray(layers) && layers.length === 0) {
      state.activeLayers = undefined;
      return;
    }
    state.activeLayers = layers;
  }),
  updateLayerByIndex: action((state, { index, layer }) => {
    state.layers[index] = layer;
  }),
};
