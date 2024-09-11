import { useState,useEffect } from 'react';
import NewsItem from './NewsItem';

const NewsBoard = ({category}) => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const apiKey = 'c7b2a3bfd40840528a39a7991fbc3294';
        console.log('API Key:', apiKey); 

        try{
            if (apiKey) {
                const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
                fetch(url)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then((data) => setArticles(data.articles))
                    .catch((error) => console.error('Error fetching news:', error));
            } else {
                console.error("API key is missing");
            }
        }
        catch(err){
            console.log(err);
        }
    }, [category]);
  return (
    <div>
        <h2 className="text-center">Latest <span className="badge bg-danger">News</span></h2>
        {articles.map((news,index)=>{
            return <NewsItem key={index} title={news.title} description={news.description} src={news.urlToImage} url={news.url}/>
        })}
    </div>
  )
}

export default NewsBoard;