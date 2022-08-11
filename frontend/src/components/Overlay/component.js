import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import LoopIcon from "@material-ui/icons/Loop";
import Spinner from "./Spinner";

const OverlayContainer = styled.div`
  visibility: ${(props) => (props.isShown ? "visible" : "hidden")};
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1300;
  background-color: rgba(0, 0, 0, 0.65);
  color: #fff;
  transition: visibility 0.4s;
`;

OverlayContainer.propTypes = {
  isShown: PropTypes.bool.isRequired,
};

const Overlay = ({ isShown }) => {
  return (
    <OverlayContainer
      aria-modal="true"
      aria-label="Loading..."
      isShown={isShown}
    >
      <Spinner />
    </OverlayContainer>
  );
};

Overlay.propTypes = {
  isShown: PropTypes.bool.isRequired,
};

export default Overlay;
