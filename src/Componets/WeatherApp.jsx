import axios from "axios";
import React, { useState, useEffect } from "react";

import Clear from "./img/Clear.png";
import ClearNight from "./img/ClearNight.png";

import Cloudy from "./img/Cloudy.png";
import CloudyNight from "./img/CloudyNight.png";

import PartlySunny from "./img/PartlySunny.png";
import PartlySunnyNight from "./img/PartlySunnyNight.png";

import Rain from "./img/Rain.png";
import RainNight from "./img/RainNight.png";

import Thunderstorm from "./img/Thunderstorm.png";
import ThunderstormNight from "./img/ThunderstormNight.png";

function WeatherApp({ cityData }) {
 
  const [data, setData] = useState("");
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${cityData.Key}?apikey=${import.meta.env.VITE_API_KEY}`);
        setData(response.data[0]);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    };
    fetchWeather();
  }, [cityData]);

  const renderWeatherIcon = () => {
    if (!data) return null;

    const { IsDayTime, WeatherIcon } = data;

    // Gündüz ve gece için uygun görseli seç
    const dayOrNight = IsDayTime ? "Day" : "Night";

    // Çektiğim hava durumu raporunda WeatherIcon sayılarla ifade edilmiş ve 44 farklı hava durumu mevcut switch case ile uygun en çok kullanılan görseli belirtilerek  seçildi 
    switch (WeatherIcon) {
      case 1:
   
        return IsDayTime ?
          <div>
            <img className="images" src={Clear} alt="Clear" />
           
          </div>
          :
          <div>
            <img className="images" src={ClearNight} alt="ClearNight" />;

          </div>
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 38:
        return IsDayTime ? <img className="images" src={Cloudy} alt="Cloudy" /> : <img className="images" src={CloudyNight} alt="CloudyNight" />;
        case 2:
        case 3:
        return IsDayTime ? <img className="images" src={PartlySunny} alt="PartlySunny" /> : <img className="images" src={PartlySunnyNight} alt="PartlySunnyNight" />;
      case 12:
        return IsDayTime ? <img className="images" src={Rain} alt="Rain" /> : <img className="images" src={RainNight} alt="RainNight" />;
      case 15:
        return IsDayTime ? <img className="images" src={Thunderstorm} alt="Thunderstorm" /> : <img className="images" src={ThunderstormNight} alt="ThunderstormNight" />;
      default:
        return null; // İkon tanımlı değilse null döndür
    }
  };

  return (
    <>
    {data.IsDayTime === true && (
    <div className="scardDay">
    <h2>{cityData.EnglishName}</h2>
    <div className="row1">
      <div className="col-left">{data ? Math.ceil(data.Temperature.Metric.Value) : null}°C</div>
      <div className="col-right">{renderWeatherIcon()}</div>
    </div>
  </div>
    )}
    {data.IsDayTime === false && (
          <div className="scardNigth">
          <h2>{cityData.EnglishName}</h2>
          <div className="row1">
            <div className="col-left">{data ? Math.ceil(data.Temperature.Metric.Value) : null}°C</div>
            <div className="col-right">{renderWeatherIcon()}</div>
          </div>
        </div>
    )}

</>
  
  );
}

export default WeatherApp;

