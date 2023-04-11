import { FC, memo, ReactNode } from "react";
import { LayerType } from "@/types/layer";
import cs from "classnames";
import { BaseLayerStyle } from "./index.style";

interface BaseLayerProps {
  children: ReactNode;
  layer: LayerType;
}

const BaseLayer: FC<BaseLayerProps> = (props) => {
  const { children, layer } = props;

  console.log("==================" + layer.id + "==================");
  return (
    <BaseLayerStyle
      style={{
        transform: `translate(${layer.x}px, ${layer.y}px) rotate(${layer.rotate}deg)`,
      }}
      className={cs("base-layer")}
    >
      {children}
    </BaseLayerStyle>
  );
};

export default memo(BaseLayer);
