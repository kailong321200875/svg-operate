import { FC, memo, useEffect } from "react";
import { useStoreState, useStoreActions } from "@/store";
import { v4 } from "uuid";
import { LayerType } from "@/types/base-layer";
import ImageLayer from "../image-layer";

const RenderLayers: FC = () => {
  const { layers } = useStoreState((state) => state.stage);
  const { addLayer } = useStoreActions((actions) => actions.stage);

  const initLayers = () => {
    addLayer({
      id: v4(),
      layerType: LayerType.Image,
      url: "https://i03piccdn.sogoucdn.com/7c72d123880113d8",
      width: 203,
      height: 320,
      x: 0,
      y: 0,
    });
  };

  const renderLayers = () => {
    return layers.map((layer) => {
      switch (layer.layerType) {
        case LayerType.Image:
          return <ImageLayer key={layer.id} layer={layer} />;
        default:
          return null;
      }
    });
  };

  useEffect(() => {
    initLayers();
  }, []);

  return <>{renderLayers()}</>;
};

export default memo(RenderLayers);
