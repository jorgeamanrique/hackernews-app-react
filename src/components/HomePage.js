import axios from 'axios';
import React, { useState, useEffect } from 'react';
import NewsList from "./NewsList"; 

import '../App.css';
import PaginationRounded from './pagination';
import Filter from './Filter';

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("reactjs");
  const [articles, setArticles] = useState([]);
  //const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [view, setView] = useState("all");
  const [open, setOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Select your news");

  useEffect(() => {
    if(view === 'all') {
    // setIsLoading(true);
        const fetchData = async () => {
        try {
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
            // setIsLoading(false);
        }
        };
        fetchData();
    }
    else{
        try{
            setOpen(false);
            setArticles(null);
            let news = localStorage.getItem("liked-news");
            let count = 0;
            if(news !== undefined && news !== null){
                setArticles(JSON.parse(news));
                JSON.parse(news).forEach(article=>{
                    count ++;
                });
            }
            
            if(count >0){
                setTotalPages(Math.ceil(count/20));
            }
            else{
                setTotalPages(0);
            }
        } catch (error) {
            console.log(error);
        } finally {
            // setIsLoading(false);
        }
    }
  },[view, page, query]);

  return (
      <main className="container">
          <section className="title-info">
            <span className="text-style">
              HACKER NEWS
            </span>
          </section>
          <section className="content"> 
                <ul className='view-news'>
                    <li className={view === 'all' ? 'active' : ''} onClick={()=>{setView('all')}}>
                        <span>All</span>
                    </li>
                    <li className={view === 'my-favs' ? 'active' : ''} onClick={()=>{setView('my-favs')}}>
                        <span>My Favs</span>
                    </li>
                </ul>
                <div className="filter-root">
                        <div className={`select-container ${view === 'all' ? 'active' : 'inactive'}`} id="select-container" onClick={() => {setOpen(!open)}}>
                            <p>{selectedFilter}</p>
                            <img src="arrow.png"></img>
                        </div>
                        <Filter open={open} view={view} setQuery={setQuery} setOpen={setOpen} setSelectedFilter={setSelectedFilter}></Filter>
                </div>
                <div className="news-container">
                    <NewsList view={view} articles={articles}></NewsList>
                </div>
                <PaginationRounded
                setPage={setPage}
                totalPages={totalPages}
                />
           </section>
      </main>
  )
};

export default HomePage;