import axios from "axios";
import React, { useState } from "react";
import WeatherApp from "./Componets/WeatherApp";
import Header from "./Componets/Header";
import Cities from "./Componets/Cities";
import './App.css'


function App() {
  const [citySearch, setCitySearch] = useState("");
  const [cityData, setCityData] = useState(null);
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await 
      
       axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=%09${import.meta.env.VITE_API_KEY}&q=${citySearch}&q`);
      if (response.data && response.data.length > 0) {
        setCityData(response.data[0]);
        console.log(response.data)
        setError(null);
      } else {
        setError("City not found");
        setCityData(null);
      }
    } catch (error) {
      console.error("Error fetching city data:", error);
      setError("An error occurred. Please try again later.");
      setCityData(null);
    }
  };

  return (
    <div className="container">
      <Header />
      <div className="row">
        <div className="search_header">
          <h3>
            Welcome to <span>TypeWeather</span>
          </h3>
          <p>Choose a location to see the weather forecast</p>
        </div>
        <form className="searchManifier" onSubmit={onSubmit}>
          <input
            placeholder="Enter city name"
            className="search"
            value={citySearch}
            onChange={(e) => setCitySearch(e.target.value)}
          />
        </form>
        {error && <p className="error">{error}</p>}
        {cityData && <WeatherApp cityData={cityData} />}
        <Cities />
      </div>
    </div>
  );
}

export default App;
