import { useStoreState } from "@/store";

const useLayerHelper = () => {
  const { layers } = useStoreState((state) => state.stage);

  const getLayer = (id: string) => {
    console.log(layers);
    return layers.find((layer) => layer.id === id);
  };

  const getLayerIndex = (id: string) => {
    return layers.findIndex((layer) => layer.id === id);
  };

  return {
    getLayer,
    getLayerIndex,
  };
};

export default useLayerHelper;
