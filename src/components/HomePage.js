import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Pagination from './AppPagination'
import NewsList from "./NewsList"; 

import '../App.css';
import PaginationRounded from './AppPagination';
import Filter from './Filter';

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("reactjs");
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [view, setView] = useState("all");
  const [open, setOpen] = useState(false);

  const handleFilter = event => {
    setQuery(event);
  };

  useEffect(() => {
    if(view === 'all') {
    setIsLoading(true);
        const fetchData = async () => {
        try {
            console.log(`page: ${page}`);
            const { data } = await axios.get("https://hn.algolia.com/api/v1/search_by_date?",{
                params: {query: query, page: page},
            });
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
        try{
            let news = localStorage.getItem("liked-news");
            if(news !== undefined){
                setArticles(JSON.parse(news));
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
  },[view, page, query]);

  return (
      <div className="container">
          <div className="title-info">
            <span className="text-style">
              HACKER NEWS
            </span>
          </div>
          <ul className='view-news'>
            <li className={view === 'all' ? 'active' : ''} onClick={()=>{setView('all')}}>
                <span>All</span>
            </li>
            <li className={view === 'my-favs' ? 'active' : ''} onClick={()=>{setView('my-favs')}}>
                <span>My Favs</span>
            </li>
          </ul>
          {/*<div className="filter-container">
             <select id="options" className="select-filter" onChange={e => handleFilter(e.target.value)} >
                <option value="-1" disabled selected hidden>Selet your news</option>
                <option value="angular">Angular</option>
                <option value="reactjs">Reacts</option>
                <option value="vuejs">Vuejs</option>
            </select> 
                
          </div>*/}
          <div className="filter-root">
            <div id="select-container" onClick={() => {setOpen(!open)}}>
                <p>Select your news</p>
                <img src="arrow.png"></img>
            </div>
            <Filter open={open}></Filter>
          </div>
          {/* <div className="filter-container">
            
          </div> */}
          
          <div className="news-container">
            <NewsList view={view} articles={articles}></NewsList>
          </div>
          <PaginationRounded
            setPage={setPage}
            totalPages={totalPages}
            />
      </div>
  )
};

export default HomePage;