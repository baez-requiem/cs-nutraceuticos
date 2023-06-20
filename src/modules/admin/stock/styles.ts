import styled from "styled-components"

export const StyledTable = styled.table`
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

  tbody td > div:not(:first-child) {
    display: flex;
    align-items: end;
    height: 34px;
  }

  tbody td:last-child > button{
    margin-top: auto;
  }
`

export const StyledMisplacementsTable = styled(StyledTable)`
  thead th:first-child {
    width: 70%;
  }
`