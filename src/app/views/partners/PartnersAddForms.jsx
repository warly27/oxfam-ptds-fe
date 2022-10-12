import React, { useCallback } from "react";
import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import {
// Grid,
// TextField,
// Button,
// Card,
// CardContent,
// Icon,
// } from "@material-ui/core";
import { Span } from "app/components/Typography";
import { useEffect, useState } from "react";
import { ValidatorForm } from "react-material-ui-form-validator";
import { inputFormElements } from "app/components/FormElement";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Icon from "@mui/material/Icon";
import Button from "@mui/material/Button";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import axios from "../../utils/axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const PartnersAddForms = ({ handleCreatePartner }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [partnerCode, setPartnerCode] = useState("");
  const [partnerCodeLookup, setPartnerCodeLookup] = useState([]);

  const fetchPartnerCodeLookup = useCallback(async () => {
    const getPartnerCodeLookup = await axios.get(
      `${BASE_URL}/lookup/partner/codes`
    );

    setPartnerCodeLookup(getPartnerCodeLookup?.data?.data);
  }, []);

  useEffect(() => {
    fetchPartnerCodeLookup();
  }, []);

  const handleSubmit = async () => {
    handleCreatePartner({
      email,
      userName,
      password,
      mobileNo,
      partnerCode,
      companyName,
      companyAddress,
    });

    // if (confirmRequest?.status === 200) {
    //   fetchAllUsers();
    // }
  };

  const handleChange = (event) => {
    console.log("[event.target.name]", event.target.name);

    const isUsername = event.target.name === "userName";
    if (isUsername) {
      setUserName(event.target.value);
    }

    const isEmail = event.target.name === "email";
    if (isEmail) {
      setEmail(event.target.value);
    }

    const isPassword = event.target.name === "password";
    if (isPassword) {
      setPassword(event.target.value);
    }

    const isMobileNo = event.target.name === "phone";
    if (isMobileNo) {
      setMobileNo(event.target.value);
    }

    const isCompanyName = event.target.name === "company";
    if (isCompanyName) {
      setCompanyName(event.target.value);
    }

    const isCompanyAddress = event.target.name === "companyAddress";
    if (isCompanyAddress) {
      setCompanyAddress(event.target.value);
    }

    const isPartnerCode = event.target.name === "partnerCode";
    if (isPartnerCode) {
      setPartnerCode(event.target.value);
    }
  };

  const handleDateChange = (date) => {};

  const margin = { margin: "0 5px" };

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Card>
          <CardContent>
            <Grid container rowSpacing={2}>
              <Grid container item spacing={2}>
                {inputFormElements.slice(2, 8).map((input) => (
                  <Grid xs={input.xs} sm={input.sm} item>
                    <TextField {...input} onChange={handleChange} />
                  </Grid>
                ))}
              </Grid>

              <Grid container item>
                <Grid xs={12} sm={12} item>
                  <FormControl fullWidth>
                    <InputLabel id="partner-code-select-label">
                      Partner Code
                    </InputLabel>

                    <Select
                      labelId="partner-code-select-label"
                      id="partner-code-select"
                      value={partnerCode}
                      label="Partner Code"
                      onChange={handleChange}
                      name="partnerCode"
                    >
                      {partnerCodeLookup.map((data) => (
                        <MenuItem value={data?.code}>{data?.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              {/* <Typography variant="body2" align="left" gutterBottom>
                  Address :{' '}
                </Typography> */}

              <Grid container item spacing={2}>
                <Grid item xs={12} align="right">
                  <Button
                    style={margin}
                    type="reset"
                    variant="outlined"
                    color="primary"
                  >
                    Reset
                  </Button>
                  <Button color="primary" variant="contained" type="submit">
                    <Icon>send</Icon>
                    <Span sx={{ pl: 1, textTransform: "capitalize" }}>
                      Submit
                    </Span>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </ValidatorForm>
    </div>
  );
};

export default PartnersAddForms;
