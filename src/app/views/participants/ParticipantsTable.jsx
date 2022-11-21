import React, { useState, useCallback, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Box, styled, Icon } from "@mui/material";
import { Breadcrumb } from "app/components";
import Button from "@mui/material/Button";
import ParticipantsModal from "./ParticipantsModal";
import ParticipantsData from "./ParticipantsData";

import axios from "../../utils/axios";
import BeneficiaryModal from "./BeneficiaryModal";

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

const ParticipantsTable = () => {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  const [showBeneficiaryModal, setShowBeneficiaryModal] = useState(false);
  const [participantsData, setParticipantsData] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  const fetchParticipantsData = useCallback(async () => {
    const getAllUsersResult = await axios.get(`${BASE_URL}/participants`);

    setParticipantsData(getAllUsersResult?.data?.data);
  }, []);

  useEffect(() => {
    fetchParticipantsData();
  }, [fetchParticipantsData]);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const handleCreateParticipant = async (payload) => {
    const createRequest = await axios.post(
      `${BASE_URL}/participants/create`,
      payload
    );

    console.log("[createRequest]: ", createRequest);

    if (createRequest?.status === 200) {
      fetchParticipantsData();
      setShowModal(false);
    }
  };

  const handleDeleteParticipant = async (id) => {
    const payload = {
      id,
    };

    const deleteRequest = await axios.delete(
      `${BASE_URL}/participants/delete`,
      { data: payload }
    );

    if (deleteRequest?.status === 200) {
      fetchParticipantsData();
    }
  };

  return (
    <Container>
      <Box className="breadcrumb" display="flex">
        <Breadcrumb
          routeSegments={[
            { name: "Participants", path: "/records" },
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
          <span>Participants</span>
        </Button>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <ParticipantsData
            participantsData={participantsData}
            handleDeleteParticipant={handleDeleteParticipant}
            setShowBeneficiaryModal={setShowBeneficiaryModal}
            setCurrentUser={setCurrentUser}
          />
        </Grid>
      </Grid>

      <ParticipantsModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleCreateParticipant={handleCreateParticipant}
      />

      <BeneficiaryModal
        showBeneficiaryModal={showBeneficiaryModal}
        setShowBeneficiaryModal={setShowBeneficiaryModal}
        currentUser={currentUser}
      />
    </Container>
  );
};
export default ParticipantsTable;
