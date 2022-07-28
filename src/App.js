import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import MainDisplay from "./components/MainDisplay";
import Favourites from "./components/Favourites";
import uniqid from "uniqid";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import lightTheme from "./themes/light";
import darkTheme from "./themes/dark";
import './App.css';

const GlobalStyle = createGlobalStyle`
* {

  margin: 0;
  padding: 0;
  box-sizing: border-box;
  transition: 0.2s;

}

body {

  height: 100vh;
  background-color: ${(props) => props.theme.colours.background};

}

button {

  &:hover {
    cursor: pointer;
  }

}

`;

const FavouritesContainer = styled.div`

  display: grid;
  background: ${(props) => props.theme.colours.background};
  flex-wrap: wrap;
  grid-template-columns: repeat(4, 24vw);
  grid-template-rows: repeat(5, 9vh);
  column-gap: 1%;
  row-gap: 3%;
  justify-self: center;
  margin-bottom: 5%;
  height: 60vh;
  @media only screen and (max-width: 650px) {
    grid-template-columns: repeat(3, 32.5vw);
  }
  @media only screen and (max-width: 510px) {
    grid-template-columns: repeat(2, 48vw);
  }
  @media only screen and (max-width: 350px) {
    grid-template-columns: repeat(1, 98vw);
  }

`;

const App = () => {

  const [ userInput, setUserInput] = useState("Toronto, CA");
  const [loading, setLoading] = useState(false);
  const [favourites, setFavourites] = useState(() => {
    if (!localStorage.getItem("favourites")) {
      return [];
    }
    else return JSON.parse(localStorage.getItem("favourites"));
  });
  const [themeMode, setThemeMode] = useState(() => {
    if (!localStorage.getItem("themeMode")) {
      return "Light";
    }
    else return localStorage.getItem("themeMode");
  });
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [weatherData, setWeatherData] = useState({
    icon: "",
    city: "",
    country: "CA",
    temp: "",
    description: "",
    feelsLike: "",
    humidity: "",
    windDirection: "",
    windSpeed: ""
  });

  useEffect(() => {
    getWeatherData();
  }, [userInput]);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  const getWeatherData = async () => {
    
    try {

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&APPID=b388badf2ea8d6a1b0fc28f7d99e0ccc`,
				{ mode: "cors" }
      );

      const weatherData = await response.json();

      setWeatherData({
        city: weatherData.name,
				icon: weatherData.weather[0].icon,
				country: weatherData.sys.country,
				temp: weatherData.main.temp,
				description: weatherData.weather[0].description,
				feelsLike: weatherData.main.feels_like,
				humidity: weatherData.main.humidity,
				windDirection: weatherData.wind.deg,
				windSpeed: weatherData.wind.speed,
      });

      setError(false);

    }

    catch (error) {

      setError(true);
      setErrorMessage(error.toString());

    }

  };

  const getCityWeatherByCoordinates = async (lat, long) => {

    try {
			const response = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=b388badf2ea8d6a1b0fc28f7d99e0ccc`,
				{ mode: "cors" }
			);
			const currentCityWeatherdata = await response.json();
			setWeatherData({
				city: currentCityWeatherdata.name,
				icon: currentCityWeatherdata.weather[0].icon,
				country: currentCityWeatherdata.sys.country,
				temp: currentCityWeatherdata.main.temp,
				description: currentCityWeatherdata.weather[0].description,
				feelsLike: currentCityWeatherdata.main.feels_like,
				humidity: currentCityWeatherdata.main.humidity,
				windDirection: currentCityWeatherdata.wind.deg,
				windSpeed: currentCityWeatherdata.wind.speed,
			});
			setLoading(false);
		} catch (error) {
			setError(true);
			setErrorMessage(error.toString());
		}

  };

  const getCoordinates = (e) => {

    setLoading(true);
		e.preventDefault();
		const success = (location) => {
			const lat = location.coords.latitude;
			const long = location.coords.longitude;
			setError(false);
			getCityWeatherByCoordinates(lat, long);
		};
		const error = (error) => {
			setError(true);
			setErrorMessage(error.message);
		};
		try {
			navigator.geolocation.getCurrentPosition(success, error);
		} catch (error) {
			setError(true);
			setErrorMessage(error.toString());
		}

  };

  const addToFavourites = (newItem) => {

    let copyFavouritesList = JSON.parse(JSON.stringify(favourites));

    if (
      copyFavouritesList.find(
        (e) => e.city === newItem.city && e.country === newItem.country
      )
    )

    return;

    else setFavourites([...copyFavouritesList,newItem]);

  };

  const deleteFromFavourites = (index) => {

    let copyFavouritesList = JSON.parse(JSON.stringify(favourites));
    copyFavouritesList.splice(index, 1);
    console.log(index);
    setFavourites(copyFavouritesList);

  };

  const displayFavourites = (element) => {
    setUserInput(`${element.city},${element.country}`);
  };

  const handleSubmit = (e) => {
    const userInputFormValue = document.getElementById("userSearch").value;
    e.preventDefault();
    if (
      userInputFormValue === undefined || userInputFormValue === "" || userInputFormValue === null
    )
    return;
    else setUserInput(userInputFormValue);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setError(false);
  };

  const toggleLightAndDarkMode = () => {
    setThemeMode((prevState) => {
      if (prevState === "Light") return "Dark";
      else return "Light";
    });
  };

  const renderFavourites = () => {
    return favourites.map((element,index) => (
      <Favourites
      key={uniqid()}
      element={element}
      index={index}
      displayFavourites={() => displayFavourites(element)}
      deleteFromFavourites={() => deleteFromFavourites(index)}
    />
    ));
  };

  return (
    <ThemeProvider theme={themeMode === "Light" ? lightTheme : darkTheme}>
      <GlobalStyle></GlobalStyle>
      <div id="appContainer">
        <Header
					submit={handleSubmit}
					handleChange={handleChange}
					toggleMode={toggleLightAndDarkMode}
					getCurrentLocation={getCoordinates}
					themeMode={themeMode}
					error={error}
					errorMessage={errorMessage}
				/>

        <MainDisplay
          isLoading={loading}
          addToFavourites={addToFavourites}
          weatherData={weatherData}
          themeMode={themeMode}
        />

        <FavouritesContainer themeMode={themeMode}>
          {renderFavourites()}
        </FavouritesContainer>
      </div>
    </ThemeProvider>
  );

};

export default App;
