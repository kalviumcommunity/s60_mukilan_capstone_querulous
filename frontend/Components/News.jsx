import  { useEffect, useState } from 'react';
import axios from 'axios';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
          params: {
            country: 'in',
            apiKey: 'bbb27a13cc3d414eafe689f09ef72803',
          },
        });

        setArticles(response.data.articles);
        setFilteredArticles(response.data.articles); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const searchResults = articles.filter(article =>
      (article.title && article.title.toLowerCase().includes(event.target.value.toLowerCase())) ||
      (article.description && article.description.toLowerCase().includes(event.target.value.toLowerCase()))
    );
    setFilteredArticles(searchResults);
  };

  if (loading) return <p className='text-black'>Loading...</p>;
  if (error) return <p className='text-red-700'>Error: {error}</p>;

  return (
    <div className="p-4 h-full flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Search Latest News</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search for news..."
        className="p-2 border rounded mb-4 w-[50%] ml-[26%] rounded-md text-black"
      />
      <div className=" border border-4 w-3/4 ml-[10%] border-blue-100">
        <ul className="space-y-4">
          {filteredArticles.map((article) => (
            <li key={article.url} className="p-4 border rounded shadow">
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-blue-800 hover:underline">
                {article.title}
              </a>
             
              {article.urlToImage &&<div className='flex justify-center '> <img src={article.urlToImage} alt={article.title} className="mt-2 size-96  object-cover" /></div>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default News;
