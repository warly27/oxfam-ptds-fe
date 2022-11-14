import React, { useState, useCallback, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Box, styled, Icon } from "@mui/material";
import { Breadcrumb } from "app/components";
import PartnersAddModal from "./PartnersAddModal";
import PartnersData from "./partnersdata";

import axios from "../../utils/axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

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

const PartnersTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [partnerList, setPartnerList] = useState([]);
  const [currentSelectedUser, setCurrentSelectedUser] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const fetchAllPartners = useCallback(async () => {
    const getAllUsersResult = await axios.get(
      `${BASE_URL}/partner/getAllPartners`
    );
    console.log(getAllUsersResult.data);
    setPartnerList(getAllUsersResult?.data?.data);
  }, []);

  useEffect(() => {
    fetchAllPartners();
  }, [fetchAllPartners]);

  const handleCreatePartner = async ({ project_id }) => {
    const payload = {
      user_id: currentSelectedUser?.id,
      project_id,
    };

    const confirmRequest = await axios.post(
      `${BASE_URL}/partner/createPartner`,
      payload
    );

    console.log("[confirmRequest]", confirmRequest);

    if (confirmRequest?.status === 200) {
      setShowModal(false);
      fetchAllPartners();
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
      fetchAllPartners();
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
      fetchAllPartners();
    }
  };

  return (
    <Container>
      <Box className="breadcrumb" display="flex">
        <Breadcrumb
          routeSegments={[
            { name: "Partners", path: "/records" },
            { name: "Records" },
          ]}
        />
        {/* <Button
          variant="contained"
          color="success"
          className={classes.addButton}
          onClick={openModal}
        >
          <Icon>add</Icon>
          <span>Partners</span>
        </Button> */}
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <PartnersData
            partnerList={partnerList}
            handleConfirmUser={handleConfirmUser}
            handleDeleteUser={handleDeleteUser}
            setShowModal={setShowModal}
            setCurrentSelectedUser={setCurrentSelectedUser}
            setIsEdit={setIsEdit}
          />
        </Grid>
      </Grid>

      <PartnersAddModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleCreatePartner={handleCreatePartner}
        partnerId={currentSelectedUser?.partner_id}
        isEdit={isEdit}
      />
    </Container>
  );
};
export default PartnersTable;
