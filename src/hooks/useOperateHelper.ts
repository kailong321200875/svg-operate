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

  return {
    setMoving,
    getMoving,
    setScaling,
    getScaling,
  };
};

export default useOperateHelper;
