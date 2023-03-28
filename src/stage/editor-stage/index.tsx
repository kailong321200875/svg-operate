import { FC, memo } from "react";
import cs from "classnames";

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
        outline: "1px solid #ddd",
        position: "relative",
      }}
    >
      {children}
    </div>
  );
};

export default memo(EditorStage);
