import { FC, memo } from "react";
import Move from "./components/move";
import Resize from "./components/resize";
import Cover from "./components/cover";
import { useStoreState } from "@/store";

const LayerOperate: FC = () => {
  const moving = useStoreState((state) => state.operateModel.moving);
  const selected = useStoreState((state) => state.layerModel.selected);

  return (
    <>
      <Move />
      <Cover moving={moving} />
      <Resize key={selected} moving={moving} />
    </>
  );
};

export default memo(LayerOperate);
