import EditorStage from "./stage/editor-stage";
import "./App.less";
import RenderLayers from "./layers/render-layers";
import Operate from "@/operate";

function App() {
  return (
    <>
      <EditorStage width={800} height={560}>
        <RenderLayers />
        <Operate />
      </EditorStage>
    </>
  );
}

export default App;
