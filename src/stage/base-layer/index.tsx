import { FC, memo, ReactNode } from "react";

interface BaseLayerProps {
  children: ReactNode;
}

const BaseLayer: FC<BaseLayerProps> = (props) => {
  const { children } = props;
  return <div>{children}</div>;
};

export default memo(BaseLayer);
