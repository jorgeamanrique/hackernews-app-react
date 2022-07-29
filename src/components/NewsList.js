import axios from 'axios';
import React, { useState, useEffect } from 'react';
import NewsCard from "./NewsCard";
// // import ReactPaginate from 'react-paginate';
import Pagination from './AppPagination'

import '../App.css';

const NewsPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);

  const handlePageChange = event => {
    setCurrentPage(event.selected);
    console.log(`event.selected: ${event.selected}`);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://hn.algolia.com/api/v1/search?");
        const { hits, nbPages, author } = data;
        setArticles(hits);
        setTotalPages(nbPages);
        //console.log(`data: ${author} - ${hits.created_at}`);
        //console.log(hits);
      }
      catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  },[]);

  return (
      <div className="container">
          <div className="Rectangle-2-Copy">
            <span className="HACKER-NEWS Text-Style">
              HACKER NEWS
            </span>
          </div>
          <div className="news-container">
            { articles.map((article) => (
                <NewsCard article={article} key={article.objectID} /> 
              ))
            }
          </div>
          {/* <ReactPaginate color="primary"
            nexLabel=">>" 
            previousLabel="<<" 
            breakLabel="..." 
            forcePage={currentPage} 
            pageCount={totalPages} 
            renderOnZeroPageCount={null} 
            onPageChange={handlePageChange} 
            className="pagination"
            activeClassName="active-page"
            previousClassName='previus-page'
            nextClassName='next-page'
          /> */}
          <Pagination 
            forcePage={currentPage}
            pageCount={totalPages} 
            renderOnZeroPageCount={null} 
            onPageChange={handlePageChange}
            className="pagination"
            activeClassName="active-page"
            previousClassName='previus-page'
            nextClassName='next-page'
          ></Pagination>
         
      </div>
  )
};

export default NewsPage;