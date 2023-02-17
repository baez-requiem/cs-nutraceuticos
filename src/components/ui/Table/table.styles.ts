import styled from "styled-components"

export const Container = styled.div`
  width: 100%;  
  overflow-x: auto;
`

export const StyledTable = styled.table<{minWidth?: number}>`
  width: 100%;
  min-width: ${({ minWidth }) => minWidth ? (minWidth + "px") : 'unset'};

  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-collapse: collapse;
`

export const THead = styled.thead`
  background-color: ${({ theme }) => theme.mode === 'light' ? theme.colors.gray_200 : theme.colors.zinc_700};
`

export const TBody = styled.tbody`
  tr:nth-child(even) {
    background-color: ${({ theme }) => theme.mode === 'light' ? '#00000010' : '#ffffff15'};
  }

  tr {
    transition: all .2s;

    :hover {
      background-color: ${({ theme }) => theme.mode === 'light' ? '#0002' : '#fff2'};
    }
  }
`

export const StyledTH = styled.th<{text?: string, width?: number}>`
  padding: 10px;
  text-align: ${({ text = 'left' }) => text};
  height: 52px;
  max-width: ${({ width }) => width ? (width+'px') : 'unset'};
`

export const StyledTD = styled.td<{paddingNone?: boolean}>`
  height: 52px;
  padding: ${({ paddingNone }) => paddingNone ? '0 12.5px' : '12.5px'};
  text-align: left;
`