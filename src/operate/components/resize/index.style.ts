import styled from "styled-components";

const ResizeStyle = styled.div`
  transform-origin: center;
  position: fixed;
  z-index: 99999;
  box-sizing: border-box;
  cursor: move;

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 2px solid #80a3ff;
  }

  .m-resize__anchor {
    pointer-events: auto;
    display: block;
    background-color: #fff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1), 0px 0px 1px rgba(0, 0, 0, 0.5);
    content: "";
    box-sizing: border-box;

    &--top {
      width: 16px;
      height: 6px;
      border-radius: 4px;
      cursor: url(https://titan-img.meitudata.com/xiuxiu-pc/img/svg/cursor-scale-0.svg)
          12 12,
        auto;
    }

    &--top-right {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      cursor: url(https://titan-img.meitudata.com/xiuxiu-pc/img/svg/cursor-scale-1.svg)
          12 12,
        auto;
    }

    &--right {
      width: 6px;
      height: 16px;
      border-radius: 4px;
      cursor: url(https://titan-img.meitudata.com/xiuxiu-pc/img/svg/cursor-scale-2.svg)
          12 12,
        auto;
    }

    &--right-bottom {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      cursor: url(https://titan-img.meitudata.com/xiuxiu-pc/img/svg/cursor-scale-3.svg)
          12 12,
        auto;
    }

    &--bottom {
      width: 16px;
      height: 6px;
      border-radius: 4px;
      cursor: url(https://titan-img.meitudata.com/xiuxiu-pc/img/svg/cursor-scale-0.svg)
          12 12,
        auto;
    }

    &--bottom-left {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      cursor: url(https://titan-img.meitudata.com/xiuxiu-pc/img/svg/cursor-scale-1.svg)
          12 12,
        auto;
    }

    &--left {
      width: 6px;
      height: 16px;
      border-radius: 4px;
      cursor: url(https://titan-img.meitudata.com/xiuxiu-pc/img/svg/cursor-scale-2.svg)
          12 12,
        auto;
    }

    &--left-top {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      cursor: url(https://titan-img.meitudata.com/xiuxiu-pc/img/svg/cursor-scale-3.svg)
          12 12,
        auto;
    }
  }
`;

const ResizeAnchorStyle = styled.div``;

export { ResizeStyle };
