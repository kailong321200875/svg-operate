import { FC, memo, useEffect, useRef } from "react";
import { findParentByClass } from "../../helper";
import { useStoreState } from "@/store";
import useLayerHelper from "@/hooks/useLayerHelper";
import useOperateHelper from "@/hooks/useOperateHelper";

const Move: FC = () => {
  const moving = useStoreState((state) => state.operateModel.moving);
  const { setMoving, getMoving } = useOperateHelper();
  const { getLayerById, addActiveLayer, updateLayerById, getActiveLayer } =
    useLayerHelper();
  // 使用 useRef 声明变量
  const startPosRef = useRef({ x: 0, y: 0 });
  const startLayerPosRef = useRef({ x: 0, y: 0 });

  const move_mouseDown = (e: PointerEvent) => {
    const parentDom = findParentByClass(e.target, "m-stage");

    if (!parentDom || !e.target || moving) {
      return;
    }

    // 判断class是否包含m-resize
    const isResizeWrapDom = (e.target as HTMLElement).classList.contains(
      "m-resize"
    );
    // 判断class是否包含m-resize__anchor
    const isResizeAnchorDom = (e.target as HTMLElement).classList.contains(
      "m-resize__anchor"
    );
    if (!isResizeWrapDom && !isResizeAnchorDom) {
      addActiveLayer(undefined);
    }

    const layerId = (e.target as HTMLElement).getAttribute("id");

    const activeLayer = layerId ? getLayerById(layerId) : getActiveLayer();
    if (!activeLayer) return;
    startPosRef.current = { x: e.clientX, y: e.clientY };
    addActiveLayer(activeLayer);
    startLayerPosRef.current = { x: activeLayer.x, y: activeLayer.y };

    document.addEventListener("pointermove", move_mouseMove, false);
    document.addEventListener("pointerup", move_mouseUp, false);
  };

  const move_mouseUp = () => {
    if (getMoving()) {
      setMoving(false);
    }
    document.removeEventListener("pointermove", move_mouseMove, false);
    document.removeEventListener("pointerup", move_mouseUp, false);
  };

  const move_mouseMove = (e: PointerEvent) => {
    setMoving(true);

    const activeLayer = getActiveLayer();
    if (!activeLayer) return;

    const deltaX = e.clientX - startPosRef.current.x;
    const deltaY = e.clientY - startPosRef.current.y;
    const x = startLayerPosRef.current.x + deltaX;
    const y = startLayerPosRef.current.y + deltaY;

    updateLayerById({
      id: activeLayer.id,
      layer: {
        ...activeLayer,
        x,
        y,
      },
    });
  };

  useEffect(() => {
    document.addEventListener("pointerdown", move_mouseDown, false);
    document.addEventListener("pointerup", move_mouseUp, false);

    return () => {
      document.removeEventListener("pointermove", move_mouseMove, false);
      document.removeEventListener("pointerup", move_mouseUp, false);
    };
  }, []);

  return null;
};

export default memo(Move);
