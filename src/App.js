import { useEffect, useState } from "react";
import axios from "axios"
import SearchResultsPage from "./search/searchResult";

const App = () => {
  const [auctionItems, setAuctionItems] = useState([]);
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    startingPrice: 0,
    auctionEndDate: new Date(),
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/auction/items'); // Replace with your backend URL
      setAuctionItems(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCreateItem = async () => {
    try {
      await axios.post('http://localhost:3001/api/auction/items', newItem);
      fetchData();
      setNewItem({
        title: '',
        description: '',
        startingPrice: 0,
        auctionEndDate: new Date(),
      });
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  return (
    <div>
      <h1>Auction Platform</h1>
      <div>{<SearchResultsPage/>}</div>
      {/* Display Auction Items */}
      <h2>Auction Items</h2>
      <ul>
        {auctionItems.map((item) => (
          <li key={item._id}>
            {item.title} - Current Bid: ${item.currentBid}
          </li>
        ))}
      </ul>
      
      {/* Create New Auction Item */}
      <h2>Create New Item</h2>
      <input
        type="text"
        placeholder="Title"
        value={newItem.title}
        onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newItem.description}
        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
      />
      <input
        type="number"
        placeholder="Starting Price"
        value={newItem.startingPrice}
        onChange={(e) => setNewItem({ ...newItem, startingPrice: e.target.value })}
      />
      <input
        type="date"
        placeholder="Auction End Date"
        value={newItem.auctionEndDate}
        onChange={(e) => setNewItem({ ...newItem, auctionEndDate: e.target.value })}
      />
      <button onClick={handleCreateItem}>Create Item</button>
    </div>
  );
};

export default App;