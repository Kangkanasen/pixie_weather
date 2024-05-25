import React, { useState, useEffect } from "react";
import axios from "axios";
import { ReactComponent as SearchIcon } from "./search-icon.svg"; 
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const OPENCAGE_API_KEY = "acd7a4ce64374f49b0da1105e8c0a1a6";

  useEffect(() => {
    if (city.trim() === "") {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
            city
          )}&key=${OPENCAGE_API_KEY}&limit=3`
        );

        const filteredSuggestions = response.data.results.map((result) => ({
          name: result.components.city || result.components.town || result.components.village,
          country: result.components.country,
        }));

        setSuggestions(filteredSuggestions);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300); 
    return () => clearTimeout(timeoutId);
  }, [city]);

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(city);
  };

  const handleSuggestionClick = (cityName) => {
    setCity(cityName);
    setSuggestions([]);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={handleChange}
        list="city-suggestions"
      />
      {loading}
      <datalist id="city-suggestions">
        {suggestions.map((item, index) => (
          <option
            key={index}
            value={`${item.name}, ${item.country}`}
            onClick={() => handleSuggestionClick(item.name)}
          />
        ))}
      </datalist>
      <button type="submit" className="search-button">
        <SearchIcon className="search-icon" />
      </button>
    </form>
  );
};

export default SearchBar;
