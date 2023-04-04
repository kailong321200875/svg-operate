import React, { FC, memo, useEffect, useRef, useState } from "react";
import operatePoint from "./operate-point";
import { LayerType } from "@/types/layer";
import cs from "classnames";
import { getDomInfo } from "../../helper";
import "./index.less";

const WIDTH = 5;

interface AnchorDataProps {
  anchorData: {
    name: string;
    style: React.CSSProperties;
    position: {
      x: number;
      y: number;
    };
    angle: number;
  };
}

// 锚点组件
const Anchor: FC<AnchorDataProps> = memo((props) => {
  const { anchorData } = props;

  return (
    <span
      className={cs("m-resize__anchor", `m-resize__anchor--${anchorData.name}`)}
      style={{
        width: WIDTH,
        height: WIDTH,
        cursor: "pointer",
        position: "absolute",
        ...anchorData.style,
        transform: `${anchorData.style.transform} rotate(${anchorData.angle}deg)`,
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
    return operatePoint.map((item) => {
      const { name } = item;
      return <Anchor key={name} anchorData={item}></Anchor>;
    });
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

  return activeLayer ? (
    <div
      className={cs("m-resize", { "m-resize--moving": moving })}
      style={{
        ...domInfo,
      }}
    >
      {renderAnchor()}
    </div>
  ) : null;
};

export default memo(Resize);
