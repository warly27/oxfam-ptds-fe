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
import CustomizedDialogs from "../mydialogbox/customDialog";

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
  const [showDialog, setShowDialog] = useState(false);
  const [responseMessage, setMessageResponse] = useState("");
  const [hasError, setHasError] = useState(false);
  const [currentData, setCurrentData] = useState({});
  const [isEdit, setIsEdit] = useState(false);

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

  const handleDeleteActivity = async (payload) => {
    const deleteRequest = await axios.delete(`${BASE_URL}/activity`, {
      data: payload,
    });

    console.log("[deleteRequest]: ", deleteRequest);

    if (deleteRequest?.status === 200) {
      fetchAllActivities();
    }
  };

  const handleEditActivity = async (payload) => {
    const editRequest = await axios.patch(`${BASE_URL}/activity/edit`, payload);

    console.log("[editRequest]: ", editRequest);

    if (editRequest?.status === 200) {
      fetchAllActivities();
      setShowModal(false);
      setIsEdit(false);
      setCurrentData({});
    }
  };

  const handleLinkParticipant = async (payload) => {
    try {
      const createRequest = await axios.post(
        `${BASE_URL}/partner/addParticipantToActivity`,
        payload
      );

      console.log("[createRequest]: ", createRequest);

      if (createRequest?.status === 200) {
        fetchAllActivities();
        setShowAddModal(false);
        setHasError(false);
        setCurrentId("");
      }
    } catch (err) {
      console.log("[err]", err);
      setShowDialog(true);
      setMessageResponse(err?.message);
      setShowAddModal(false);
      setHasError(true);
      setCurrentId("");
    }
  };

  const handleDeleteParticipants = async (payload) => {
    try {
      const patchRequest = await axios.patch(
        `${BASE_URL}/activity/participants`,
        payload
      );

      console.log("[patchRequest]: ", patchRequest);

      if (patchRequest?.status === 200) {
        fetchAllActivities();
        setShowParticipantModal(false);
        setHasError(false);
        setCurrentId("");
      }
    } catch (err) {
      setShowDialog(true);
      setMessageResponse(err?.message);
      setShowParticipantModal(false);
      setHasError(true);
      setCurrentId("");
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
            handleDeleteActivity={handleDeleteActivity}
            setCurrentData={setCurrentData}
            setIsEdit={setIsEdit}
            setShowModal={setShowModal}
          />
        </Grid>
      </Grid>

      <AppActivityAddModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleCreateActivity={handleCreateActivity}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        currentData={currentData}
        setCurrentData={setCurrentData}
        handleEditActivity={handleEditActivity}
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
        setCurrentId={setCurrentId}
        handleDeleteParticipants={handleDeleteParticipants}
      />

      <CustomizedDialogs
        showModal={showDialog}
        setShowModal={setShowDialog}
        message={responseMessage}
        type={hasError ? "error" : undefined}
      />
    </Container>
  );
};
export default AppActivityTable;
