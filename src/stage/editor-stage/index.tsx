import { FC, memo } from "react";
import cs from "classnames";
import "./index.less";
import useLayerHelper from "@/hooks/useLayerHelper";
import { v4 } from "uuid";
import { LayerTypeEnum } from "@/types/base-layer";

interface EditorStageProps {
  width: number;
  height: number;
  children: React.ReactNode;
}

const EditorStage: FC<EditorStageProps> = (props) => {
  const { width, height, children } = props;
  const { addLayer } = useLayerHelper();

  const addImageLayer = () => {
    addLayer({
      id: v4(),
      layerType: LayerTypeEnum.Image,
      url: "https://i03piccdn.sogoucdn.com/7c72d123880113d8",
      width: 203,
      height: 320,
      x: width / 2 - 203 / 2,
      y: height / 2 - 320 / 2,
    });
  };

  return (
    <>
      <button onClick={addImageLayer}>新增图层</button>
      <div
        className={cs("m-stage")}
        style={{
          width,
          height,
        }}
      >
        {children}
      </div>
    </>
  );
};

export default memo(EditorStage);
