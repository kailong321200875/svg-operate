import { FC, memo } from "react";
import { useStoreState } from "@/store";
import { LayerTypeEnum } from "@/types/base-layer";
import ImageLayer from "../image-layer";
import BaseLayer from "../base-layer";
import LayerOperate from "@/operate";

const RenderLayers: FC = () => {
  const layers = useStoreState((state) => state.layerModel.layers);

  const renderLayers = () => {
    return layers.map((layer) => {
      switch (layer.layerType) {
        case LayerTypeEnum.Image:
          return (
            <BaseLayer key={layer.id} layer={layer}>
              <ImageLayer layer={layer} />
            </BaseLayer>
          );
        default:
          return null;
      }
    });
  };

  return (
    <>
      <LayerOperate />
      {renderLayers()}
    </>
  );
};

export default memo(RenderLayers);
