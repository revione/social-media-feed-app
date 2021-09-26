import styled from "styled-components/macro"

export const Section = styled.section`
  max-width: 799px;
  margin: 0 auto;
  padding: 20px;

  form {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }

  label {
    font-weight: bold;
  }

  input,
  textarea {
    border: 1px solid rgb(177, 174, 174);
    border-radius: 8px;

    padding: 10px;

    outline: none;

    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;

    &:focus {
      box-shadow: 0 0 1px 1px #1714e4;
    }
  }

  button {
    width: fit-content;
    padding: 10px;

    border: none;
    border-radius: 3px;
    background-color: #1976d2;
    color: white;

    cursor: pointer;

    transition: all 0.25s linear;

    &:disabled,
    &:disabled:hover {
      opacity: 0.5;
    }

    &:hover {
      background-color: #1952d2;
    }
  }
`
