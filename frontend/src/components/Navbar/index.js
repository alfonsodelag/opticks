import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

//
import Navbar from "./component";
// import overlaySlice from "@/redux/slices/overlay";
import favoriteListSlice from "@/redux/slices/favoriteList";

const NavbarContainer = () => {
  const favoriteList = useSelector((state) => state?.favoriteList);
  const dispatch = useDispatch();
  const removeFromFavorites = (payload) =>
    dispatch(favoriteListSlice.actions.remove(payload));

  const [isFavoriteSlidePanelOpen, setIsFavoriteSlidePanelOpen] =
    useState(false);
  const [isCreateActivitySlideOpen, setIsCreateActivitySlideOpen] =
    useState(false);

  // Slide panels handler
  const handleFavoriteSlidePanelOpen = () => setIsFavoriteSlidePanelOpen(true);

  const handleFavoriteSlidePanelClose = () => {
    setIsFavoriteSlidePanelOpen(false);
  };
  const handleCreateActivitylidePanelOpen = () => {
    setIsCreateActivitySlideOpen(true);
  };

  const handleCreateActivitySlidePanelClose = () => {
    setIsCreateActivitySlideOpen(false);
  };

  return (
    <Navbar
      favoriteActivities={Object.values(favoriteList)}
      onDiscardFromFavorites={removeFromFavorites}
      isFavoriteSlidePanelOpen={isFavoriteSlidePanelOpen}
      onFavoriteSlidePanelOpen={handleFavoriteSlidePanelOpen}
      onFavoriteSlidePanelClose={handleFavoriteSlidePanelClose}
      isCreateActivitySlideOpen={isCreateActivitySlideOpen}
      onCreateActivitySlidePanelOpen={handleCreateActivitylidePanelOpen}
      onCreateActivitySlidePanelClose={handleCreateActivitySlidePanelClose}
    />
  );
};

export default NavbarContainer;
