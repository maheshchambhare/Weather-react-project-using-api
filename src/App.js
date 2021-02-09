import React, { useState } from "react";
import Cityform from "./components/Cityform";
import axios from "axios";
import "./app.css";

function App() {
  const [temp, setTemp] = useState();
  const [err, setErr] = useState();
  const [desc, setDesc] = useState();
  const [ws, setWs] = useState();
  const [humidity, setHumidity] = useState();
  const [image, setImage] = useState();

  const getUser = (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;

    axios
      .get(
        `https://api.unsplash.com/search/photos?page=1&query=${city}&client_id=PUT_YOUR_API_KEY_HERE` //Unsplash Api key For Images of city
      )
      .then((res) => {
        // const image = res.data.results[0].links.download;
        // console.log(image);
        setImage(res.data.results[0].links.download);
      })
      .catch((err) => {
        setErr("There is no image for this city");
      });

    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=PUT_YOUR_API_KEY_HERE` //weather Api key For Images of city
      )
      .then((res) => {
        setTemp(res.data.main.temp);
        setHumidity(res.data.main.humidity);
        setWs(res.data.wind.speed);
        setDesc(res.data.weather[0].description);
      })
      .catch((err) => {
        setErr("Weather not available for this city");
      });
  };
  return (
    <div className="App">
      <Cityform getUser={getUser} />
      {temp ? (
        <>
          <img className="image" src={image} alt="city" />
          <div className="weather">
            <h1>Temperature : {temp} c</h1>
            <h1>{desc}</h1>
            <h1>Humidity : {humidity}%</h1>
            <h1>Wind Speed : {ws}km/hr</h1>
          </div>
        </>
      ) : (
        <>
          <h1 className="err">{err}</h1>
          <img
            className="back"
            src="https://i.pinimg.com/originals/cf/41/3e/cf413e4a7bd6b503ce7828fb6f7b7338.jpg"
            alt="background image"
          />
        </>
      )}
    </div>
  );
}

export default App;
