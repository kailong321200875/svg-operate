import styled from "styled-components";

const CoverStyle = styled.div`
  transform-origin: center;
  position: fixed;
  z-index: 99999;
  box-sizing: border-box;
  pointer-events: none;

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 2px solid #80a3ff;
  }
`;

export { CoverStyle };
