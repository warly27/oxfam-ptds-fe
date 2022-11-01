import React, { useCallback } from "react";
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
import Autocomplete from "@mui/material/Autocomplete";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import axios from "../../utils/axios";

import LoadingButton from "@mui/lab/LoadingButton";
import debounce from "lodash/debounce";
import isEmpty from "lodash/isEmpty";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const PartnersAddForms = ({ handleCreatePartner }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [partnerCode, setPartnerCode] = useState("");
  const [currentName, setCurrentName] = useState("");

  const [partnerCodeLookup, setPartnerCodeLookup] = useState([]);
  const [partnerNameLookup, setPartnerNameLookup] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const fetchPartnerCodeLookup = useCallback(async () => {
    const getPartnerCodeLookup = await axios.get(
      `${BASE_URL}/codes/getAllPartnerCodes`
    );

    setPartnerCodeLookup(getPartnerCodeLookup?.data);
  }, []);

  const fetchAutoCompleteName = useCallback(async () => {
    const hasName = !isEmpty(currentName);
    if (hasName) {
      const getPartnerNameLookup = await axios.get(
        `${BASE_URL}/partner/autocomplete?name=${currentName}&type=partners`
      );

      const moldData = getPartnerNameLookup?.data?.data.map((record) => ({
        label: record?.name,
        id: record?.id,
      }));

      setPartnerNameLookup(moldData);
    }
  }, [currentName]);

  useEffect(() => {
    fetchPartnerCodeLookup();
  }, []);

  useEffect(() => {
    fetchAutoCompleteName();
  }, [fetchAutoCompleteName, currentName]);

  const handleSubmit = async () => {
    setIsLoading(true);

    handleCreatePartner({
      email,
      website,
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

  const handleAutoCompleteName = debounce((event) => {
    console.log("[value]: ", event.target.value);
    const trimName = event.target.value.trim();

    setCurrentName(trimName);
    setCompanyName(trimName);
  }, 700);

  const handleChange = (event) => {
    console.log("[event.target.name]", event.target.value);

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

    // const isCompanyName = event.target.name === "company";
    // if (isCompanyName) {
    //   handleAutoCompleteName(event.target.value);
    // }

    const isCompanyAddress = event.target.name === "companyAddress";
    if (isCompanyAddress) {
      setCompanyAddress(event.target.value);
    }

    const isPartnerCode = event.target.name === "partnerCode";
    if (isPartnerCode) {
      setPartnerCode(event.target.value);
    }

    const isWebsite = event.target.name === "companyWebsite";
    if (isWebsite) {
      setWebsite(event.target.value);
    }
  };

  const handleChangeAutoComplete = (_event, value) => {
    setCompanyName(value?.label);
  };

  const margin = { margin: "0 5px" };

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Card>
          <CardContent>
            <Grid container rowSpacing={2}>
              <Grid container item spacing={2}>
                {inputFormElements.slice(3, 6).map((input) => (
                  <Grid xs={input.xs} sm={input.sm} item>
                    <TextField {...input} onChange={handleChange} />
                  </Grid>
                ))}
              </Grid>

              <Grid item xs={12}>
                <Autocomplete
                  disablePortal
                  id="company"
                  options={partnerNameLookup}
                  fullWidth={true}
                  name="company"
                  value={companyName || currentName}
                  onChange={handleChangeAutoComplete}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      type="text"
                      name="company"
                      onChange={handleAutoCompleteName}
                      label="Company"
                      required={true}
                      fullWidth={true}
                    />
                  )}
                />

                {/* <TextField /> */}
              </Grid>

              <Grid container item spacing={2}>
                {inputFormElements.slice(7, 8).map((input) => (
                  <Grid xs={input.xs} sm={input.sm} item>
                    <TextField {...input} onChange={handleChange} />
                  </Grid>
                ))}
              </Grid>

              <Grid container item>
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
                        <MenuItem value={data?.code}>{data?.code}</MenuItem>
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
          </CardContent>
        </Card>
      </ValidatorForm>
    </div>
  );
};

export default PartnersAddForms;
