import React, { useState, useEffect, useRef, useCallback } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Box, styled, Icon } from "@mui/material";
import { Breadcrumb } from "app/components";
import Button from "@mui/material/Button";
// import { OxFamLogo } from "app/components";
import IndicatorModal from "./IndicatorAddModal";

import IndicatorsCodeData from "./indicatorcodedata";
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

// const options = {
//   onRowsDelete: (rowsDeleted, dataRows) => {
//     console.log(dataRows[0]);
//     console.log(rowsDeleted.data);
//   },
// };

const IndicatorCodeTable = () => {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  const [indicatorsCodeData, setIndicatorsCodeData] = useState([]);

  const descriptionElementRef = useRef(null);

  const fetchAllIndicator = useCallback(async () => {
    const indicatorsCodeResult = await axios.get(
      `${BASE_URL}/codes/getAllIndicators`
    );
    setIndicatorsCodeData(indicatorsCodeResult?.data);
  }, []);

  useEffect(() => {
    fetchAllIndicator();
  }, [fetchAllIndicator]);

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

  const handleCreatePartner = async (payload) => {
    const createRequest = await axios.post(
      `${BASE_URL}/codes/createIndicator`,
      payload
    );

    console.log("[createRequest]", createRequest);

    if (createRequest?.status === 200) {
      fetchAllIndicator();
      setShowModal(false);
    }
  };

  // const handleConfirmUser = async (email) => {
  //   const payload = {
  //     email,
  //   };

  //   const confirmRequest = await axios.post(
  //     `${BASE_URL}/auth/confirmation`,
  //     payload
  //   );

  //   if (confirmRequest?.status === 200) {
  //     fetchAllIndicator();
  //   }
  // };

  const handleDeleteUser = async (id) => {
    const payload = {
      id,
    };

    const deleteRequest = await axios.delete(`${BASE_URL}/codes/indicator`, {
      data: payload,
    });

    if (deleteRequest?.status === 200) {
      fetchAllIndicator();
    }
  };

  return (
    <Container>
      <Box className="breadcrumb" display="flex">
        <Breadcrumb
          routeSegments={[
            { name: "Indicators Code", path: "/indicators/code" },
            { name: "Codes", path: "/indicators/code" },
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
          <IndicatorsCodeData
            indicatorsCodeData={indicatorsCodeData}
            handleDeleteUser={handleDeleteUser}
          />
        </Grid>
      </Grid>

      <IndicatorModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleCreatePartner={handleCreatePartner}
      />
    </Container>
  );
};
export default IndicatorCodeTable;
