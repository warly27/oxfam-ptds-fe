import React, { useEffect, useState, useCallback } from "react";
import { Span } from "app/components/Typography";
import { ValidatorForm } from "react-material-ui-form-validator";
import { inputFormElements } from "app/components/FormElement";
// import {
// Grid,
// TextField,
// Button,
// Card,
// CardContent,
// Typography,
// Icon,
// } from "@material-ui/core";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Icon from "@mui/material/Icon";

import axios from "../../utils/axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const AppUsersForms = ({ handleCreateUser }) => {
  const [fundSource, setFundSource] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [partnerCode, setPartnerCode] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [partnerCodeLookup, setPartnerCodeLookup] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const fetchPartnerCodeLookup = useCallback(async () => {
    const getPartnerCodeLookup = await axios.get(
      `${BASE_URL}/codes/getAllPartnerCodes`
    );

    setPartnerCodeLookup(getPartnerCodeLookup?.data);
  }, []);

  useEffect(() => {
    fetchPartnerCodeLookup();
  }, []);

  const handleChange = (event) => {
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

    const isFundSource = event.target.name === "fundSource";
    if (isFundSource) {
      setFundSource(event.target.value);
    }

    const isPartnerCode = event.target.name === "partnerCode";
    if (isPartnerCode) {
      setPartnerCode(event.target.value);
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

    const isWebsite = event.target.name === "companyWebsite";
    if (isWebsite) {
      setWebsite(event.target.value);
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);
    handleCreateUser({
      email,
      userName,
      password,
      fundSource,
      partnerCode,
      mobileNo,
      companyName,
      companyAddress,
      website,
    });
  };

  const handleReset = () => {
    setFundSource("");
    setUserName("");
    setEmail("");
    setPassword("");
    setPartnerCode("");
  };

  const isPartner = fundSource === "partner";

  const margin = { margin: "0 5px" };

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Card>
          <CardContent>
            {/* <form> */}
            <Grid container rowSpacing={2}>
              <Grid container item spacing={2}>
                {inputFormElements.slice(2, 5).map((input) => (
                  <Grid xs={input.xs} sm={input.sm} item>
                    <TextField {...input} onChange={handleChange} />
                  </Grid>
                ))}
              </Grid>

              <Grid container item>
                <Grid xs={12} sm={12} item>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      User Role
                    </InputLabel>

                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={fundSource}
                      label="Project Fund Source"
                      onChange={handleChange}
                      name="fundSource"
                    >
                      <MenuItem value={"admin"}>Admin</MenuItem>
                      <MenuItem value={"partner"}>Partner</MenuItem>
                      <MenuItem value={"melsa"}>Melsa</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              {isPartner && (
                <Grid container item rowSpacing={2}>
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
                          <MenuItem value={data?.code}>{data?.code}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid xs={12} sm={12} item>
                    <FormControl fullWidth>
                      <TextField
                        name="companyWebsite"
                        placeholder="Enter Company website"
                        label="Company Website"
                        variant="outlined"
                        fullWidth={true}
                        required={true}
                        xs={12}
                        sm={6}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </Grid>

                  <Grid container item spacing={2}>
                    {inputFormElements.slice(6, 8).map((input) => (
                      <Grid xs={input.xs} sm={input.sm} item>
                        <TextField {...input} onChange={handleChange} />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              )}

              <Grid container item>
                <Grid item xs={12} align="right">
                  <Button
                    style={margin}
                    type="reset"
                    variant="outlined"
                    color="primary"
                    onClick={handleReset}
                  >
                    Reset
                  </Button>

                  <LoadingButton
                    color="primary"
                    variant="contained"
                    type="submit"
                    loading={isLoading}
                  >
                    <Icon>send</Icon>
                    <Span sx={{ pl: 1, textTransform: "capitalize" }}>
                      Submit
                    </Span>
                  </LoadingButton>
                </Grid>
              </Grid>
            </Grid>
            {/* </form> */}
          </CardContent>
        </Card>
      </ValidatorForm>
    </div>
  );
};

export default AppUsersForms;
