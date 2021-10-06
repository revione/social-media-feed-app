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
  display: flex;
  column-gap: 20px;
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

export const ButtonNotifications = styled.button`
  display: block;
  margin: 0 auto;
  margin-bottom: 20px;
  padding: 7px 14px;
  background: transparent;
  border: none;
  border-bottom: 1px solid white;
  font-size: 15px;
  color: white;
  cursor: pointer;
  transition: all 0.1s linear;

  span {
    font-weight: bold;
  }

  &:hover {
    color: #6c0b9d;
    border-bottom: 1px solid #6c0b9d;
    transform: scale(1.025);
  }
`
