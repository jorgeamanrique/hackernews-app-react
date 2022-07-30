import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListNews from '../listNews';
import PaginationRounded from '../pagination';
import SearchNews from '../searchNews';
import './HomeNews.modules.css';

const HomeNews = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("reactjs");
  const [articles, setArticles] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [view, setView] = useState("all");
  const [open, setOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Select your news");

  useEffect(() => {
    if(view === 'all') {
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
        }};
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
                    <SearchNews open={open} view={view} setQuery={setQuery} setOpen={setOpen} setSelectedFilter={setSelectedFilter}></SearchNews>
                </div>
                <div className="news-container">
                    <ListNews view={view} articles={articles}></ListNews>
                </div>
                <PaginationRounded
                setPage={setPage}
                totalPages={totalPages}
                />
           </section>
      </main>
  )
};

export default HomeNews;