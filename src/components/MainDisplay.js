import React, { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";
import ToggleTempUnits from "./toggleTempUnits";
import { ThemeProvider } from "styled-components";
import lightTheme from "../themes/light";
import darkTheme from "../themes/dark";

const MainDisplayContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 5% 2% 5% 2%;
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: ${(props) => props.theme.colours.displayBackgroundColour};
	color: ${(props) => props.theme.colours.textColour};
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.26);
	border-radius: 10px;
	width: 40%;
	height: 60vh;
	max-height: 540px;
	min-width: 305px;
	max-width: 450px;
	
	@media only screen and (max-height: 867px) {
		font-size: 0.8em;
	}
`;

const Details = styled.div`
	margin: 0 5% 5% 5%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	@media only screen and (max-height: 675px) {
		margin: 0 2% 2% 2%;
	}
`;

const TempAndWeatherDescription = styled.div`
	margin: 20px;
	@media only screen and (max-height: 767px) {
		margin: 5px;
	}
`;

const ToggleUnitsContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	@media only screen and (max-height: 675px) {
		height: 25px;
	}
`;

const Main = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 2%;
	@media only screen and (max-height: 767px) {
		padding: 2%;
	}
`;

const DetailContent = styled.p`
	display: flex;
	justify-content: flex-start;
	margin: 7px;

	& > strong {
		margin-left: 5px;
	}
	@media only screen and (max-height: 675px) {
		margin: 3px;
	}
`;

const AddFavouritesContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	margin-bottom: 5%;
	@media only screen and (max-height: 675px) {
		margin-bottom: 2%;
	}
`;

const AddFavouritesButton = styled.button`
	width: 10em;
	border: 1px ${(props) => props.theme.colours.textColour} solid;
	color: ${(props) => props.theme.colours.textColour};
	background-color: ${(props) => props.theme.colours.displayBackgroundColour};
	height: 2.5em;
	padding: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: 0.3s;

	&:hover {
		cursor: pointer;
		color: white;
		background-color: ${(props) => props.theme.colours.buttonBackground};
		border: 1px ${(props) => props.theme.colours.buttonBackground} solid;
	}
	@media only screen and (max-height: 675px) {
		height: 1.5em;
	}
`;

const LoadingIndicator = (props) => {
	return (
		<ThreeDots 
		color={props.theme === "Light" ? "#6291d3" : "#252a35"}
		height="100"
		width="100"
		/>
	);
};

const MainDisplay = (props) => {
    const [unit, setUnit] = useState("C");

    const toggleDegrees = () => {
        setUnit((prevState) => {
            if(prevState === "C") return "F";
            else return "C"
        });
    };

    const kelvinToUnit = (kelvinTemp) => {
        let celsius = kelvinTemp - 273.15;
        let fahrenheit = (celsius * 9) / 5 + 32;
        return Math.round(
            Math.round((unit === "C" ? celsius : fahrenheit) * 100) / 100
        );
    };

    const windSpeed = (speed) => {
		return Math.round(speed * 2.23694 * 10) / 10;
	};
	const windDirection = (wind) => {
		let val = Math.floor(wind / 22.5 + 0.5);
		let arr = [
			"N",
			"NNE",
			"NE",
			"ENE",
			"E",
			"ESE",
			"SE",
			"SSE",
			"S",
			"SSW",
			"SW",
			"WSW",
			"W",
			"WNW",
			"NW",
			"NNW",
		];
		return arr[val % 16];
	};

    return (
		<ThemeProvider theme={props.themeMode === "Light" ? lightTheme : darkTheme}>
			<MainDisplayContainer>
				{props.isLoading ? (
					<Content>
						<LoadingIndicator theme={props.themeMode} />
					</Content>
				) : (
					<Content>
						<ToggleUnitsContainer>
							<ToggleTempUnits toggle={toggleDegrees}></ToggleTempUnits>
						</ToggleUnitsContainer>

						<Main>
							<h1 className="mainContent" id="location">
								{props.weatherData.city}, {props.weatherData.country}
							</h1>

							<img
								className="mainContent"
								id="weatherIcon"
								src={`https://openweathermap.org/img/wn/${props.weatherData.icon}@2x.png`}
								alt={props.weatherData.description + " Icon"}
							/>
							<TempAndWeatherDescription>
								<strong>
									{
										<>
											{kelvinToUnit(props.weatherData.temp)}&deg;{unit}{" "}
										</>
									}
								</strong>
							</TempAndWeatherDescription>
							<TempAndWeatherDescription>
								<strong>{props.weatherData.description}</strong>
							</TempAndWeatherDescription>
						</Main>
						<Details>
							<DetailContent id="feelsLike">
								Feels Like:{" "}
								<strong>
									{
										<>
											{kelvinToUnit(props.weatherData.temp)}&deg;{unit}
										</>
									}
								</strong>
							</DetailContent>
							<DetailContent id="humidity">
								Humidity: <strong>{props.weatherData.humidity}%</strong>
							</DetailContent>
							<DetailContent id="windDirection">
								Wind Direction:{" "}
								<strong>
									{<>{windDirection(props.weatherData.windDirection)}</>}
								</strong>
							</DetailContent>
							<DetailContent id="windSpeed">
								Wind Speed:{" "}
								<strong>
									{<>{windSpeed(props.weatherData.windSpeed)} MPH</>}
								</strong>
							</DetailContent>
						</Details>
						<AddFavouritesContainer>
							<AddFavouritesButton
								onClick={() => props.addToFavourites(props.weatherData)}
							>
								+ Add To Favourites
							</AddFavouritesButton>
						</AddFavouritesContainer>
					</Content>
				)}
			</MainDisplayContainer>
		</ThemeProvider>
	);
};

export default MainDisplay;
