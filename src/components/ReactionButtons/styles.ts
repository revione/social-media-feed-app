import styled from "styled-components/macro"

export const Wrapper = styled.div`
  button {
    border: none;
    background: transparent;

    margin: 5px 0 10px;
    cursor: pointer;
    transition: all 0.15s linear;

    &:hover {
      transform: scale(1.3);
    }
  }
`
