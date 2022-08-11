import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//
import Overlay from './component';

const OverlayContainer = ({ isShown }) => {
    return (
        <Overlay
            isShown={isShown}
        />
    );
};

OverlayContainer.propTypes = {
    isShown: PropTypes.bool.isRequired,
};

const MapStateToProps = (state) => ({
    isShown: state.overlay,
});

export default connect(MapStateToProps)(OverlayContainer);