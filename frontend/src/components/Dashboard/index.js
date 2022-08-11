import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import overlaySlice from "@/redux/slices/overlay";
import favoriteListSlice from "@/redux/slices/favoriteList";
import Dashboard from "./component";
import { makeAPICall } from "@/utils";

const DashboardController = () => {
  const favoriteList = useSelector((state) => state.favoriteList);
  const dispatch = useDispatch();

  const showOverlay = () => dispatch(overlaySlice.actions.show());
  const hideOverlay = () => dispatch(overlaySlice.actions.hide());
  const addFavorite = (payload) =>
    dispatch(favoriteListSlice.actions.add(payload));

  const columns = [
    {
      id: "imageUrl",
      enableClickToCopy: false,
      header: "Image",
      Cell: ({ cell }) => (
        <img
          alt="avatar"
          height={100}
          width={100}
          src={cell.row.original.imageUrl + "?id=" + cell.row.id}
          style={{ borderRadius: "50%" }}
        />
      ),
    },
    {
      accessorKey: "activity",
      header: "Activity",
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "price",
      header: "Price",
    },
    {
      accessorKey: "participants",
      header: "Participants num",
    },
    {
      accessorKey: "accessibility",
      header: "Accessibility",
    },
  ];

  const [fatalError, setFatalError] = useState({
    active: false,
  });
  const [boredActivitiesList, setBoredActivitiesList] = useState([]);

  useEffect(() => {
    if (!boredActivitiesList.length) {
      showOverlay();
      makeAPICall(setFatalError, setBoredActivitiesList, hideOverlay);
    }
  }, [boredActivitiesList, showOverlay, hideOverlay]);

  return (
    <Dashboard
      columns={columns}
      favoriteList={favoriteList}
      addFavorite={addFavorite}
      data={boredActivitiesList}
      fatalError={fatalError}
    />
  );
};

export default DashboardController;
