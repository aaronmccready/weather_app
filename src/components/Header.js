import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import Error from "./Error";
import styled from "styled-components";

const HeaderContainer = styled.div`
color: #fff;
background-color: ${(props) => props.theme.colours.headerBackgroundColour};

height: 15vh;
max-height: 155px;
min-height: 110px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

const ToggleThemeButton = styled.button`
	width: 10vw;
	max-width: 60px;
	min-width: 45px;
	height: 3vh;
	position: absolute;
	right: 5%;
	top: 3.5%;
	border: none;
	color: ${(props) => props.theme.colours.buttonTextColour};
	background-color: ${(props) => props.theme.colours.toggleButtonBackground};
	outline: none;
	border-radius: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const WeatherAppHeading = styled.h1`
	font-size: 1.5em;
	text-shadow: 3px 3px 5px rgba(0, 0, 0, 0.26);
	margin: 5px;
`;

const UserSearchForm = styled.form`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 10px;
`;

const UserSearchInput = styled.input.attrs({
	type: "text",
	placeholder: "City, Country",
	id: "userSearch",
})`
	width: 100%;
	max-width: 350px;
	height: 35px;
	padding: 12px 20px 12px 12px;
	box-shadow: inset 0px 0px 10px
		${(props) => props.theme.colours.buttonBackground};
	background: transparent;
	outline: none;
	border: none;
	color: white;
	&::placeholder {
		color: #fff;
	}
`;

const SearchButton = styled.button`
	background-color: ${(props) => props.theme.colours.buttonBackground};
	border: none;
	outline: none;
	width: 30px;
	height: 35px;
	padding: 5px;
	color: #fff;
	border-radius: 4px 0 0 4px;
`;

const CurrentLocationButton = styled.button`
	background-color: ${(props) => props.theme.colours.buttonBackground};
	border: none;
	outline: none;
	width: 30px;
	height: 35px;
	padding: 5px;
	color: #fff;
	border-radius: 0 4px 4px 0;
`;

const Header = (props) => {
    return (
        <HeaderContainer>
            <WeatherAppHeading>Weather App</WeatherAppHeading>{" "}
            <ToggleThemeButton onClick={props.toggleMode}>
                {props.themeMode === "Light" ? "Dark" : "Light"}
            </ToggleThemeButton>
            <UserSearchForm>
                <SearchButton onClick={(e) => props.submit(e)}>
                    <FontAwesomeIcon icon={faSearch}/>
                </SearchButton>
                <UserSearchInput onChange={(e) => props.handleChange(e)}>
                </UserSearchInput>
                <CurrentLocationButton onClick={(e) => props.getCurrentLocation(e)}>
                    <FontAwesomeIcon icon={faCrosshairs}/>
                </CurrentLocationButton>
            </UserSearchForm>
            {props.error ? <Error></Error> : <div></div>}
        </HeaderContainer>
    );
};

export default Header;