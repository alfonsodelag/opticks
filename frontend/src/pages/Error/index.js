import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const CenteredPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 5em;
`;

const Message = styled.h4`
  font-size: 1.5rem;
  font-weight: 100;
`;

const ErrorPage = ({ title, message }) => {
  return (
    <CenteredPage>
      <Title>{title}</Title>
      <Message>{message}</Message>
    </CenteredPage>
  );
};

ErrorPage.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default ErrorPage;
