import React from "react";
import styled from "styled-components";

const ErrorContainer = styled.div`
background-color: #d47a7a;
padding: 5px;
color: #611616;
border-radius: 5px;
border: 1px #611616 solid;
`;

const Error = (props) => {
    return(
        <ErrorContainer>
            <p>Sorry, unable to locate city. Please try again.</p>
        </ErrorContainer>
    );
};

export default Error;