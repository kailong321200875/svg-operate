import { FC, memo, useEffect, useRef, useState } from "react";
import { LayerType } from "@/types/layer";
import cs from "classnames";
import "./index.less";
import useLayerHelper from "@/hooks/useLayerHelper";

interface CoverProps {
  activeLayer: LayerType | undefined;
  moving: boolean;
}

const Cover: FC<CoverProps> = (props) => {
  const { activeLayer, moving } = props;
  const [coverLayer, setCoverLayer] = useState<LayerType | undefined>();
  const coverLayerIdRef = useRef<string | undefined>();
  const { getLayerById } = useLayerHelper();

  const move_mouseCover = (e: PointerEvent) => {
    const layerId = (e.target as HTMLElement).getAttribute("id");
    if (layerId === coverLayerIdRef.current) return;
    if (!layerId) {
      setCoverLayer(undefined);
      return;
    }

    coverLayerIdRef.current = layerId;
    const layer = getLayerById(layerId);
    setCoverLayer(layer);
  };

  const move_mouseOut = (e: PointerEvent) => {
    const layerId = (e.target as HTMLElement).getAttribute("id");
    if (layerId === coverLayerIdRef.current) {
      coverLayerIdRef.current = "";
    }
  };

  useEffect(() => {
    document.addEventListener("pointerover", move_mouseCover, false);
    document.addEventListener("pointerout", move_mouseOut, false);

    return () => {
      document.removeEventListener("pointerover", move_mouseCover, false);
      document.removeEventListener("pointerout", move_mouseOut, false);
    };
  }, []);

  return coverLayer && activeLayer?.id !== coverLayer.id && !moving ? (
    <div
      className={cs("m-cover")}
      style={{
        width: coverLayer?.width,
        height: coverLayer?.height,
        transform: `translate(${coverLayer.x}px, ${coverLayer.y}px)`,
        transformOrigin: "center",
      }}
    />
  ) : null;
};

export default memo(Cover);
