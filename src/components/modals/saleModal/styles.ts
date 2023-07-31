import styled from "styled-components"

export const Table = styled.table<{ show?: boolean }>`

  display: ${({ show = true }) => show ? 'table' : 'none'};

  width: 100%;
  border-collapse: collapse;

  tr:nth-child(even) {
    background-color: #00000009;
  }

  th, td {
    padding: 5px;
  }

  thead th {
    text-align: left;
    border-bottom: 1px solid #00000009;
  }

  thead th:first-child {
    width: 40%;
  }

  thead th:is(:nth-child(2), :nth-child(3)) {
    width: 80px;
  }

  thead th:nth-child(4) {
    text-align: center;
  }

  thead th:nth-child(5) {
    width: 40px;
  }

  tbody td > div:not(:first-child) {
    display: flex;
    align-items: end;
    height: 34px;
  }

  tbody td:nth-child(4) {
    text-align: center;
  }

  tbody td:last-child > button{
    margin-top: auto;
  }
  
  tfoot th {
    padding: 10px 5px;
  }
`

export const Input = styled.input`
  width: 100%;
  height: 32px;

  border-radius: 5px;
  padding: 0 10px;
  border: 1.5px solid #ccc;

  color: ${({ color, theme }) => color || theme.colors.text};
  font-size: 1rem;
`