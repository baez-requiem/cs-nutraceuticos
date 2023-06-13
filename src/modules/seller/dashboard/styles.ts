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
  
  tfoot th {}
`

export const CardsContainer = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  > :nth-child(1) {
    grid-column: 1/5; 
  }

  > :nth-child(2) {
    grid-column: 1/4; 
  }
 
  > :nth-child(3) {
    grid-column: 4/5; 
  }


  /* @media (${({ theme }) => theme.device.lg}) {
    > :nth-child(3) {
      grid-column: 1/3; 
    }
    > :nth-child(4) {
      grid-column: 3/5; 
    }
  } */

  @media (${({ theme }) => theme.device.md}) {
    > :nth-child(1),
    > :nth-child(2),
    > :nth-child(3),
    > :nth-child(4),
    > :nth-child(5),
    > :nth-child(6),
    > :nth-child(7),
    > :nth-child(8),
    > :nth-child(9),
    > :nth-child(10) {
      grid-column: 1/5;
    }
  }
`