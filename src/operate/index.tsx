import { FC, memo } from "react";
import Move from "./components/move";
import Resize from "./components/resize";
import Cover from "./components/cover";
import { useStoreState } from "@/store";

const LayerOperate: FC = () => {
  const activeLayer = useStoreState((state) => state.layerModel.activeLayer);
  const moving = useStoreState((state) => state.operateModel.moving);

  return (
    <>
      <Move />
      <Cover activeLayer={activeLayer} moving={moving} />
      <Resize
        key={activeLayer ? activeLayer.id : undefined}
        activeLayer={activeLayer}
        moving={moving}
      />
    </>
  );
};

export default memo(LayerOperate);
