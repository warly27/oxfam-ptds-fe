import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import { Box, styled, Icon } from "@mui/material";
import { Breadcrumb } from "app/components";
import Button from "@mui/material/Button";
import PartnersAddModal from "./PartnersAddModal";
import PaertnersData from "./partnersdata";
import PartnersData from "./partnersdata";

const data = [
  [
    "123",
    "CodeGXS",
    "GXS 123",
    "Makati City",
    "gxs@gxs.ph",
    "www.gxs.ph",
    "8882461234",
    "8/08/2022 08:08",
  ],
  [
    "456",
    "CodeGortex",
    "GCortex Inc",
    "MuntinlupaCity",
    "coretex@gmail.ph",
    "www.cortex.ph",
    "09171234567",
    "8/10/2022 08:08",
  ],
  [
    "789",
    "CodeCIC",
    "789 CIC",
    "Paranaque City",
    "789cics@cic.com",
    "www.cic.ph",
    "8902461234",
    "8/10/2022 08:08",
  ],
  [
    "1023",
    "CodePoorHub",
    "Poor Fighter Hub",
    "Mandaluyong City",
    "fighter@poorhub.ph",
    "www.poorfighter.ph",
    "88824645678",
    "8/11/2022 08:08",
  ],
  [
    "143",
    "CodePeace",
    "Peace 143",
    "San Juan City",
    "Allis@love.ph",
    "www.peacelove.ph",
    "8881434455",
    "8/13/2022 08:08",
  ],
  [
    "7070",
    "CodeMahalKaNya",
    "Mahal Kita",
    "Santa Rosa City",
    "220@mahalkita.ph",
    "www.mahalkanya.ph",
    "8882461234",
    "8/03/2022 08:08",
  ],
  [
    "1230",
    "CodeBioMan",
    "BIO Man",
    "Cebu City",
    "Bio@man.ph",
    "www.bioman.ph",
    "8881231234",
    "8/20/2022 08:08",
  ],
];

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

const PartnersTable = () => {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
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
        <Button
          variant="contained"
          color="success"
          className={classes.addButton}
          onClick={openModal}
        >
          <Icon>add</Icon>
          <span>Partners</span>
        </Button>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          {/* <MUIDataTable title="Partners List" data={data} columns={columns} options={options} /> */}
          <PartnersData />
        </Grid>
      </Grid>

      <PartnersAddModal showModal={showModal} setShowModal={setShowModal} />
    </Container>
  );
};
export default PartnersTable;
