import React, { useState, useCallback, useEffect } from "react";

import { Span } from "app/components/Typography";
import { ValidatorForm } from "react-material-ui-form-validator";
import { inputFormElements } from "app/components/FormElement";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Icon from "@mui/material/Icon";
import Button from "@mui/material/Button";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import LoadingButton from "@mui/lab/LoadingButton";

import axios from "../../../utils/axios";
import isEmpty from "lodash/isEmpty";
import debounce from "lodash/debounce";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const PartnersAddForms = ({
  handleCreatePartner,
  currentData,
  isEdit,
  handleEditPartnerCode,
}) => {
  const [email, setEmail] = useState("" || currentData?.email);
  const [mobileNo, setMobileNo] = useState("" || currentData?.phone);
  const [companyName, setCompanyName] = useState("" || currentData?.company);
  const [companyAddress, setCompanyAddress] = useState(
    "" || currentData?.companyAddress
  );
  const [website, setWebsite] = useState("" || currentData?.companyWebsite);
  const [partnerCode, setPartnerCode] = useState(
    "" || currentData?.partnerCode
  );

  const [partnerNameLookup, setPartnerNameLookup] = useState([]);
  const [currentName, setCurrentName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchAutoCompleteName = useCallback(async () => {
    const hasName = !isEmpty(currentName);
    if (hasName) {
      const getPartnerNameLookup = await axios.get(
        `${BASE_URL}/partner/autocomplete?name=${currentName}&type=partner_codes`
      );

      const moldData = getPartnerNameLookup?.data?.data.map((record) => ({
        label: record?.name,
        id: record?.id,
      }));

      setPartnerNameLookup(moldData);
    }
  }, [currentName]);

  useEffect(() => {
    fetchAutoCompleteName();
  }, [fetchAutoCompleteName, currentName]);

  const handleSubmit = () => {
    setIsLoading(true);
    const payload = {
      email,
      website,
      mobileNo,
      partnerCode,
      companyName,
      companyAddress,
    };

    if (isEdit) {
      handleEditPartnerCode({ ...payload, id: currentData?.id });

      return;
    }

    handleCreatePartner(payload);
  };

  console.log("[currentData]", currentData);

  const handleChange = (event) => {
    console.log("[event.target.name]", event.target.name);

    const isEmail = event.target.name === "email";
    if (isEmail) {
      setEmail(event.target.value);
    }

    const isMobileNo = event.target.name === "phone";
    if (isMobileNo) {
      setMobileNo(event.target.value);
    }

    // const isCompanyName = event.target.name === "company";
    // if (isCompanyName) {
    //   setCompanyName(event.target.value);
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

  const handleAutoCompleteName = debounce((event) => {
    console.log("[value]: ", event.target.value);
    const trimName = event.target.value.trim();

    setCurrentName(trimName);
    setCompanyName(trimName);
  }, 700);

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
                        label="Company name"
                        required={true}
                        fullWidth={true}
                      />
                    )}
                  />
                </Grid>

                {inputFormElements.slice(7, 8).map((input) => (
                  <Grid xs={input.xs} sm={input.sm} item>
                    <TextField
                      {...input}
                      defaultValue={currentData[`${input?.name}`]}
                      onChange={handleChange}
                    />
                  </Grid>
                ))}

                {inputFormElements.slice(5, 6).map((input) => (
                  <Grid xs={input.xs} sm={input.sm} item>
                    <TextField
                      {...input}
                      defaultValue={currentData[`${input?.name}`]}
                      onChange={handleChange}
                    />
                  </Grid>
                ))}

                {inputFormElements.slice(3, 4).map((input) => (
                  <Grid xs={input.xs} sm={input.sm} item>
                    <TextField
                      {...input}
                      defaultValue={currentData[`${input?.name}`]}
                      onChange={handleChange}
                    />
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
                      defaultValue={currentData["companyWebsite"]}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container item>
                <Grid xs={12} sm={12} item>
                  <FormControl fullWidth>
                    <TextField
                      name="partnerCode"
                      placeholder="Enter Partner code"
                      label="Partner Code"
                      variant="outlined"
                      fullWidth={true}
                      required={true}
                      xs={12}
                      sm={6}
                      defaultValue={currentData["partnerCode"]}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container item spacing={2}>
                <Grid item xs={12} align="right">
                  <Button
                    style={margin}
                    type="reset"
                    variant="outlined"
                    color="primary"
                  >
                    Clear
                  </Button>

                  <LoadingButton
                    color="primary"
                    variant="contained"
                    type="submit"
                    loading={isLoading}
                  >
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
