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
  };

  const handleSubmit = async () => {
    handleCreateUser({
      email,
      userName,
      password,
      fundSource,
      partnerCode,
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

                  <Button color="primary" variant="contained" type="submit">
                    <Icon>send</Icon>
                    <Span sx={{ pl: 1, textTransform: "capitalize" }}>
                      Submit
                    </Span>
                  </Button>
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
