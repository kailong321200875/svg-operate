import { FC, memo } from "react";
import Move from "./components/move";
import Resize from "./components/resize";
import { useStoreState } from "@/store";

const LayerOperate: FC = () => {
  const activeLayer = useStoreState((state) => state.layerModel.activeLayer);
  return (
    <>
      <Move />
      <Resize activeLayer={activeLayer} />
    </>
  );
};

export default memo(LayerOperate);
