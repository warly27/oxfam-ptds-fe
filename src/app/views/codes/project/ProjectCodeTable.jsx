import React, { useState, useEffect, useRef, useCallback } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Box, styled, Icon } from "@mui/material";
import { Breadcrumb } from "app/components";
import Button from "@mui/material/Button";
// import { OxFamLogo } from "app/components";
// import AppUserAddModal from "./AppUserAddModal";

import PartnersCodeData from "./projectcodedata";
import axios from "../../../utils/axios";

import ProjectsAddModal from "./ProjectsAddModal";
import AddModal from "./AppActivityLinkModal";
import { isEmpty } from "lodash";

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

const ProjectCodeTable = () => {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [projectsCodeData, setProjectsCodeData] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const [currentData, setCurrentData] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const descriptionElementRef = useRef(null);

  const fetchAllUsers = useCallback(async () => {
    const getPartnersCodeResult = await axios.get(
      `${BASE_URL}/codes/getAllProjectCodes`
    );
    setProjectsCodeData(getPartnersCodeResult?.data.data);
  }, []);

  const fetchCurrentData = useCallback(async () => {
    const getPartnersCodeResult = await axios.get(
      `${BASE_URL}/codes/project/details?id=${currentId}`
    );

    setCurrentData(getPartnersCodeResult?.data.data);
  }, [currentId]);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  useEffect(() => {
    if (!isEmpty(currentId) && isEdit) {
      fetchCurrentData();
    }
  }, [fetchCurrentData, currentId, isEdit]);

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

  const handleCreateProject = async (payload) => {
    const createProject = await axios.post(
      `${BASE_URL}/codes/createProjectCode`,
      payload
    );

    if (createProject?.status === 200) {
      fetchAllUsers();
      setShowModal(false);
    }
  };

  const handleLinkProject = async (payload) => {
    const createProject = await axios.post(
      `${BASE_URL}/activity/addActivityToProject`,
      payload
    );

    if (createProject?.status === 200) {
      fetchAllUsers();
      setShowAddModal(false);
      setCurrentId("");
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

  const handleDeleteProjectCode = async (id, code) => {
    const payload = {
      id,
      code,
    };

    const deleteRequest = await axios.delete(
      `${BASE_URL}/project/deleteProject`,
      { data: payload }
    );

    if (deleteRequest?.status === 200) {
      fetchAllUsers();
    }
  };

  const handleEditProject = async (payload) => {
    const editRequest = await axios.patch(`${BASE_URL}/codes/project`, payload);

    if (editRequest?.status === 200) {
      fetchAllUsers();
      setShowModal(false);
      setIsEdit(false);
    }
  };

  console.log("currentId", currentId);

  return (
    <Container>
      <Box className="breadcrumb" display="flex">
        <Breadcrumb
          routeSegments={[
            { name: "Partners Code", path: "/projects_code" },
            { name: "Codes" },
          ]}
        />
        <Button
          variant="contained"
          color="success"
          className={classes.addButton}
          onClick={openModal}
        >
          <Icon>add</Icon>
          <span>Add Project</span>
        </Button>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <PartnersCodeData
            projectsCodeData={projectsCodeData}
            handleConfirmUser={handleConfirmUser}
            handleDeleteProjectCode={handleDeleteProjectCode}
            setCurrentId={setCurrentId}
            setShowAddModal={setShowAddModal}
            setShowModal={setShowModal}
            setIsEdit={setIsEdit}
          />
        </Grid>
      </Grid>

      <ProjectsAddModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleCreateProject={handleCreateProject}
        currentData={currentData}
        setCurrentId={setCurrentId}
        setCurrentData={setCurrentData}
        isEdit={isEdit}
        handleEditProject={handleEditProject}
      />

      <AddModal
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
        currentId={currentId}
        handleLinkProject={handleLinkProject}
      />
    </Container>
  );
};
export default ProjectCodeTable;
