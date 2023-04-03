/**
 * 根据类名寻找父元素
 * @param dom dom元素
 * @param className css类名
 * @return dom | null
 */
export const findParentByClass = (
  dom: any,
  className: string
): HTMLElement | null => {
  if (!dom || dom.tagName === "BODY") {
    return null;
  }
  if (dom.classList.contains(className)) {
    return dom as HTMLElement;
  }
  return findParentByClass(dom.parentNode, className);
};

// export const mousePointInStage = (e: any, scale = 1) => {
//   const { stage, scale = 1 } = this.props;
//   const { pageX, pageY } = e;
//   const { coordinate: stagePos } = stage.store();
//   const mousePoint = {
//     x: pageX - stagePos.x,
//     y: pageY - stagePos.y
//   };
//   mousePoint.x /= scale;
//   mousePoint.y /= scale;
//   return mousePoint;
// };

// 获取某个元素的宽高及其相对于视口的位置
export const getDomInfo = (dom: HTMLElement) => {
  if (!dom) {
    return null;
  }
  const { top, left, width, height } = dom.getBoundingClientRect();
  return {
    top,
    left,
    width,
    height,
  };
};
