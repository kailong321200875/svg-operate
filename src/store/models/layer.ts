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
  activeLayer: LayerType | undefined;
  addActiveLayer: Action<LayerModel, LayerType | undefined>;
  updateLayerById: Thunk<
    LayerModel,
    { id: string; layer: LayerType },
    undefined,
    LayerModel
  >;
}

export const layerModel: LayerModel = {
  /**
   * 图层数据
   */
  layers: [],

  /**
   * 新增图层
   */
  addLayer: action((state, layer) => {
    state.layers.push(layer);
    console.log(state.layers);
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
  activeLayer: undefined,

  /**
   * 添加被激活的图层
   */
  addActiveLayer: action((state, layer) => {
    if (state.activeLayer?.id === layer?.id) return; // 如果是同一个图层
    // 如果不是数组
    state.activeLayer = layer;
  }),

  /**
   * 根据ID更新图层
   * @param id 图层ID
   * @param layer 图层数据
   */
  updateLayerById: thunk((_, { id, layer }, { getState }) => {
    const layers = getState().layers;
    const index = layers.findIndex((layer) => layer.id === id);
    if (index !== -1) {
      layers[index] = layer;
    }
    console.log(layers);
  }),
};
