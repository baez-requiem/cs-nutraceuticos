import styled from "styled-components"

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