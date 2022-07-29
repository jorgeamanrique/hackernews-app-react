import { React, useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import '../App.css';

const NewsList = ({ articles }) => {
  return (
    articles.map((article) => <NewsCard article={article} key={article.objectID} /> )
  );    
};

export default NewsList;