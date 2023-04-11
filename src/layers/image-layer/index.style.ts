import styled from "styled-components";

const ImageLayerStyle = styled.div`
  user-select: none;

  & img {
    display: block;
    user-select: none;
    pointer-events: none;
    width: 100%;
    height: 100%;
  }
`;

export { ImageLayerStyle };
