import { useState, useEffect } from 'react';
import axios from 'axios';

const SearchResultsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    fetchData(); // Fetch initial data
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/search'); // Replace with your API endpoint
      setSearchResults(response.data);
      setFilteredResults(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = () => {
    const filtered = searchResults.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredResults(filtered);
  };

  return (
    <div>
      <h1>Search Results Page</h1>
      <input
        type="text"
        placeholder="Search by title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {filteredResults.map((item) => (
          <li key={item.id}>
            {item.title} - {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResultsPage;
