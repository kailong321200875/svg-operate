import { action, Action, thunk, Thunk } from "easy-peasy";

export interface OperateModel {
  moving: boolean;
  setMoving: Action<OperateModel, boolean>;
  getMoving: Thunk<OperateModel, void, {}, {}, boolean>;
  scaling: boolean;
  setScaling: Action<OperateModel, boolean>;
  getScaling: Thunk<OperateModel, void, {}, {}, boolean>;
}

export const operateModel: OperateModel = {
  moving: false,
  setMoving: action((state, moving) => {
    state.moving = moving;
  }),
  getMoving: thunk((_, __, { getState }) => {
    return getState().moving;
  }),
  scaling: false,
  setScaling: action((state, scaling) => {
    state.scaling = scaling;
  }),
  getScaling: thunk((_, __, { getState }) => {
    return getState().scaling;
  }),
};
