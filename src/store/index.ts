import { createStore, createTypedHooks } from "easy-peasy";
import { stageModel, StageModel } from "./models/stage";
import { operateModel, OperateModel } from "./models/operate";

interface EditorModel {
  stage: StageModel;
  operate: OperateModel;
}

const editorModel: EditorModel = {
  stage: stageModel,
  operate: operateModel,
};

export const store = createStore(editorModel);

const typedHooks = createTypedHooks<EditorModel>();
export const useStoreState = typedHooks.useStoreState;
export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
