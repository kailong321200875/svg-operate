import EditorStage from "./stage/editor-stage";
import "./App.less";
import RenderLayers from "./layers/render-layers";

function App() {
  return (
    <>
      <EditorStage width={800} height={560}>
        <RenderLayers />
      </EditorStage>
    </>
  );
}

export default App;
