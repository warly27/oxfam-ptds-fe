import React, { useState, useEffect, useRef, useCallback } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Box, styled, Icon } from "@mui/material";
import { Breadcrumb } from "app/components";
import Button from "@mui/material/Button";
// import { OxFamLogo } from "app/components";
import AppUserAddModal from "./AppUserAddModal";

import UsersData from "./usersdata";
import axios from "../../utils/axios";

import useAuth from "../../hooks/useAuth";

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

// const options = {
//   onRowsDelete: (rowsDeleted, dataRows) => {
//     console.log(dataRows[0]);
//     console.log(rowsDeleted.data);
//   },
// };

const AppUsersTable = () => {
  const classes = useStyles();
  const { adminCreateUser } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState([]);

  const descriptionElementRef = useRef(null);

  const fetchAllUsers = useCallback(async () => {
    const getAllUsersResult = await axios.get(`${BASE_URL}/users/getAllUsers`);
    setUserData(getAllUsersResult?.data?.data);
  }, []);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  useEffect(() => {
    if (showModal) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [showModal]);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const handleCreateUser = async ({
    email,
    userName,
    password,
    fundSource,
  }) => {
    const adminCreateUserRequest = await adminCreateUser(
      email,
      userName,
      password,
      fundSource
    );

    console.log("[adminCreateUserRequest]: ", adminCreateUserRequest);
  };

  const handleConfirmUser = async (email) => {
    const payload = {
      email,
    };

    const confirmRequest = await axios.post(
      `${BASE_URL}/auth/confirmation`,
      payload
    );

    if (confirmRequest?.status === 200) {
      fetchAllUsers();
    }
  };

  const handleDeleteUser = async (cognitoId, email) => {
    const payload = {
      cognito_id: cognitoId,
      email,
    };

    const deleteRequest = await axios.post(
      `${BASE_URL}/users/deleteUser`,
      payload
    );

    if (deleteRequest?.status === 200) {
      fetchAllUsers();
    }
  };

  return (
    <Container>
      <Box className="breadcrumb" display="flex">
        <Breadcrumb
          routeSegments={[
            { name: "App Users", path: "/appusers" },
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
          <span>Users</span>
        </Button>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <UsersData
            userData={userData}
            handleConfirmUser={handleConfirmUser}
            handleDeleteUser={handleDeleteUser}
          />
        </Grid>
      </Grid>

      <AppUserAddModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleCreateUser={handleCreateUser}
      />
    </Container>
  );
};
export default AppUsersTable;
