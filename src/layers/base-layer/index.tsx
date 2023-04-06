import { FC, memo, ReactNode } from "react";
import { LayerType } from "@/types/layer";
import cs from "classnames";

interface BaseLayerProps {
  children: ReactNode;
  layer: LayerType;
}

const BaseLayer: FC<BaseLayerProps> = (props) => {
  const { children, layer } = props;
  return (
    <div
      className={cs("m-base-layer")}
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
