import { React } from 'react';
// import NewsCard from './NewsCard';
// import NewsCard from '../NewsCard.js';
import CardNew from '../cardNew';
import './ListNews.modules.css';

const ListNews = ({ articles }) => {
    if(articles === null) return null;
    return (
      articles.map((article) => <CardNew article={article} key={article.objectID} /> )
    );    
  };
  
  export default ListNews;