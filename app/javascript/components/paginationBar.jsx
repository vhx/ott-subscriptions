import React from 'react'
import { Pagination } from 'semantic-ui-react'
import './paginationBar.scss'

const PaginationBar = ({page, pages, onPageChange}) => {
  console.log(page, pages, onPageChange);
  return (
  <div className='paginationBarWrapper'> 
    <Pagination
      size='mini'
      boundaryRange={0}
      firstItem={'First'}
      lastItem={'Last'}
      siblingRange={2}
      defaultActivePage={page}
      totalPages={pages}
      onPageChange={onPageChange}
    />
  </div>
  )
}

export default PaginationBar