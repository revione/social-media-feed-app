import styled from "styled-components/macro"

export const Section = styled.section`
  max-width: 799px;
  margin: 0 auto;
  padding: 20px;

  h2 {
    margin-top: 0;
  }
`

export const Post = styled.section`
  border: 1px solid #b1aeae;
  border-radius: 8px;

  padding: 8px;

  margin-bottom: 10px;

  h3 {
    margin: 0 0 10px;
  }

  p {
    margin: 10px 0;
  }

  a {
    text-decoration: none;
    color: #926bcf;
    transition: all 0.25s linear;

    &:hover {
      color: #351369;
    }
  }
`

export const Wrap = styled.div`
  display: flex;
`
