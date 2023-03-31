import { FC, memo, useEffect } from "react";
import { useStoreState, useStoreActions } from "@/store";
import { v4 } from "uuid";
import { LayerTypeEnum } from "@/types/base-layer";
import ImageLayer from "../image-layer";
import BaseLayer from "../base-layer";
import LayerOperate from "@/operate";
import useLayerHelper from "@/hooks/useLayerHelper";

const RenderLayers: FC = () => {
  const layers = useStoreState((state) => state.layerModel.layers);
  const { addLayer } = useLayerHelper();

  const initLayers = () => {
    addLayer({
      id: v4(),
      layerType: LayerTypeEnum.Image,
      url: "https://i03piccdn.sogoucdn.com/7c72d123880113d8",
      width: 203,
      height: 320,
      x: 0,
      y: 0,
    });
    addLayer({
      id: v4(),
      layerType: LayerTypeEnum.Image,
      url: "https://xiuxiupro-material-center.meitudata.com/material/image/641831cc8f93d2858.png",
      width: 200,
      height: 200,
      x: 200,
      y: 200,
    });
  };

  const renderLayers = () => {
    return layers.map((layer) => {
      switch (layer.layerType) {
        case LayerTypeEnum.Image:
          return (
            <BaseLayer key={layer.id}>
              <ImageLayer layer={layer} />
            </BaseLayer>
          );
        default:
          return null;
      }
    });
  };

  useEffect(() => {
    setTimeout(() => {
      initLayers();
    }, 2000);
  }, []);

  return (
    <>
      <LayerOperate />
      {renderLayers()}
    </>
  );
};

export default memo(RenderLayers);
