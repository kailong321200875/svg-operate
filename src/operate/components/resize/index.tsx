import { FC, memo, useEffect, useRef, useState } from "react";
import operatePoint from "./operate-point";
import { LayerType } from "@/types/layer";
import cs from "classnames";
import { getDomInfo } from "../../helper";
import "./index.less";

const WIDTH = 5;

interface AnchorDataProps {
  anchorData: {
    name: string;
    position: {
      x: number;
      y: number;
    };
    angle: number;
  };
  activeLayer: LayerType | undefined;
}

// 锚点组件
const Anchor: FC<AnchorDataProps> = memo((props) => {
  const { activeLayer, anchorData } = props;
  const [position, setPosition] = useState(anchorData.position);

  useEffect(() => {
    if (activeLayer) {
      let adjustedX = 0;
      let adjustedY = 0;
      switch (anchorData.name) {
        case "top":
          adjustedX = activeLayer.width / 2 - WIDTH / 2;
          adjustedY = -WIDTH / 2;
          break;
        case "top-right":
          adjustedX = activeLayer.width - WIDTH / 2;
          adjustedY = -WIDTH / 2;
          break;
        case "right":
          adjustedX = activeLayer.width - WIDTH / 2;
          adjustedY = activeLayer.height / 2 - WIDTH / 2;
          break;
        case "right-bottom":
          adjustedX = activeLayer.width - WIDTH / 2;
          adjustedY = activeLayer.height - WIDTH / 2;
          break;
        case "bottom":
          adjustedX = activeLayer.width / 2 - WIDTH / 2;
          adjustedY = activeLayer.height - WIDTH / 2;
          break;
        case "bottom-left":
          adjustedX = -WIDTH / 2;
          adjustedY = activeLayer.height - WIDTH / 2;
          break;
        case "left":
          adjustedX = -WIDTH / 2;
          adjustedY = activeLayer.height / 2 - WIDTH / 2;
          break;
        case "left-top":
          adjustedX = -WIDTH / 2;
          adjustedY = -WIDTH / 2;
          break;
        default:
          break;
      }
      setPosition({ x: adjustedX, y: adjustedY });
    }
  }, [anchorData.position, activeLayer]);

  return (
    <span
      className={cs("m-resize__anchor", `m-resize__anchor--${anchorData.name}`)}
      style={{
        width: WIDTH,
        height: WIDTH,
        cursor: "pointer",
        position: "absolute",
        left: position.x,
        top: position.y,
        transform: `rotate(${anchorData.angle}deg)`,
      }}
    ></span>
  );
});

interface ResizeProps {
  activeLayer: LayerType | undefined;
  moving: boolean;
}

interface DomInfoProps {
  width: number;
  height: number;
  left: number;
  top: number;
}

const Resize: FC<ResizeProps> = (props) => {
  const { activeLayer, moving } = props;
  const currentTarget = useRef<HTMLElement>();
  const [domInfo, setDomInfo] = useState<DomInfoProps | null>(null);

  const renderAnchor = () => {
    if (activeLayer) {
      return operatePoint.map((item) => {
        const { name } = item;
        return (
          <Anchor
            key={name}
            anchorData={item}
            activeLayer={activeLayer}
          ></Anchor>
        );
      });
    }
  };

  useEffect(() => {
    if (activeLayer) {
      const { id } = activeLayer;
      const target = document.getElementById(id);
      if (target) {
        currentTarget.current = target;
        const targetDomInfo = getDomInfo(target);
        if (targetDomInfo) {
          setDomInfo(targetDomInfo);
        }
      }
    } else {
      currentTarget.current = undefined;
    }
  }, [activeLayer]);

  return (
    <div
      className={cs("m-resize", { "m-resize--moving": moving })}
      style={{
        display: activeLayer ? "block" : "none",
        ...domInfo,
      }}
    >
      {renderAnchor()}
    </div>
  );
};

export default memo(Resize);
