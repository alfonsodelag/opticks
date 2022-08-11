import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MenuItem from "@material-ui/core/MenuItem";
import { useDispatch } from "react-redux";
import favoriteListSlice from "@/redux/slices/favoriteList";
import { Button, Input, InputLabel, Select } from "@mui/material";
import { DropzoneArea } from "material-ui-dropzone";
import axios from "axios";

const CreateActivityContainer = styled.div`
  display: flex;
  width: 55%;
  gap: 25px;
  flex-direction: column;
`;

const LabelAndInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 1.3rem;
  font-weight: 500;
  color: #111;
  margin-bottom: 5px;
`;

const DropDownLabel = styled(InputLabel)`
  && {
    font-size: 1.3rem;
    font-weight: 500;
    color: #111;
  }
`;

const SpacedButton = styled(Button)`
  && {
    margin-top: 25px;
  }
`;

const CreateActivity = () => {
  const [createdActivity, setCreatedActivity] = useState({
    activity: "",
    accessibility: null,
    participants: 1,
    type: "recreational",
    price: null,
    // image: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const dispatch = useDispatch();

  const addFavorite = (payload) =>
    dispatch(favoriteListSlice.actions.add(payload));

  const handleParticipantsChange = (e) => {
    setCreatedActivity({
      ...createdActivity,
      participants: e.target.value,
    });
  };

  const handleActivityTypeChange = (e) => {
    setCreatedActivity({ ...createdActivity, type: e.target.value });
  };

  const saveActivity = async () => {
    setIsSubmit(true);
    if (Object.keys(formErrors).length === 0) {
      const response = await axios.post("http://localhost:8000/post", {
        activity: createdActivity,
      });
      addFavorite({ ...response.data, createdActivity });
    }
  };

  useEffect(() => {
    setFormErrors(validate(createdActivity));
  }, [createdActivity]);

  const validate = (values) => {
    const errors = {};
    if (!values.activity) {
      errors.activity = "This field is required";
    }
    if (!values.accessibility) {
      errors.accessibility = "This field is required";
    }
    if (!values.price) {
      errors.price = "This field is required";
    }
    return errors;
  };

  return (
    <CreateActivityContainer>
      <LabelAndInputContainer>
        <Label>Activity</Label>
        <Input
          type="text"
          name="name"
          placeholder="Enter activity name"
          value={createdActivity.activity}
          onChange={(e) =>
            setCreatedActivity({
              ...createdActivity,
              activity: e.target.value,
            })
          }
        />
        <p>{formErrors.activity}</p>
      </LabelAndInputContainer>
      <LabelAndInputContainer>
        <Label>Accesibility</Label>
        <Input
          onChange={(e) =>
            setCreatedActivity({
              ...createdActivity,
              accessibility: Number(e.target.value),
            })
          }
          type="number"
          name="accesibility"
          placeholder="Enter activity name"
          value={createdActivity.accessibility || ""}
        />
        <p>{formErrors.accessibility}</p>
      </LabelAndInputContainer>
      <LabelAndInputContainer>
        <DropDownLabel id="imple-select-label">Participants</DropDownLabel>
        <Select
          labelId="simple-select-label"
          id="simple-select"
          value={createdActivity.participants}
          label="Participants"
          onChange={handleParticipantsChange}
        >
          <MenuItem value={0}>0</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
        </Select>
        <p>{formErrors.participants}</p>
      </LabelAndInputContainer>
      <LabelAndInputContainer>
        <DropDownLabel id="imple-select-label">Type</DropDownLabel>
        <Select
          labelId="simple-select-label"
          id="simple-select"
          value={createdActivity.type}
          label="Activity"
          variant="standard"
          onChange={handleActivityTypeChange}
        >
          <MenuItem value={"educational"}>Educational</MenuItem>
          <MenuItem value={"recreational"}>Recreational</MenuItem>
          <MenuItem value={"social"}>Social</MenuItem>
          <MenuItem value={"diy"}>Diy</MenuItem>
          <MenuItem value={"charity"}>Charity</MenuItem>
          <MenuItem value={"cooking"}>Cooking</MenuItem>
          <MenuItem value={"relaxation"}>Relaxation</MenuItem>
          <MenuItem value={"music"}>Music</MenuItem>
          <MenuItem value={"busywork"}>Busywork</MenuItem>
        </Select>
      </LabelAndInputContainer>
      <LabelAndInputContainer>
        <Label>Price</Label>
        <Input
          onChange={(e) =>
            setCreatedActivity({
              ...createdActivity,
              price: Number(e.target.value),
            })
          }
          type="number"
          name="price"
          placeholder="Enter activity name"
          value={createdActivity.price || ""}
        />
        <p>{formErrors.price}</p>
      </LabelAndInputContainer>
      <DropzoneArea
        acceptedFiles={["image/*"]}
        maxFileSize={256000}
        onChange={(fileObjs) =>
          setCreatedActivity({
            ...createdActivity,
            imageUrl: fileObjs[0]?.path,
          })
        }
        dropzoneText="Upload Image"
        showAlerts={false}
        filesLimit={1}
      />
      <SpacedButton
        variant="contained"
        sx={{ bgcolor: "#00447F" }}
        onClick={saveActivity}
      >
        Save
      </SpacedButton>
    </CreateActivityContainer>
  );
};

export default CreateActivity;
