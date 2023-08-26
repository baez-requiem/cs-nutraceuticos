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
  tr.p-tr-e {
    background-color: ${({ theme }) => theme.mode === 'light' ? '#00000005' : '#ffffff05'};
  }

  tr.p-tr {
    transition: all .2s;

    :hover {
      background-color: ${({ theme }) => theme.mode === 'light' ? '#0001' : '#fff1'};
    }
  }
`

export const StyledTH = styled.th<{text?: string, width?: number}>`
  padding: 7.5px 10px;
  text-align: ${({ text = 'left' }) => text};
  height: 52px;
  max-width: ${({ width }) => width ? (width+'px') : 'unset'};
`

export const StyledTD = styled.td<{paddingNone?: boolean}>`
  height: 52px;
  padding: ${({ paddingNone }) => paddingNone ? '0 10px' : '10px'};
  text-align: left;
`

export const TableTitle = styled.p`
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding: 7.5px 10px;
  background-color: ${({ theme }) => theme.mode === 'light' ? theme.colors.gray_200 : theme.colors.zinc_700};
  color: ${({ theme }) => theme.mode === 'light' ? theme.colors.gray_600 : theme.colors.gray_50};
  width: fit-content;

  font-size: 15px;
  font-weight: 500;
  letter-spacing: 1px;

  border-bottom: 1px solid ${({ theme }) => theme.mode === 'dark' ? '#ffffff10' : '#00000010'};
`

export const PaginationGroupButtons = styled.div`

  button {
    min-width: 30px;
    min-height: 30px;
  
    background-color: transparent;

    border: none;
    cursor: pointer;
    padding: 5px;

    color: ${({ theme }) => theme.colors.text};

    :not(:first-child):not(:last-child) {
      border-radius: 0;
      border: none;
      border-top: 1px solid #ccc8;
      border-bottom: 1px solid #ccc8;
      border-left: 1px solid #ccc8;
    }

    :first-child {
      border-top: 1px solid #ccc8;
      border-bottom: 1px solid #ccc8;
      border-left: 1px solid #ccc8;

      border-bottom-left-radius: 5px;
      border-top-left-radius: 5px;
    }

    :last-child {
      border-top: 1px solid #ccc8;
      border-bottom: 1px solid #ccc8;
      border-right: 1px solid #ccc8;
      border-left: 1px solid #ccc8;

      border-bottom-right-radius: 5px;
      border-top-right-radius: 5px;
    }

    :disabled {
      cursor: unset;
      pointer-events: none;
      background-color: #ccc2;
    }
  }

`