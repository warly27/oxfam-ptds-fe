import React, { useState, useCallback, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Box, styled, Icon } from "@mui/material";
import { Breadcrumb } from "app/components";
import Button from "@mui/material/Button";
import AppActivityAddModal from "./AppActivityAddModal";
import ActivityData from "./activitydata";

import axios from "../../utils/axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const review = () => {
  console.log("TEST");
};

const columns = [
  { name: "ID" },
  { name: "Code" },
  "Name",
  "Address",
  "Email",
  "Website",
  "Contact No",
  "Create At",
  {
    name: "Actions",
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <Button variant="outlined" color="secondary" onClick={review}>
            {`Review`}
          </Button>
        );
      },
    },
  },
];

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

const options = {
  onRowsDelete: (rowsDeleted, dataRows) => {
    console.log(dataRows[0]);
    console.log(rowsDeleted.data);
  },
};

const AppActivityTable = () => {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  const [activityList, setActivityList] = useState([]);

  const fetchAllActivities = useCallback(async () => {
    const getAllActivitiesResult = await axios.get(
      `${BASE_URL}/activity/getAllActivities`
    );
    console.log(getAllActivitiesResult.data)
    setActivityList(getAllActivitiesResult?.data?.data);
  }, []);

  useEffect(() => {
    fetchAllActivities();
  }, [fetchAllActivities]);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const handleCreateActivities = async ({
    email,
    website,
    password,
    mobileNo,
    partnerCode,
    companyName,
    companyAddress,
  }) => {
    const payload = {
      name: companyName,
      email,
      password,
      contact_number: mobileNo,
      website: website,
      address: companyAddress,
      code: partnerCode,
    };

    const confirmRequest = await axios.post(
      `${BASE_URL}/partner/createPartner`,
      payload
    );

    console.log("[confirmRequest]", confirmRequest);

    if (confirmRequest?.status === 200) {
      setShowModal(false);
      fetchAllActivities();
    }
  };

  const handleConfirmUser = async (email) => {
    const payload = {
      email,
    };

    const confirmRequest = await axios.post(
      `${BASE_URL}/admin/partner/confrim`,
      payload
    );

    console.log("[confirmRequest]", confirmRequest);

    if (confirmRequest?.status === 200) {
      fetchAllActivities();
    }
  };

  const handleDeleteUser = async (cognitoId, email) => {
    const payload = {
      cognito_id: cognitoId,
      email,
    };

    const deleteRequest = await axios.post(
      `${BASE_URL}/partner/deletePartner`,
      payload
    );

    console.log("[deleteRequest]", deleteRequest);

    if (deleteRequest?.status === 200) {
      fetchAllActivities();
    }
  };

  return (
    <Container>
      <Box className="breadcrumb" display="flex">
        <Breadcrumb
          routeSegments={[
            { name: "Activities", path: "/records" },
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
          <span>Activities</span>
        </Button>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <ActivityData
            activityList={activityList}
            handleConfirmUser={handleConfirmUser}
            handleDeleteUser={handleDeleteUser}
          />
        </Grid>
      </Grid>

      <AppActivityAddModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleCreateActivities={handleCreateActivities}
      />
    </Container>
  );
};
export default AppActivityTable;
