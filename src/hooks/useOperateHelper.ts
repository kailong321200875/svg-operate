import { useStoreActions } from "@/store";

const useOperateHelper = () => {
  const setMoving = useStoreActions(
    (actions) => actions.operateModel.setMoving
  );

  const getMoving = useStoreActions(
    (actions) => actions.operateModel.getMoving
  );

  const setScaling = useStoreActions(
    (actions) => actions.operateModel.setScaling
  );

  const getScaling = useStoreActions(
    (actions) => actions.operateModel.getScaling
  );

  const setRotating = useStoreActions(
    (actions) => actions.operateModel.setRotating
  );

  const getRotating = useStoreActions(
    (actions) => actions.operateModel.getRotating
  );

  return {
    setMoving,
    getMoving,
    setScaling,
    getScaling,
    setRotating,
    getRotating,
  };
};

export default useOperateHelper;
