import { FC } from "react"
import { Flex, Text } from ".."
import { PaginationGroupButtons } from "./table.styles"  

export interface PaginationProps {
  totalData: number
  config: {
    toPage: (page: number) => void
    isOnFirstPage: boolean
    isOnLastPage: boolean
    prevPage: number
    nextPage: number
    pageButtons: number[]
    currentPage: number
  }
}

export const Pagination: FC<PaginationProps> = ({
  totalData,
  config
}) => {

  const { isOnFirstPage, isOnLastPage, nextPage, pageButtons, prevPage, toPage, currentPage } = config

  return (
    <Flex justify="space-between">
      <Text>Total de registros: <Text weight="600">{totalData}</Text></Text>

      <PaginationGroupButtons>
        <button
          onClick={() => !isOnFirstPage && toPage(prevPage)}
          disabled={isOnFirstPage}
        >
            Anterior
        </button>

        {pageButtons.sort().map(p => (
          <button
            key={`td-${totalData}-bn-${p}`}
            disabled={currentPage === p}
            onClick={() => (currentPage !== p) && toPage(p)}
          >
            {p}
          </button>
        ))}

        <button
          onClick={() => !isOnLastPage && toPage(nextPage)}
          disabled={isOnLastPage}
        >
            Próximo
        </button>
      </PaginationGroupButtons>
    </Flex>
  )
}