import { FC, memo, CSSProperties, useEffect } from "react";
import { ImageLayer } from "@/types/image-layer";
import cs from "classnames";

export interface ImageLayerProps {
  layer: ImageLayer;
}

const ImageLayer: FC<ImageLayerProps> = (props) => {
  const { layer } = props;

  const imageStyle: CSSProperties = {
    width: layer.width,
    height: layer.height,
    display: "inline-block",
    userSelect: "none",
  };

  return (
    <div id={layer.id} className={cs("m-image-layer")} style={imageStyle}>
      <img
        src={layer.url}
        alt=""
        style={{
          userSelect: "none",
          pointerEvents: "none",
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default memo(ImageLayer);
