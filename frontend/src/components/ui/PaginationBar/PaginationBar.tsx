import React from 'react'
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md'

type Props = {
  currentPage: number
  totalPages: number
  setPage: (page: number) => void
}

const PaginationBar = ({ currentPage, totalPages, setPage }: Props) => {

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setPage(currentPage + 1)
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1)
    }
  }



  return (
    <div className='flex w-fit space-x-5'>
      <MdNavigateBefore size={30} className="cursor-pointer" onClick={goToPreviousPage} />
      {/* {currentPage > 1 && <span>{currentPage - 1}</span>} */}
      <span className='text-xl'>{currentPage} of {totalPages}</span>
      <MdNavigateNext size={30} className="cursor-pointer" onClick={goToNextPage} />
    </div>
  )
}

export default PaginationBar