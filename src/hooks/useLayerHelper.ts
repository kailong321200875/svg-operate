import { useStoreActions } from "@/store";

const useLayerHelper = () => {
  const getLayerById = useStoreActions(
    (actions) => actions.layerModel.findLayerById
  );

  const addLayer = useStoreActions((actions) => actions.layerModel.addLayer);

  const addActiveLayer = useStoreActions(
    (actions) => actions.layerModel.addActiveLayer
  );

  const updateLayerById = useStoreActions(
    (actions) => actions.layerModel.updateLayerById
  );

  return {
    getLayerById,
    addLayer,
    addActiveLayer,
    updateLayerById,
  };
};

export default useLayerHelper;
