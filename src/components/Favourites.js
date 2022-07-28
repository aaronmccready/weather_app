import React from "react";
import styled from "styled-components";

const FavouritesDiv = styled.div`
	display: flex;
	justify-self: center;
	justify-content: center;
	align-items: center;
	width: 90%;
	min-width: 175px;
	height: 90%;
	background-color: ${(props) => props.theme.colours.displayBackgroundColour};
	color: ${(props) => props.theme.colours.textColour};
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.26);
	border-radius: 10px;
	padding: 2%;
	transition: 0.3s;
	&:hover {
		cursor: pointer;

		box-shadow: 0 0 5px rgba(0, 0, 0, 5);
	}
`;
const FavouritesInnerDiv = styled.div`
	width: 100%;
	padding: 0 5% 0 5%;
	display: flex;
`;

const Heading = styled.h3`
	width: 100%;
`;

const Favourites = (props) => {
    return (
        <FavouritesDiv onClick={() => props.displayFavourites()}>
            <FavouritesInnerDiv>
                <Heading>
                    {props.element.city}, {props.element.country}
                </Heading>
                <i className="fa fa-close" onClick={() => props.deleteFromFavourites(props.index)}></i>
            </FavouritesInnerDiv>
        </FavouritesDiv>
    );
};

export default Favourites;