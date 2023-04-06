import React, { FC, memo } from "react";
import operatePoint from "./operate-point";
import { LayerType } from "@/types/layer";
import cs from "classnames";
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

const Resize: FC<ResizeProps> = (props) => {
  const { activeLayer, moving } = props;

  const renderAnchor = () => {
    return operatePoint.map((item) => {
      const { name } = item;
      return <Anchor key={name} anchorData={item}></Anchor>;
    });
  };

  return activeLayer ? (
    <div
      className={cs("m-resize", { "m-resize--moving": moving })}
      style={{
        width: activeLayer?.width,
        height: activeLayer?.height,
        transform: `translate(${activeLayer.x}px, ${activeLayer.y}px)`,
        transformOrigin: "center",
      }}
    >
      {renderAnchor()}
    </div>
  ) : null;
};

export default memo(Resize);
