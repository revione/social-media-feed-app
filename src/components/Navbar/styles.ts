import styled from "styled-components/macro"

export const Nav = styled.nav`
  display: flex;
  background-color: #926bcf;

  color: white;

  padding: 0 20px;

  section {
    max-width: 799px;
    margin: 0 auto;
  }
`

export const NavContent = styled.div`
  margin-bottom: 20px;

  a {
    text-decoration: none;
    color: white;
    transition: all 0.25s linear;

    &:hover {
      color: #351369;
    }
  }
`
