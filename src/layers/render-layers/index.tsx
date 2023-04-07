import { FC, memo, useMemo } from "react";
import { useStoreState } from "@/store";
import { LayerTypeEnum } from "@/types/base-layer";
import ImageLayer from "../image-layer";
import LayerOperate from "@/operate";

const RenderLayers: FC = () => {
  const layers = useStoreState((state) => state.layerModel.layers);

  const renderedLayers = useMemo(() => {
    return layers.map((layer, index) => {
      switch (layer.layerType) {
        case LayerTypeEnum.Image:
          return <ImageLayer key={layer.id} layer={layer} />;
        default:
          return null;
      }
    });
  }, [layers]);

  return (
    <>
      <LayerOperate />
      {renderedLayers}
    </>
  );
};

export default memo(RenderLayers);
