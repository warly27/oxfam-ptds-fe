import React, { useState, useCallback, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Box, styled, Icon } from "@mui/material";
import { Breadcrumb } from "app/components";
import Button from "@mui/material/Button";
import ProjectsAddModal from "./ProjectsAddModal";
import ProjectsData from "./projectsdata";
import axios from "../../utils/axios";

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

const BASE_URL = process.env.REACT_APP_BASE_URL;

const ProjectsTable = () => {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  const [partnerList, setPartnerList] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [partnerProjectList, setPartnerProjectList] = useState([]);

  const fetchAllUsers = useCallback(async () => {
    const getAllCodesResult = await axios.get(
      `${BASE_URL}/project/getPartnerProject`
    );

    setPartnerProjectList(getAllCodesResult?.data?.data);
  }, []);

  const fetchAllPartners = useCallback(async () => {
    const getAllCodesResult = await axios.get(
      `${BASE_URL}/codes/getAllPartnerCodes`
    );

    setPartnerList(getAllCodesResult?.data?.data);
  }, []);

  const fetchAllProjects = useCallback(async () => {
    const getAllCodesResult = await axios.get(
      `${BASE_URL}/codes/getAllProjectCodes`
    );

    setProjectList(getAllCodesResult?.data?.data);
  }, []);

  useEffect(() => {
    fetchAllPartners();
    fetchAllProjects();
    fetchAllUsers();
  }, [fetchAllPartners, fetchAllProjects, fetchAllUsers]);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const handleLinkPartnerProject = async (project_id, partner_id) => {
    const payload = {
      project_id,
      partner_id,
    };

    const confirmRequest = await axios.post(
      `${BASE_URL}/partner/addPartnerToProject`,
      payload
    );

    if (confirmRequest?.status === 200) {
      fetchAllUsers();
      setShowModal(false);
    }
  };

  return (
    <Container>
      <Box className="breadcrumb" display="flex">
        <Breadcrumb
          routeSegments={[
            { name: "Projects", path: "/projects" },
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
          <span>Link Partner/Project</span>
        </Button>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <ProjectsData partnerProjectList={partnerProjectList} />
        </Grid>
      </Grid>

      <ProjectsAddModal
        showModal={showModal}
        setShowModal={setShowModal}
        partnerList={partnerList}
        projectList={projectList}
        handleLinkPartnerProject={handleLinkPartnerProject}
      />
    </Container>
  );
};
export default ProjectsTable;
