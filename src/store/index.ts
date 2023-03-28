import { createStore, createTypedHooks } from "easy-peasy";
import { stageModel, StageModel } from "./models/stage";

interface EditorModel {
  stage: StageModel;
}

const editorModel: EditorModel = {
  stage: stageModel,
};

export const store = createStore(editorModel);

export const { useStoreActions, useStoreState } =
  createTypedHooks<EditorModel>();
