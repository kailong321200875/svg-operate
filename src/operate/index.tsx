import { FC, memo } from "react";
import Move from "./components/move";
import Resize from "./components/resize";

const LayerOperate: FC = () => {
  return (
    <>
      <Move />
      <Resize />
    </>
  );
};

export default memo(LayerOperate);
