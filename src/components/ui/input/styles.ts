import styled, { css } from "styled-components"

export const Container = styled.div<{ block: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;

  flex-wrap: wrap;

  height: 50px;

  width: ${({ block }) => block ? '100%' : 'auto'};
`

export const StyledInput = styled.input<{ block: boolean }>`
  margin-top: auto;
  border-radius: 5px;
  padding: 0 10px;
  border: 1.5px solid ${({ theme }) => theme.mode === 'light' ? '#ddd' : '#ccc5'};
  height: 32px;
  background-color: ${({ theme }) => theme.mode === 'light' ? '#fff' : '#4441'};

  color: ${({ color, theme }) => color || theme.colors.text};
  font-size: 1rem;

  transition: all .3s;

  :disabled {
    background-color: ${({ theme }) => theme.mode === 'light' ? '#eee' : '#5554'};
    color: ${({ theme }) => theme.mode === 'light' ? theme.colors.text : '#ccc'};
  }

  :focus:not(:disabled) {
    border: 1.5px solid ${({ theme }) => theme.colors.sky_600};
  }

  width: ${({ block }) => block ? '100%' : 'auto'};

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

  [type=number] {
    -moz-appearance: textfield;
  }
`

export const StyledLabel = styled.label<{ hasUp: boolean }>`
  font-size: 1rem;
  margin-bottom: 4px;

  width: fit-content;

  position: absolute;
 
  top: 26.25px;
  left: 10px;
  
  transition: all .3s;
  
  ${({ hasUp }) => hasUp && css`
    top: 0px;
    left: 0px;
    font-size: 0.875rem;
 `}
`