import { useStoreActions } from "@/store";

const useOperateHelper = () => {
  const setMoving = useStoreActions(
    (actions) => actions.operateModel.setMoving
  );

  const getMoving = useStoreActions(
    (actions) => actions.operateModel.getMoving
  );

  return {
    setMoving,
    getMoving,
  };
};

export default useOperateHelper;
