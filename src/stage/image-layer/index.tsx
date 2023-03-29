import { FC, memo, CSSProperties } from "react";
import { ImageLayer } from "@/types/image-layer";
import cs from "classnames";

export interface ImageLayerProps {
  layer: ImageLayer;
}

const ImageLayer: FC<ImageLayerProps> = (props) => {
  const { layer } = props;
  console.log("ImageLayer: ", layer);

  const imageStyle: CSSProperties = {
    width: layer.width,
    height: layer.height,
    position: "absolute",
    left: layer.x,
    top: layer.y,
    display: "inline-block",
    userSelect: "none",
  };

  return (
    <div id={layer.id} className={cs("m-image-layer")} style={imageStyle}>
      <img
        src={layer.url}
        alt=""
        style={{ userSelect: "none", pointerEvents: "none" }}
      />
    </div>
  );
};

export default memo(ImageLayer);
