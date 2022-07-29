import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Pagination from './AppPagination'
import NewsList from "./NewsList"; 

import '../App.css';

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [view, setView] = useState("all");

  const handleViewChange = (view) => { 
      setView(view);
  };  

  const handlePageChange = event => {
    setCurrentPage(event.selected);
    console.log(`event.selected: ${event.selected}`);
  };

  const handleFilter = event => {

  };

  useEffect(() => {
    if(view === 'all') {
    setIsLoading(true);
        const fetchData = async () => {
        try {
            const { data } = await axios.get("http://hn.algolia.com/api/v1/search?");
            const { hits, nbPages } = data;
            setArticles(hits);
            setTotalPages(nbPages);
        }
        catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
        };
        fetchData();
    }
    else{
        
    }
  },[view]);

  return (
      <div className="container">
          <div className="Rectangle-2-Copy">
            <span className="HACKER-NEWS Text-Style">
              HACKER NEWS
            </span>
          </div>
          <ul className='view-news'>
            <li className={view === 'all' ? 'active' : ''} onClick={()=>handleViewChange('all')}>
                <span>All</span>
            </li>
            <li className={view === 'my-favs' ? 'active' : ''} onClick={()=>handleViewChange('my-favs')}>
                <span>My Favs</span>
            </li>
          </ul>
          <select id="options" className="" onChange={e => handleFilter(e.target.value)} />
          <div className="news-container">
            <NewsList view={view} articles={articles}></NewsList>
          </div>
          <Pagination 
            forcePage={currentPage}
            pageCount={totalPages} 
            renderOnZeroPageCount={null} 
            onPageChange={handlePageChange}
            className="pagination"
            activeClassName="active-page"
            previousClassName='previus-page'
            nextClassName='next-page' />         
      </div>
  )
};

export default HomePage;