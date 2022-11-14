import React, { useEffect, useState, useCallback } from "react";
import { Span } from "app/components/Typography";
import { ValidatorForm } from "react-material-ui-form-validator";
import { inputFormElements } from "app/components/FormElement";

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

const AppUsersForms = ({ handleCreateUser, currentUser, handleEditUser }) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [fundSource, setFundSource] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [partnerCode, setPartnerCode] = useState("");
  const [partnerId, setPartnerId] = useState("");
  const [projectCode, setProjectCode] = useState("");

  const [partnerCodeLookup, setPartnerCodeLookup] = useState([]);
  const [partnerProjectList, setPartnerProjectList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  // const fetchPartnerCodeLookup = useCallback(async () => {
  //   const getPartnerCodeLookup = await axios.get(
  //     `${BASE_URL}/codes/getAllPartnerCodes`
  //   );

  //   setPartnerCodeLookup(getPartnerCodeLookup?.data?.data);
  // }, []);

  // const fetchAllPartnerProject = useCallback(async () => {
  //   const getAllCodesResult = await axios.get(
  //     `${BASE_URL}/project/getPartnerProject?type=partner_id&id=${partnerId}`
  //   );

  //   setPartnerProjectList(getAllCodesResult?.data?.data);
  // }, [partnerId]);

  useEffect(() => {
    // fetchPartnerCodeLookup();
    setFirstName(currentUser?.first_name);
    setLastName(currentUser?.last_name);
    setEmail(currentUser?.email);
  }, [currentUser]);

  // useEffect(() => {
  //   if (partnerId) {
  //     fetchAllPartnerProject();
  //   }
  // }, [partnerId, fetchAllPartnerProject]);

  const handleChange = (event) => {
    const isFirstName = event.target.name === "first_name";
    if (isFirstName) {
      setFirstName(event.target.value);
    }

    const isLastName = event.target.name === "last_name";
    if (isLastName) {
      setLastName(event.target.value);
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

      const findId = partnerCodeLookup.find(
        (item) => item.code === event.target.value
      );

      setPartnerId(findId?.id);
    }

    const isProjectCode = event.target.name === "projectCode";
    if (isProjectCode) {
      setProjectCode(event.target.value);
    }

    console.log("[event.target]", event.target);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    handleEditUser({
      email,
      first_name: firstName,
      last_name: lastName,
      id: currentUser?.id,
    });
  };

  const handleReset = () => {
    setFundSource("");
    setUserName("");
    setEmail("");
    setPassword("");
    setPartnerCode("");
  };

  const margin = { margin: "0 5px" };

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Card>
          <CardContent>
            {/* <form> */}
            <Grid container rowSpacing={2}>
              <Grid container item spacing={2}>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="first_name"
                      placeholder="Enter First Name"
                      label="First Name"
                      variant="outlined"
                      fullWidth={true}
                      required={true}
                      xs={12}
                      sm={6}
                      defaultValue={currentUser["first_name"]}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="last_name"
                      placeholder="Enter Last Name"
                      label="Last Name"
                      variant="outlined"
                      fullWidth={true}
                      required={true}
                      xs={12}
                      sm={6}
                      defaultValue={currentUser["last_name"]}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={12} item>
                  <FormControl fullWidth>
                    <TextField
                      name="email"
                      placeholder="Enter Email"
                      label="Email"
                      variant="outlined"
                      fullWidth={true}
                      required={true}
                      xs={12}
                      sm={12}
                      defaultValue={currentUser["email"]}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>

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
                      Edit
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
