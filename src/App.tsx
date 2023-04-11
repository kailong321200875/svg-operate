import EditorStage from "./stage/editor-stage";
import RenderLayers from "./layers/render-layers";
import Operate from "@/operate";
import { AppStyle } from "./App.style";

function App() {
  return (
    <AppStyle>
      <EditorStage width={800} height={560}>
        <RenderLayers />
        <Operate />
      </EditorStage>
    </AppStyle>
  );
}

export default App;
