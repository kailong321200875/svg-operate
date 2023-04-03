import { FC, memo } from "react";
import cs from "classnames";
import "./index.less";

interface EditorStageProps {
  width: number;
  height: number;
  children: React.ReactNode;
}

const EditorStage: FC<EditorStageProps> = (props) => {
  const { width, height, children } = props;

  return (
    <div
      className={cs("m-stage")}
      style={{
        width,
        height,
      }}
    >
      {children}
    </div>
  );
};

export default memo(EditorStage);
