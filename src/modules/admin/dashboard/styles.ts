import styled from "styled-components";

export const CardsContainer = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  > :nth-child(1) {
    grid-column: 1/3; 
  }

  > :nth-child(2) {
    grid-column: 3/5; 
  }
 
  > :nth-child(4) {
    grid-column: 2/5; 
  }
  
  > :nth-child(5) {
    grid-column: 1/3; 
  }
  
  > :nth-child(6) {
    grid-column: 3/5; 
  }
 
  > :nth-child(7) {
    grid-column: 1/3; 
  }
  
  > :nth-child(8) {
    grid-column: 3/5; 
  }
  
  > :nth-child(9) {
    grid-column: 1/3; 
  }
  
  > :nth-child(10) {
    grid-column: 3/5; 
  }
`