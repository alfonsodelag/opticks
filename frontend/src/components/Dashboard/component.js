import React, { useState } from "react";
import ErrorPage from "@/pages/Error";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MaterialReactTable from "material-react-table";
import axios from "axios";

const ErrorContainer = styled.div`
  display: flex;
  flex-grow: 1;
`;

const Dashboard = (props) => {
  const [isFavoriteBtnActive, setIsFavoriteBtnActive] = useState(false);

  const favoriteList = useSelector((state) => state.favoriteList);

  const { addFavorite } = props;

  const favoriteHandler = async (row) => {
    setIsFavoriteBtnActive(!isFavoriteBtnActive);
    await axios.post(
      "https://opticksbackend.herokuapp.com/api/favorite-activities",
      {
        activity: row.original,
      }
    );
    addFavorite({
      ...row.original,
    });
  };

  return props.fatalError.active ? (
    <ErrorContainer>
      <ErrorPage {...props.fatalError} />
    </ErrorContainer>
  ) : (
    <MaterialReactTable
      {...props}
      enableColumnFilterChangeMode
      enableColumnOrdering
      enableColumnResizing
      enableRowNumbers
      enablePinning
      enableRowActions
      enableColumnActions
      enableRowSelection
      pageCount={10}
      renderRowActions={({ row }) => {
        const isFavorited = Boolean(favoriteList[row.original.id]);
        return (
          <Button disableElevation>
            <FavoriteBorderIcon onClick={() => favoriteHandler(row)} />
          </Button>
        );
      }}
    />
  );
};

Dashboard.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string,
  actions: PropTypes.array,
  columns: PropTypes.array,
  options: PropTypes.object,
  fatalError: PropTypes.shape({
    active: PropTypes.bool.isRequired,
    title: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
};

export default Dashboard;
