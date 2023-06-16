import { useMemo, useState } from "react"
import { nextPreviousNumbers } from "src/utils/number.utils"

const usePagination = (data: { [key: string]: string | number }[], recordsPerPage = 10 ) => {
  const [currentPage, setPage] = useState<number>(1)

  const toPage = (page: number) => {
    setPage(page)
  }

  const totalPages = Math.ceil(data.length / recordsPerPage) || 1

  const isOnFirstPage = currentPage === 1
  const isOnLastPage = currentPage === totalPages

  const prevPage = currentPage - 1
  const nextPage = currentPage + 1

  const pageButtons = nextPreviousNumbers(currentPage, totalPages)

  const paginationData = useMemo(() => {
    const end = currentPage * recordsPerPage
    const init = end - recordsPerPage

    return data.slice(init, end)
  }, [data, currentPage])

  return {
    toPage,
    currentPage,
    isOnFirstPage,
    isOnLastPage,
    prevPage,
    nextPage,
    pageButtons,
    paginationData
  }
}

export { usePagination }