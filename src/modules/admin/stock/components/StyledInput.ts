import styled from "styled-components";

export const StyledInput = styled.input`
  width: 100%;
  height: 32px;

  border-radius: 5px;
  padding: 0 10px;
  border: 1.5px solid #ccc;

  color: ${({ color, theme }) => color || theme.colors.text};
  font-size: 1rem;
`