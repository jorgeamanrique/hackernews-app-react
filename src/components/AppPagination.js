import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import '../App.css'

const PaginationRounded = ({ setPage, totalPages }) => {

  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0,0);
  };

  return (
    <div>
      <div className='pagination-content'>
        <Stack spacing={2}>
          <Pagination 
            count={totalPages} 
            variant="outlined" 
            shape="rounded" 
            color="primary"
            onChange={e => handlePageChange(e.target.textContent)}/>
        </Stack>
      </div>
    </div>
  );
}

export default PaginationRounded;