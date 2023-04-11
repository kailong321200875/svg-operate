import styled from "styled-components";

interface EditorStageStyleProps {
  width: number;
  height: number;
}

const EditorStageStyle = styled.div<EditorStageStyleProps>`
  position: relative;
  overflow: hidden;
  background-color: #999;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 1px solid #333;
    z-index: -10;
  }
`;

export { EditorStageStyle };
