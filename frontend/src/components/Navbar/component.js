import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { AppBar, Toolbar, IconButton, Tooltip, Drawer } from "@mui/material";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import Logo from "@/components/Logo";
import FavoriteActivityCard from "@/components/FavoriteActivityCard";
import CreateActivity from "@/components/CreateActivity";
import axios from "axios";

const LogoWrapper = styled.div`
  flex-grow: 1;
`;

const WhiteIconButton = styled(IconButton)`
  && {
    color: #fff;
  }
`;

const LargeIcon = styled.svg`
  && {
    font-size: 3rem;
  }
`;

const IconButtonContainer = styled.div`
  padding: 0 5px;
`;

const DrawerContentBox = styled.div`
  padding: 20px 5%;
`;

const FavoriteListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 1fr);
  grid-gap: 25px;
  @media (min-width: 500px) {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }
`;

const drawerStylesObject = {
  style: {
    width: "70%",
  },
};

const Navbar = ({
  isFavoriteSlidePanelOpen,
  onFavoriteSlidePanelOpen,
  onFavoriteSlidePanelClose,
  isCreateActivitySlideOpen,
  onCreateActivitySlidePanelOpen,
  onCreateActivitySlidePanelClose,
  onDiscardFromFavorites,
}) => {
  const [favoriteActivities, setFavoriteActivities] = useState([]);

  const favoriteList = useSelector((state) => state.favoriteList);

  const getFavoritedActivities = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/createdfavoritelist"
      );
      setFavoriteActivities(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFavoritedActivities();
  }, [favoriteActivities]);

  const favoriteActivitiesList = favoriteActivities.map((activity) => (
    <FavoriteActivityCard
      key={activity._id}
      activity={activity}
      favoriteList={favoriteList}
      onDiscardFromFavorites={onDiscardFromFavorites}
    />
  ));

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "#00447F" }}>
        <Toolbar>
          <LogoWrapper>
            <Link to="/">
              <Logo />
            </Link>
          </LogoWrapper>
          <IconButtonContainer>
            <Tooltip title="Show favorites">
              <WhiteIconButton
                onClick={onFavoriteSlidePanelOpen}
                aria-label="Show favorites"
              >
                <LargeIcon as={ExpandMoreIcon} />
              </WhiteIconButton>
            </Tooltip>
          </IconButtonContainer>
          <IconButtonContainer>
            <Tooltip title="Add a new favorite">
              <WhiteIconButton
                onClick={onCreateActivitySlidePanelOpen}
                aria-label="Add a new favorite"
              >
                <LargeIcon as={AddIcon} />
              </WhiteIconButton>
            </Tooltip>
          </IconButtonContainer>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={isFavoriteSlidePanelOpen}
        onClose={onFavoriteSlidePanelClose}
        PaperProps={drawerStylesObject}
        SlideProps={drawerStylesObject}
      >
        <DrawerContentBox>
          <h1>Your favorite activities</h1>
          <br />
          <FavoriteListContainer>
            {favoriteActivitiesList}
          </FavoriteListContainer>
        </DrawerContentBox>
      </Drawer>
      <Drawer
        anchor="right"
        open={isCreateActivitySlideOpen}
        onClose={onCreateActivitySlidePanelClose}
        PaperProps={drawerStylesObject}
        SlideProps={drawerStylesObject}
      >
        <DrawerContentBox>
          <h1>Create an activity</h1>
          <br />
          <CreateActivity />
        </DrawerContentBox>
      </Drawer>
    </>
  );
};

Navbar.propTypes = {
  favoriteActivities: PropTypes.array.isRequired,
  onDiscardFromFavorites: PropTypes.func.isRequired,
  anchor: PropTypes.instanceOf(Element),
  isFavoriteSlidePanelOpen: PropTypes.bool.isRequired,
  onFavoriteSlidePanelOpen: PropTypes.func.isRequired,
  onFavoriteSlidePanelClose: PropTypes.func.isRequired,
};

export default Navbar;
