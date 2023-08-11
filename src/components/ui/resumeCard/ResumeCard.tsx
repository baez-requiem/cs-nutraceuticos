import { FC, ReactNode, useState } from "react"

import styled from "styled-components"

import {
  Paper,
  Divider,
  Text,
  Flex,
  IconButton,
  Fade
} from '../'
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"

const StyledPaper = styled(Paper)`
  width: 100%;
  max-width: 100%;
`

const Content = styled.div`
  width: 100%;
  max-width: 100%;
  overflow-x: auto;

  display: flex;
  justify-content: start;
  gap: 20px;

  padding-bottom: 10px;
`

interface ResumeCardProps {
  title: string
  children: ReactNode
}

const ResumeCard: FC<ResumeCardProps> = ({ title, children }) => {
  const [show, setShow] = useState(false)

  return (
    <StyledPaper>
      <Flex justify="space-between" items="center">
        <Text weight="500">{title}</Text>
        <IconButton onClick={() => setShow(!show)}>
          {show
            ? <AiOutlineMinus color="black" />
            : <AiOutlinePlus color="black" />
          }
        </IconButton>
      </Flex>

      <Fade.FadeIn show={show} mh={500}>
        <Divider my={10} />

        <Content>
          {children}
        </Content>
      </Fade.FadeIn>

    </StyledPaper>
  )
}

export { ResumeCard }