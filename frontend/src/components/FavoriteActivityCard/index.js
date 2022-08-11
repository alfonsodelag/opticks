import React from "react";
import { useDispatch, useSelector } from "react-redux";
import favoriteListSlice from "@/redux/slices/favoriteList";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Paper, Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";

const CardContainer = styled.div`
  padding: 10px;
  margin: 10px;
`;

const CardTitleContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const CardTitle = styled.p`
  font-size: 1.3rem;
  font-weight: 500;
  color: #111;
  margin-bottom: 20px;
`;

const DetailsTable = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-gap: 10px 20px;
`;

const StrongDetail = styled.strong`
  font-weight: 500;
  color: #000;
`;

const SpacedButton = styled(Button)`
  && {
    margin-top: 25px;
  }
`;

const FavoriteActivityCard = (props) => {
  const { activity, type, price, participants, accessibility } = props.activity;

  const activityId = props.activity._id;

  const dispatch = useDispatch();
  const favoriteList = useSelector((state) => state.favoriteList);

  const removeFromFavorites = (payload) =>
    dispatch(favoriteListSlice.actions.remove(payload));

  const handleDiscardFromFavorites = async (id) => {
    await axios.delete(`http://localhost:8000/remove?_id=${id}`);
    removeFromFavorites(props.activity);
  };

  return (
    <Paper elevation={3}>
      <CardContainer>
        <CardTitleContainer>
          <CardTitle>{activity}</CardTitle>
          <FavoriteIcon />
        </CardTitleContainer>
        <DetailsTable>
          <div>
            Type:{" "}
            <StrongDetail style={{ textTransform: "capitalize" }}>
              {type}
            </StrongDetail>
            <br />
            Price: <StrongDetail>${price}</StrongDetail>
          </div>
          <div>
            Participants: <StrongDetail>{participants}</StrongDetail>
            <br />
            Accessibility: <StrongDetail>{accessibility}</StrongDetail>
          </div>
        </DetailsTable>
        <SpacedButton
          variant="contained"
          sx={{ bgcolor: "#00447F" }}
          onClick={() => handleDiscardFromFavorites(activityId)}
        >
          Remove
        </SpacedButton>
      </CardContainer>
    </Paper>
  );
};

FavoriteActivityCard.propTypes = {
  activity: PropTypes.shape({
    activity: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    participants: PropTypes.number.isRequired,
    accessibility: PropTypes.number.isRequired,
  }),
  onDiscardFromFavorites: PropTypes.func.isRequired,
};

export default FavoriteActivityCard;
