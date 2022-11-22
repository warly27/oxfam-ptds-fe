import React, { useState } from "react";

import { Span } from "app/components/Typography";
import { ValidatorForm } from "react-material-ui-form-validator";

import FormControl from "@mui/material/FormControl";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import LoadingButton from "@mui/lab/LoadingButton";

const IndicatorAddForms = ({ handleCreatePartner }) => {
  const [companyName, setCompanyName] = useState("");
  const [partnerCode, setPartnerCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);

    const payload = {
      code: partnerCode,
      name: companyName,
    };

    handleCreatePartner(payload);
  };

  const handleChange = (event) => {
    console.log("[event.target.name]", event.target.name);

    const isCompanyName = event.target.name === "company";
    if (isCompanyName) {
      setCompanyName(event.target.value);
    }

    const isPartnerCode = event.target.name === "partnerCode";
    if (isPartnerCode) {
      setPartnerCode(event.target.value);
    }
  };

  const margin = { margin: "0 5px" };

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Card>
          <CardContent>
            <Grid container rowSpacing={2}>
              <Grid container item>
                <Grid xs={12} sm={12} item>
                  <FormControl fullWidth>
                    <TextField
                      name="company"
                      placeholder="Enter indicator name"
                      label="Indicator Name"
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
                    <TextField
                      name="partnerCode"
                      placeholder="Enter Indicator code"
                      label="Indicator Code"
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

export default IndicatorAddForms;
