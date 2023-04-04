import { action, Action, thunk, Thunk } from "easy-peasy";

export interface OperateModel {
  moving: boolean;
  setMoving: Action<OperateModel, boolean>;
  getMoving: Thunk<OperateModel, void, {}, {}, boolean>;
}

export const operateModel: OperateModel = {
  moving: false,
  setMoving: action((state, moving) => {
    state.moving = moving;
  }),
  getMoving: thunk((_, __, { getState }) => {
    return getState().moving;
  }),
};
