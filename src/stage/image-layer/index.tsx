import { FC, memo, CSSProperties } from "react";
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
    position: "absolute",
    left: layer.x,
    top: layer.y,
    display: "inline-block",
  };

  return (
    <div id={layer.id} className={cs("m-image-layer")} style={imageStyle}>
      <img src={layer.url} alt="" />
    </div>
  );
};

export default memo(ImageLayer);
