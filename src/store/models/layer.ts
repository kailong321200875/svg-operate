import { action, Action, Computed, computed, Thunk, thunk } from "easy-peasy";
import { ImageLayer } from "@/types/image-layer";

type LayerType = ImageLayer;

export interface LayerModel {
  layers: LayerType[];
  addLayer: Action<LayerModel, ImageLayer>;
  findLayerById: Thunk<
    LayerModel,
    string,
    undefined,
    LayerModel,
    LayerType | undefined
  >;
  activeLayer: Computed<LayerModel, LayerType | undefined>;
  addActiveLayer: Action<LayerModel, LayerType | undefined>;
  // updateLayerById: Thunk<
  //   LayerModel,
  //   { id: string; layer: LayerType },
  //   undefined,
  //   LayerModel
  // >;
  updateLayerById: Action<LayerModel, { id: string; layer: LayerType }>;
  getActiveLayer: Thunk<
    LayerModel,
    undefined,
    undefined,
    LayerModel,
    LayerType | undefined
  >;
  selected: string | undefined;
}

export const layerModel: LayerModel = {
  selected: undefined,
  /**
   * 图层数据
   */
  layers: [],

  /**
   * 新增图层
   */
  addLayer: action((state, layer) => {
    state.layers.push(layer);
  }),

  /**
   * 根据ID查找图层
   */
  findLayerById: thunk((_, id, { getState }) => {
    const layers = getState().layers;
    return layers.find((layer) => layer.id === id);
  }),

  /**
   * 被激活的图层
   */
  activeLayer: computed((state) => {
    return state.layers.find((layer) => layer.id === state.selected);
  }),

  /**
   * 添加被激活的图层
   */
  addActiveLayer: action((state, layer) => {
    if (state.activeLayer?.id === layer?.id) return; // 如果是同一个图层
    // 如果不是数组
    state.selected = layer?.id;
  }),

  updateLayerById: action((state, { id, layer }) => {
    const layers = state.layers;
    const index = layers.findIndex((layer) => layer.id === id);
    if (index !== -1) {
      layers[index] = layer;
    }
  }),

  getActiveLayer: thunk((_, __, { getState }) => {
    return getState().activeLayer;
  }),
};
