import React, { useState, useEffect, useRef, useCallback } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Box, styled, Icon } from "@mui/material";
import { Breadcrumb } from "app/components";
import Button from "@mui/material/Button";
import AppActivityAddModal from "./AppActivityAddModal";
import Activities from "./activitydata";

import axios from "../../utils/axios";
import AddModal from "./AppActivityLinkModal";
import ActivityParticipantsModal from "./AppActivityParticipants";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const useStyles = makeStyles((theme) => ({
  tableOverflow: {
    overflow: "auto",
  },
  addButton: {
    position: "absolute",
    color: "white",
    size: "medium",
    right: "25px",
  },
}));

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
  "& .addButton": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const AppActivityTable = () => {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  const [activityList, setActivityList] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showParticipantModal, setShowParticipantModal] = useState(false);
  const [currentId, setCurrentId] = useState("");

  const descriptionElementRef = useRef(null);

  const fetchAllActivities = useCallback(async () => {
    const getAllUsersResult = await axios.get(
      `${BASE_URL}/activity/getAllActivities`
    );

    setActivityList(getAllUsersResult?.data?.data);
  }, []);

  useEffect(() => {
    fetchAllActivities();
  }, [fetchAllActivities]);

  useEffect(() => {
    if (showModal) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [showModal]);

  const handleCreateActivity = async (payload) => {
    const createRequest = await axios.post(
      `${BASE_URL}/activity/createActivity`,
      payload
    );

    console.log("[createRequest]: ", createRequest);

    if (createRequest?.status === 200) {
      fetchAllActivities();
      setShowModal(false);
    }
  };

  const handleLinkParticipant = async (payload) => {
    const createRequest = await axios.post(
      `${BASE_URL}/partner/addParticipantToActivity`,
      payload
    );

    console.log("[createRequest]: ", createRequest);

    if (createRequest?.status === 200) {
      fetchAllActivities();
      setShowAddModal(false);
    }
  };

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <Container>
      <Box className="breadcrumb" display="flex">
        <Breadcrumb
          routeSegments={[
            { name: "App Activity", path: "/records" },
            { name: "Records" },
          ]}
        />
        <Button
          variant="contained"
          color="success"
          className={classes.addButton}
          onClick={openModal}
        >
          <Icon>add</Icon>
          <span>Activity</span>
        </Button>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Activities
            activityList={activityList}
            showAddModal={showAddModal}
            setShowAddModal={setShowAddModal}
            setCurrentId={setCurrentId}
            setShowParticipantModal={setShowParticipantModal}
          />
        </Grid>
      </Grid>

      <AppActivityAddModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleCreateActivity={handleCreateActivity}
      />

      <AddModal
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
        handleLinkParticipant={handleLinkParticipant}
        currentId={currentId}
      />

      <ActivityParticipantsModal
        showParticipantModal={showParticipantModal}
        setShowParticipantModal={setShowParticipantModal}
        currentId={currentId}
      />
    </Container>
  );
};
export default AppActivityTable;
