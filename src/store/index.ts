import { createStore, createTypedHooks } from "easy-peasy";
import { stageModel, StageModel } from "./models/stage";
import { operateModel, OperateModel } from "./models/operate";
import { layerModel, LayerModel } from "./models/layer";

interface EditorModel {
  stageModel: StageModel;
  operateModel: OperateModel;
  layerModel: LayerModel;
}

const editorModel: EditorModel = {
  stageModel,
  operateModel,
  layerModel,
};

export const store = createStore(editorModel);

const typedHooks = createTypedHooks<EditorModel>();
export const useStoreState = typedHooks.useStoreState;
export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
