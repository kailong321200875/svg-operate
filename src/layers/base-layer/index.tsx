import { FC, memo, ReactNode } from "react";
import { LayerType } from "@/types/layer";
import cs from "classnames";
import { useStoreState } from "@/store";
import "./index.less";

interface BaseLayerProps {
  children: ReactNode;
  layer: LayerType;
}

const BaseLayer: FC<BaseLayerProps> = (props) => {
  const { children, layer } = props;
  const activeLayer = useStoreState((state) => state.layerModel.activeLayer);

  console.log("==================" + layer.id + "==================");
  return (
    <div
      className={cs("m-base-layer", {
        "m-base-layer--active": activeLayer?.id === layer.id,
      })}
      style={{
        position: "absolute",
        transform: `translate(${layer.x}px, ${layer.y}px)`,
        transformOrigin: "center",
      }}
    >
      {children}
    </div>
  );
};

export default memo(BaseLayer);
