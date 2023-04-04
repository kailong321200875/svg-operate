import { FC, memo, useEffect, useState } from "react";
import { findParentByClass } from "../../helper";
import { useStoreState, useStoreActions } from "@/store";
import useLayerHelper from "@/hooks/useLayerHelper";

const Move: FC = () => {
  const moving = useStoreState((state) => state.operateModel.moving);
  const setMoving = useStoreActions(
    (actions) => actions.operateModel.setMoving
  );
  const { getLayerById, addActiveLayer, updateLayerById } = useLayerHelper();
  // 鼠标按下的坐标
  const [mousePoint, setMousePoint] = useState({ x: 0, y: 0 });

  const move_mouseDown = (e: PointerEvent) => {
    const parentDom = findParentByClass(e.target, "m-stage");
    console.log(e.target);

    if (!parentDom || !e.target || moving) {
      return;
    }

    const layerId = (e.target as HTMLElement).getAttribute("id");
    if (!layerId) {
      addActiveLayer(undefined);
      return;
    }

    const activeLayer = getLayerById(layerId);
    if (!activeLayer) return;

    addActiveLayer(activeLayer);
    setMousePoint({ x: e.clientX, y: e.clientY });

    document.addEventListener("pointermove", move_mouseMove, false);
    document.addEventListener("pointerup", move_mouseUp, false);
  };

  const move_mouseUp = () => {
    if (moving) {
      setMoving(false);
    }
    document.removeEventListener("pointermove", move_mouseMove, false);
    document.removeEventListener("pointerup", move_mouseUp, false);
  };

  const move_mouseMove = (e: PointerEvent) => {
    setMoving(true);
    // 计算出移动位置
    const moveX = e.clientX - mousePoint.x;
    const moveY = e.clientY - mousePoint.y;
    // if (activeLayer && !Array.isArray(activeLayer)) {
    //   updateLayerById({
    //     id: activeLayer.id,
    //     layer: {
    //       ...activeLayer,
    //       x: activeLayer.x + moveX,
    //       y: activeLayer.y + moveY,
    //     },
    //   });
    // }

    // console.log(!Array.isArray(activeLayers) && activeLayers);
    // if (!Array.isArray(activeLayers) && activeLayers) {
    //   activeLayers.x += moveX;
    //   activeLayers.y += moveY;
    //   // const layerIndex = getLayerIndex(activeLayers.id);
    //   // console.log(layerIndex);
    //   // if (layerIndex !== -1) {
    //   //   updateLayerByIndex({
    //   //     index: layerIndex,
    //   //     layer: activeLayers,
    //   //   });
    //   // }
    // }
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
