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

const PartnersAddForms = ({ handleCreatePartner, partnerId }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [user_name, setUserName] = useState("");
  const [partnerCode, setPartnerCode] = useState("");
  const [projectCode, setProjectCode] = useState("");

  const [projectCodeLookup, setProjectCodeLookup] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const fetchPartnerCodeLookup = useCallback(async () => {
    const getAllCodesResult = await axios.get(
      `${BASE_URL}/project/getPartnerProject?type=partner_id&id=${partnerId}`
    );

    setProjectCodeLookup(getAllCodesResult?.data?.data);
  }, []);

  useEffect(() => {
    fetchPartnerCodeLookup();
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);

    handleCreatePartner({
      project_id: projectCode,
    });
  };

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

    const isFirstName = event.target.name === "firstName";
    if (isFirstName) {
      setFirstName(event.target.value);
    }

    const isLastName = event.target.name === "lastName";
    if (isLastName) {
      setLastName(event.target.value);
    }

    const isPartnerCode = event.target.name === "partnerCode";
    if (isPartnerCode) {
      setPartnerCode(event.target.value);
    }

    const isUsername = event.target.name === "userName";
    if (isUsername) {
      setUserName(event.target.value);
    }

    const isProject = event.target.name === "projectCode";
    if (isProject) {
      setProjectCode(event.target.value);
    }
  };

  const margin = { margin: "0 5px" };

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Card style={{ minWidth: 400, maxWidth: 600, margin: "0 auto" }}>
          <CardContent>
            <Grid container rowSpacing={2}>
              <Grid container item>
                <Grid xs={12} sm={12} item>
                  <FormControl fullWidth>
                    <InputLabel id="project-code-select-label">
                      Project
                    </InputLabel>

                    <Select
                      labelId="project-code-select-label"
                      id="project-code-select"
                      value={projectCode}
                      label="Project Code"
                      onChange={handleChange}
                      name="projectCode"
                    >
                      {projectCodeLookup.map((data) => (
                        <MenuItem value={data?.project_id}>
                          {data?.project_title}
                        </MenuItem>
                      ))}
                    </Select>
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
