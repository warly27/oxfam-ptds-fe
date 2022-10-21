import React, { useState, useEffect, useRef, useCallback } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Box, styled, Icon } from "@mui/material";
import { Breadcrumb } from "app/components";
import Button from "@mui/material/Button";
import PartnersAddModal from "./PartnersAddModal";

import PartnersCodeData from "./partnercodedata";
import axios from "../../../utils/axios";

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

const PartnerCodeTable = () => {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  const [partnersCodeData, setPartnersCodeData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [currentData, setCurrentData] = useState({});

  const descriptionElementRef = useRef(null);

  const fetchAllPartners = useCallback(async () => {
    const getPartnersCodeResult = await axios.get(
      `${BASE_URL}/codes/getAllPartnerCodes`
    );
    setPartnersCodeData(getPartnersCodeResult?.data);
  }, []);

  useEffect(() => {
    fetchAllPartners();
  }, [fetchAllPartners]);

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

  console.log("[showModal]: ", showModal);

  const handleCreatePartner = async ({
    email,
    website,
    mobileNo,
    partnerCode,
    companyName,
    companyAddress,
  }) => {
    const payload = {
      name: companyName,
      email,
      contact_number: mobileNo,
      website: website,
      address: companyAddress,
      code: partnerCode,
    };

    const confirmRequest = await axios.post(
      `${BASE_URL}/codes/createPartnerCode`,
      payload
    );

    console.log("[confirmRequest]", confirmRequest);

    if (confirmRequest?.status === 200) {
      setShowModal(false);
      fetchAllPartners();
    }
  };

  const handleDeletePartnerCode = async (id) => {
    const payload = {
      id,
    };

    const deleteRequest = await axios.delete(
      `${BASE_URL}/codes/partner/delete`,
      { data: payload }
    );

    if (deleteRequest?.status === 200) {
      fetchAllPartners();
    }
  };

  const handleEditPartnerCode = async (payload) => {
    const editRequest = await axios.patch(
      `${BASE_URL}/codes/partner/edit`,
      payload
    );

    if (editRequest?.status === 200) {
      fetchAllPartners();
      setIsEdit(false);
      setShowModal(false);
    }
  };

  return (
    <Container>
      <Box className="breadcrumb" display="flex">
        <Breadcrumb
          routeSegments={[
            { name: "Partners Code", path: "/partners_code" },
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
          <span>Code</span>
        </Button>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <PartnersCodeData
            partnersCodeData={partnersCodeData}
            handleDeletePartnerCode={handleDeletePartnerCode}
            setShowModal={setShowModal}
            setCurrentData={setCurrentData}
            setIsEdit={setIsEdit}
          />
        </Grid>
      </Grid>

      <PartnersAddModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleCreatePartner={handleCreatePartner}
        isEdit={isEdit}
        currentData={currentData}
        handleEditPartnerCode={handleEditPartnerCode}
      />
    </Container>
  );
};
export default PartnerCodeTable;
