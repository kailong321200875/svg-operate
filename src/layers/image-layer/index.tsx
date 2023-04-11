import { FC, memo, CSSProperties } from "react";
import { ImageLayer } from "@/types/image-layer";
import { LayerType } from "@/types/layer";
import cs from "classnames";
import BaseLayer from "../base-layer";
import { ImageLayerStyle } from "./index.style";

export interface ImageLayerProps {
  layer: ImageLayer;
}

const ImageLayer: FC<ImageLayerProps> = (props) => {
  const { layer } = props;
  console.log("ImageLayer: ", layer.id);

  const imageStyle: CSSProperties = {
    width: layer.width,
    height: layer.height,
  };

  return (
    <BaseLayer layer={layer}>
      <ImageLayerStyle
        id={layer.id}
        className={cs("m-image-layer")}
        style={imageStyle}
      >
        <img src={layer.url} alt="" />
      </ImageLayerStyle>
    </BaseLayer>
  );
};

export default memo(ImageLayer);
