import React, { FC, memo, useEffect, useRef } from "react";
import operatePoint from "./operate-point";
import { LayerType } from "@/types/layer";
import cs from "classnames";
import useLayerHelper from "@/hooks/useLayerHelper";
import useOperateHelper from "@/hooks/useOperateHelper";
import { useStoreState } from "@/store";
import { ResizeStyle } from "./index.style";
import Rotate from "../rotate";

const MIN_WIDTH = 20;
const MIN_HEIGHT = 20;

interface AnchorDataProps {
  anchorData: {
    name: string;
    style: React.CSSProperties;
  };
}

const SCALE_ANCHOR_MAP = [
  "top-right",
  "right-bottom",
  "bottom-left",
  "left-top",
];

// 锚点组件
const Anchor: FC<AnchorDataProps> = memo((props) => {
  const { anchorData } = props;
  const { name } = anchorData;

  return (
    <span
      data-name={name}
      className={cs("m-resize__anchor", `m-resize__anchor--${anchorData.name}`)}
      style={{
        position: "absolute",
        zIndex: 1,
        ...anchorData.style,
      }}
    ></span>
  );
});

interface ResizeProps {
  moving: boolean;
}

const Resize: FC<ResizeProps> = (props) => {
  const { moving } = props;
  const activeLayer = useStoreState((state) => state.layerModel.activeLayer);

  const renderAnchor = () => {
    return operatePoint.map((item) => {
      const { name } = item;
      return <Anchor key={name} anchorData={item}></Anchor>;
    });
  };

  // 使用 useRef 声明变量
  const startPosRef = useRef({ x: 0, y: 0 });
  const activeLayerRef = useRef<LayerType>();
  const anchorNameRef = useRef("");

  const { getActiveLayer, updateLayerById } = useLayerHelper();
  const { getScaling, setScaling } = useOperateHelper();

  const move_mouseDown = (e: PointerEvent) => {
    const isResizeAnchorDom = (e.target as HTMLElement).classList.contains(
      "m-resize__anchor"
    );
    const isResizeRotateDom = (e.target as HTMLElement).classList.contains(
      "m-resize__rotate"
    );
    if (!isResizeAnchorDom && !isResizeRotateDom) {
      return;
    }

    anchorNameRef.current =
      (e.target as HTMLElement).getAttribute("data-name") || "";
    if (!anchorNameRef.current) {
      return;
    }

    const activeLayer = getActiveLayer();
    if (!activeLayer) return;
    startPosRef.current = { x: e.clientX, y: e.clientY };
    activeLayerRef.current = activeLayer;

    document?.addEventListener("pointermove", move_mouseMove, false);
    document?.addEventListener("pointerup", move_mouseUp, false);
  };

  const move_mouseMove = (e: PointerEvent) => {
    if (!getScaling()) {
      setScaling(true);
    }

    if (!activeLayerRef.current) return;

    let deltaX = e.clientX - startPosRef.current.x;
    let deltaY = e.clientY - startPosRef.current.y;

    // 根据锚点的位置和鼠标移动的距离来计算新的宽高和坐标
    let width = activeLayerRef.current.width;
    let height = activeLayerRef.current.height;
    let left = activeLayerRef.current.x;
    let top = activeLayerRef.current.y;

    if (anchorNameRef.current === "left-top") {
      width = Math.max(activeLayerRef.current.width - deltaX, MIN_WIDTH);
      height = Math.max(activeLayerRef.current.height - deltaY, MIN_HEIGHT);
      const scale = Math.max(
        width / activeLayerRef.current.width,
        height / activeLayerRef.current.height
      );
      width = activeLayerRef.current.width * scale;
      height = activeLayerRef.current.height * scale;
      left = activeLayerRef.current.x - (width - activeLayerRef.current.width);
      top = activeLayerRef.current.y - (height - activeLayerRef.current.height);
    } else if (anchorNameRef.current === "top-right") {
      width = Math.max(activeLayerRef.current.width + deltaX, MIN_WIDTH);
      height = Math.max(activeLayerRef.current.height - deltaY, MIN_HEIGHT);
      const scale = Math.max(
        width / activeLayerRef.current.width,
        height / activeLayerRef.current.height
      );
      width = activeLayerRef.current.width * scale;
      height = activeLayerRef.current.height * scale;
      left = activeLayerRef.current.x;
      top = activeLayerRef.current.y - (height - activeLayerRef.current.height);
    } else if (anchorNameRef.current === "right-bottom") {
      width = Math.max(activeLayerRef.current.width + deltaX, MIN_WIDTH);
      height = Math.max(activeLayerRef.current.height + deltaY, MIN_HEIGHT);
      const scale = Math.max(
        width / activeLayerRef.current.width,
        height / activeLayerRef.current.height
      );
      width = activeLayerRef.current.width * scale;
      height = activeLayerRef.current.height * scale;
      left = activeLayerRef.current.x;
      top = activeLayerRef.current.y;
    } else if (anchorNameRef.current === "bottom-left") {
      width = Math.max(activeLayerRef.current.width - deltaX, MIN_WIDTH);
      height = Math.max(activeLayerRef.current.height + deltaY, MIN_HEIGHT);
      const scale = Math.max(
        width / activeLayerRef.current.width,
        height / activeLayerRef.current.height
      );
      width = activeLayerRef.current.width * scale;
      height = activeLayerRef.current.height * scale;
      left = activeLayerRef.current.x - (width - activeLayerRef.current.width);
      top = activeLayerRef.current.y;
    } else if (anchorNameRef.current === "top") {
      const newHeight = Math.max(
        activeLayerRef.current.height - deltaY,
        MIN_HEIGHT
      );
      const newTop = activeLayerRef.current.y + deltaY;
      // 高度不能小于最小值
      console.log(newHeight, MIN_HEIGHT);
      if (newHeight >= MIN_HEIGHT) {
        height = newHeight;
        // 重新计算top值，使锚点始终与图层的顶部对齐
        top = Math.min(
          newTop,
          activeLayerRef.current.y + activeLayerRef.current.height - MIN_HEIGHT
        );
      }
    } else if (anchorNameRef.current === "right") {
      width = Math.max(activeLayerRef.current.width + deltaX, MIN_WIDTH);
    } else if (anchorNameRef.current === "bottom") {
      height = Math.max(activeLayerRef.current.height + deltaY, MIN_HEIGHT);
    } else if (anchorNameRef.current === "left") {
      const newWidth = Math.max(
        activeLayerRef.current.width - deltaX,
        MIN_WIDTH
      );
      const newLeft = activeLayerRef.current.x + deltaX;
      // 宽度不能小于最小值
      if (newWidth >= MIN_WIDTH) {
        width = newWidth;
        // 重新计算left值，使锚点始终与图层的左边缘对齐
        left = Math.min(
          newLeft,
          activeLayerRef.current.x + activeLayerRef.current.width - MIN_WIDTH
        );
      }
    }

    updateLayerById({
      id: activeLayerRef.current.id,
      layer: {
        ...activeLayerRef.current,
        width,
        height,
        x: left,
        y: top,
      },
    });
  };

  const move_mouseUp = () => {
    if (getScaling()) {
      setScaling(false);
    }
    document?.removeEventListener("pointermove", move_mouseMove, false);
    document?.removeEventListener("pointerup", move_mouseUp, false);
  };

  useEffect(() => {
    document?.addEventListener("pointerdown", move_mouseDown, false);
    document?.addEventListener("pointerup", move_mouseUp, false);

    return () => {
      document?.removeEventListener("pointerdown", move_mouseDown, false);
      document?.removeEventListener("pointermove", move_mouseMove, false);
      document?.removeEventListener("pointerup", move_mouseUp, false);
    };
  }, []);

  return activeLayer ? (
    <ResizeStyle
      className={cs("m-resize")}
      style={{
        width: activeLayer?.width,
        height: activeLayer?.height,
        transform: `translate(${activeLayer.x}px, ${activeLayer.y}px) rotate(${activeLayer.rotate}deg)`,
        opacity: moving ? 0.5 : 1,
      }}
    >
      {renderAnchor()}
      <Rotate />
    </ResizeStyle>
  ) : null;
};

export default memo(Resize);
