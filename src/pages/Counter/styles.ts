import styled from "styled-components/macro"

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;

  max-width: 799px;
  margin: 0 auto;
  padding: 20px;

  text-align: center;

  > div {
    display: flex;
    flex-direction: column;
    row-gap: 10px;

    justify-content: center;
    align-items: center;
  }

  input {
    width: 50px;
  }
`
