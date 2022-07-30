import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './pagination.module.css';

const PaginationRounded = ({ setPage, totalPages }) => {
  return (
    <div>
      <div className='pagination-content'>
        <Stack spacing={2}>
          <Pagination 
            count={totalPages} 
            variant="outlined" 
            shape="rounded" 
            color="primary"
            onChange={e => {setPage(e.target.textContent); window.scroll(0,0);}}/>
        </Stack>
      </div>
    </div>
  );
}

export default PaginationRounded;