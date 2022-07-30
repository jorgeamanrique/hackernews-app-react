import { React, useState, useEffect } from 'react';
import '../App.css';

const NewsCard = ({ article }) => {
    const [liked, setLiked] = useState(false);

    // Get time ago for each article:
    const timeSince = (date) => {

        var seconds = Math.floor((new Date() - date) / 1000);  
        var interval = seconds / 31536000;
      
        if (interval > 1) {
          return Math.floor(interval) + " years";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
          return Math.floor(interval) + " months";
        }
        interval = seconds / 86400;
        if (interval > 1) {
          return Math.floor(interval) + " days";
        }
        interval = seconds / 3600;
        if (interval > 1) {
          return Math.floor(interval) + " hours";
        }
        interval = seconds / 60;
        if (interval > 1) {
          return Math.floor(interval) + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    };

    // Identify the article is in my favs:
    useEffect(() => {
        const news = localStorage.getItem("liked-news")
        // console.log(`article.story_title: ${article.story_title}, article.story_url: ${article.story_url}, article.objectID: ${article.objectID}`);
        if(news !== null){
            const articleSearch = JSON.parse(news).filter(story => story.objectID === article.objectID);

            if(articleSearch !== undefined && articleSearch.length === 1) {
                setLiked(true);
            }        
        }
    }, [article.objectID]);
    
    // Event when item is added or removed from my faves: 
    const handleLiked = () => {
        let news = localStorage.getItem("liked-news");
        if(!liked){
            if(!news){
                let newsArray = [];
                newsArray.push(article);
                localStorage.setItem("liked-news", JSON.stringify(newsArray));
            }
            else{
                let temp = JSON.parse(news).filter(story => story.objectID !== article.objectID);
                temp.push(article);
                localStorage.setItem("liked-news",JSON.stringify(temp));
            }
        }
        else{
            let temp = JSON.parse(news).filter(story => story.objectID !== article.objectID);
            localStorage.setItem("liked-news",JSON.stringify(temp));
        }

        setLiked(!liked);
    };

    if(!article.story_title || !article.story_url) return null;
    return (
        <div className="article-data">
            <a href={article.story_url} target="_blank" rel="noreferrer" >
                <div className='article-information'>
                    <span className="article-date-author">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                            <path fill="#606060" d="M8 1.333c3.676 0 6.667 2.991 6.667 6.667 0 3.676-2.991 6.667-6.667 6.667-3.676 0-6.667-2.991-6.667-6.667 0-3.676 2.991-6.667 6.667-6.667zM8 0C3.582 0 0 3.582 0 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm.667 8V4H7.333v5.333H12V8H8.667z"/>
                        </svg>
                        {timeSince(new Date(article.created_at))} ago by {article.author}
                    </span>
                    <span className="article-title">
                        {article.story_title}
                    </span>
                </div>
            </a>
            <div className='fave'>
            {!liked ? 
            <svg onClick={e => handleLiked(article.objectID)} xmlns="http://www.w3.org/2000/svg" width="24" height="22" viewBox="0 0 24 22">
                <path fill="#DD0031" d="M12 8.229C12.234 7.109 13.547 2 17.382 2 19.602 2 22 3.551 22 7.003c0 3.907-3.627 8.47-10 12.629C5.627 15.473 2 10.91 2 7.003c0-3.484 2.369-5.005 4.577-5.005 3.923 0 5.145 5.126 5.423 6.231zM0 7.003C0 11.071 3.06 16.484 12 22c8.94-5.516 12-10.929 12-14.997 0-7.962-9.648-9.028-12-3.737C9.662-1.996 0-1.004 0 7.003z"/>
            </svg> :
            <svg onClick={e => handleLiked(article.objectID)} xmlns="http://www.w3.org/2000/svg" width="24" height="22" viewBox="0 0 24 22">
                <path fill="#DD0031" d="M12 3.248C8.852-2.154 0-.577 0 6.192 0 10.853 5.571 15.619 12 22c6.43-6.381 12-11.147 12-15.808C24-.6 15.125-2.114 12 3.248z"/>
            </svg>}
            </div>
        </div>
    );
};

export default NewsCard; 
