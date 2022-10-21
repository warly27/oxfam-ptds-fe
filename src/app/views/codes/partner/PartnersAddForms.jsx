import React, { useState } from "react";

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

import LoadingButton from "@mui/lab/LoadingButton";

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

  const [isLoading, setIsLoading] = useState(false);

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

    const isWebsite = event.target.name === "companyWebsite";
    if (isWebsite) {
      setWebsite(event.target.value);
    }
  };

  const margin = { margin: "0 5px" };

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Card>
          <CardContent>
            <Grid container rowSpacing={2}>
              <Grid container item spacing={2}>
                {inputFormElements.slice(3, 4).map((input) => (
                  <Grid xs={input.xs} sm={input.sm} item>
                    <TextField
                      {...input}
                      defaultValue={currentData[`${input?.name}`]}
                      onChange={handleChange}
                    />
                  </Grid>
                ))}

                {inputFormElements.slice(5, 8).map((input) => (
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
