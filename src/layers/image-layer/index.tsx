import { FC, memo, CSSProperties } from "react";
import { ImageLayer } from "@/types/image-layer";
import cs from "classnames";
import BaseLayer from "../base-layer";

export interface ImageLayerProps {
  layer: ImageLayer;
}

const ImageLayer: FC<ImageLayerProps> = (props) => {
  const { layer } = props;

  const imageStyle: CSSProperties = {
    width: layer.width,
    height: layer.height,
    userSelect: "none",
  };

  return (
    <BaseLayer layer={layer}>
      <div id={layer.id} className={cs("m-image-layer")} style={imageStyle}>
        <img
          src={layer.url}
          alt=""
          style={{
            display: "block",
            userSelect: "none",
            pointerEvents: "none",
            width: "100%",
            height: "100%",
          }}
        />
      </div>
    </BaseLayer>
  );
};

export default memo(ImageLayer);
