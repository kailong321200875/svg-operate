import { action, Action } from "easy-peasy";

export interface OperateModel {
  moving: boolean;
  setMoving: Action<OperateModel, boolean>;
}

export const operateModel: OperateModel = {
  moving: false,
  setMoving: action((state, moving) => {
    state.moving = moving;
  }),
};
