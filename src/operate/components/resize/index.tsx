import { FC, memo, useEffect, useRef } from "react";
import operatePoint from "./operate-point";
import { LayerType } from "@/types/layer";

// 锚点组件
const Anchor: FC = memo(() => {
  return null;
});

interface ResizeProps {
  activeLayer: LayerType | undefined;
}

const Resize: FC<ResizeProps> = (props) => {
  const { activeLayer } = props;
  const currentTarget = useRef<HTMLElement>();

  useEffect(() => {
    if (activeLayer) {
      const { id } = activeLayer;
      const target = document.getElementById(id);
      if (target) {
        currentTarget.current = target;
      }
    } else {
      currentTarget.current = undefined;
    }
  }, [activeLayer]);

  return <div>Resize</div>;
};

export default memo(Resize);
