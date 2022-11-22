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
import isEmpty from "lodash/isEmpty";

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
  const [isEdit, setIsEdit] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [userDetails, setUserDetails] = useState({});

  // const descriptionElementRef = useRef(null);

  const fetchAllUsers = useCallback(async () => {
    const getAllUsersResult = await axios.get(`${BASE_URL}/users/getAllUsers`);
    setUserData(getAllUsersResult?.data?.data);
  }, []);

  const fetchUserDetails = useCallback(async () => {
    const getPartnerCodeLookup = await axios.get(
      `${BASE_URL}/user/${currentUser?.id}/details`
    );

    setUserDetails(getPartnerCodeLookup?.data?.data);
  }, [currentUser]);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  // useEffect(() => {
  //   if (showModal) {
  //     const { current: descriptionElement } = descriptionElementRef;
  //     if (descriptionElement !== null) {
  //       descriptionElement.focus();
  //     }
  //   }
  // }, [showModal]);

  useEffect(() => {
    if (!isEmpty(currentUser)) {
      fetchUserDetails();
    }
  }, [fetchUserDetails, currentUser]);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const handleCreateUser = async ({
    email,
    userName,
    password,
    fundSource,
    partnerCode,
    firstName,
    lastName,
    project_id,
  }) => {
    const adminCreateUserRequest = await adminCreateUser(
      email,
      userName,
      password,
      fundSource,
      partnerCode,
      firstName,
      lastName,
      project_id
    );

    console.log("[adminCreateUserRequest]: ", adminCreateUserRequest);

    if (adminCreateUserRequest?.status === 200) {
      fetchAllUsers();
      setShowModal(false);
    }
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

  const handleEditUser = async (payload) => {
    const patchRequest = await axios.patch(`${BASE_URL}/user/edit`, payload);

    if (patchRequest?.status === 200) {
      fetchAllUsers();
      setShowModal(false);
      setIsEdit(false);
      setCurrentUser({});
      setUserDetails({});
    }
  };

  console.log("[userDetails]: ", userDetails);

  return (
    <Container>
      <Box className="breadcrumb" display="flex">
        <Breadcrumb
          routeSegments={[
            { name: "PTDS Users", path: "/appusers" },
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
          <span>Add New User</span>
        </Button>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <UsersData
            userData={userData}
            handleConfirmUser={handleConfirmUser}
            handleDeleteUser={handleDeleteUser}
            openModal={openModal}
            setIsEdit={setIsEdit}
            setCurrentUser={setCurrentUser}
          />
        </Grid>
      </Grid>

      <AppUserAddModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleCreateUser={handleCreateUser}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        currentUser={userDetails}
        handleEditUser={handleEditUser}
        setUserDetails={setUserDetails}
        setCurrentUser={setCurrentUser}
      />
    </Container>
  );
};
export default AppUsersTable;
