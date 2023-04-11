import { FC, memo, useEffect, useRef } from "react";
import { ReloadOutlined } from "@ant-design/icons";
import { RotateStyle } from "./index.style";
import cs from "classnames";
import useOperateHelper from "@/hooks/useOperateHelper";
import useLayerHelper from "@/hooks/useLayerHelper";
import { LayerType } from "@/types/layer";

const Rotate: FC = () => {
  const stageRef = useRef<HTMLDivElement | null>();
  const rotateRef = useRef<HTMLSpanElement | null>();
  const startPosRef = useRef({ x: 0, y: 0 });
  const activeLayerRef = useRef<LayerType | undefined>();
  const startAngleRef = useRef(0);
  const initialRotateRef = useRef(0);
  const { getRotating, setRotating } = useOperateHelper();
  const { getActiveLayer, updateLayerById } = useLayerHelper();

  const move_mouseDown = (e: PointerEvent) => {
    const activeLayer = getActiveLayer();
    startPosRef.current = { x: e.clientX, y: e.clientY };
    activeLayerRef.current = activeLayer;
    if (activeLayer && activeLayer.rotate === 0) {
      // 记录旋转中心点
      const center = {
        x: activeLayer.x + activeLayer.width / 2,
        y: activeLayer.y + activeLayer.height / 2,
      };
      // 记录鼠标按下的位置和与中心点的夹角
      const dx = e.clientX - center.x;
      const dy = e.clientY - center.y;
      startAngleRef.current = Math.atan2(dy, dx);
    }
    stageRef?.current?.addEventListener("pointermove", move_mouseMove, false);
    stageRef?.current?.addEventListener("pointerup", move_mouseUp, false);
  };

  const move_mouseUp = () => {
    if (getRotating()) {
      setRotating(false);
    }
    stageRef?.current?.removeEventListener(
      "pointermove",
      move_mouseMove,
      false
    );
    stageRef?.current?.removeEventListener("pointerup", move_mouseUp, false);
  };

  const move_mouseMove = (e: PointerEvent) => {
    if (!getRotating()) {
      setRotating(true);
    }
    if (!activeLayerRef.current) return;

    if (!activeLayerRef.current) return;

    const start = { x: activeLayerRef.current.x, y: activeLayerRef.current.y };
    const end = { x: e.clientX, y: e.clientY };
    const center = {
      x: start.x + activeLayerRef.current.width / 2,
      y: start.y + activeLayerRef.current.height / 2,
    };

    // 计算旋转角度
    const radian =
      Math.atan2(end.y - center.y, end.x - center.x) -
      Math.atan2(start.y - center.y, start.x - center.x);
    const degree = (radian * 180) / Math.PI;
    const rotate = activeLayerRef.current.rotate + degree;

    updateLayerById({
      id: activeLayerRef.current.id,
      layer: {
        ...activeLayerRef.current,
        rotate,
      },
    });
  };

  useEffect(() => {
    stageRef.current = document.querySelector(".m-stage") as HTMLDivElement;
    rotateRef.current = document.querySelector(
      ".m-resize__rotate"
    ) as HTMLSpanElement;

    if (!rotateRef.current) return;
    rotateRef?.current?.addEventListener("pointerdown", move_mouseDown, false);
    stageRef?.current?.addEventListener("pointerup", move_mouseUp, false);

    return () => {
      rotateRef?.current?.removeEventListener(
        "pointerdown",
        move_mouseDown,
        false
      );
      stageRef?.current?.removeEventListener(
        "pointermove",
        move_mouseMove,
        false
      );
      stageRef?.current?.removeEventListener("pointerup", move_mouseUp, false);
    };
  }, []);

  return (
    <RotateStyle className={cs("m-resize__rotate")}>
      <ReloadOutlined />
    </RotateStyle>
  );
};

export default memo(Rotate);
