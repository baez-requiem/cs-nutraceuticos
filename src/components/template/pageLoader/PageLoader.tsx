import { Loader } from "src/components/ui"
import styled from "styled-components"

const PageLoaderContainer = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`

const PageLoader = () => {

  return (
    <PageLoaderContainer>
      <Loader />
    </PageLoaderContainer>
  )
}

export default PageLoader