import styled, { CSSProperties } from "styled-components";

const RotateStyle = styled.span<CSSProperties>`
  position: absolute;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  cursor: url(https://titan-img.meitudata.com/xiuxiu-pc/img/svg/mouse-icon-rotate-0.svg)
      12 12,
    auto;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  & * {
    pointer-events: none;
  }
`;

export { RotateStyle };
