import React, { useEffect, useState, useCallback } from "react";
import { Span } from "app/components/Typography";
import { ValidatorForm } from "react-material-ui-form-validator";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Icon from "@mui/material/Icon";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import axios from "../../utils/axios";
import { isEmpty } from "lodash";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const AppActivityForms = ({ handleCreateActivity }) => {
  const [state, setState] = useState({ date: null });
  const [fund_source, setFundSource] = useState("");
  const [project_code, setProjectCode] = useState("");
  const [user_id, setUserId] = useState("");
  const [projectCodeLookup, setProjectCodeLookup] = useState([]);
  const [partnerList, setPartnerList] = useState([]);

  const [currentUser, setCurrentUser] = useState({});

  const fetchProjectCodeLookup = useCallback(async () => {
    const getAllCodesResult = await axios.get(
      `${BASE_URL}/project/getPartnerProject?type=partner_id&id=${currentUser?.partner_id}`
    );

    setProjectCodeLookup(getAllCodesResult?.data?.data);
  }, [currentUser]);

  const fetchAllPartners = useCallback(async () => {
    const getAllUsersResult = await axios.get(
      `${BASE_URL}/partner/getAllPartners`
    );
    setPartnerList(getAllUsersResult?.data?.data);
  }, []);

  useEffect(() => {
    fetchAllPartners();
  }, [fetchAllPartners]);

  useEffect(() => {
    if (!isEmpty(currentUser)) {
      fetchProjectCodeLookup();
    }
  }, [currentUser, fetchProjectCodeLookup]);

  const handleChange = (event) => {
    const isFundSource = event.target.name === "fund_source";
    if (isFundSource) {
      setFundSource(event.target.value);
      setProjectCode(
        projectCodeLookup.find(
          (item) => item?.project_id === event.target.value
        )?.project_code
      );
      return;
    }

    const isUserId = event.target.name === "user_id";
    if (isUserId) {
      setUserId(event.target.value);

      setCurrentUser(
        partnerList.find((data) => data?.user_id === event.target.value)
      );
      return;
    }

    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    console.log("[state]", state);

    handleCreateActivity({
      ...state,
      project_id: fund_source,
      user_id,
      project_code,
    });
  };

  const handleDateChange = (date) => {
    setState((data) => ({ ...data, date: date?.$d }));
  };

  const margin = { margin: "0 5px" };

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid style={{ padding: "10px 5px 0 5px" }}>
          <Card style={{ minWidth: 500, margin: "0 auto" }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid xs={12} sm={12} item>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      User Partner
                    </InputLabel>

                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={user_id}
                      label="User Partner"
                      onChange={handleChange}
                      name="user_id"
                    >
                      {partnerList.map((data) => (
                        <MenuItem
                          value={data?.user_id}
                        >{`${data?.first_name} ${data?.last_name}`}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={12} item>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Project
                    </InputLabel>

                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={fund_source}
                      label="Project"
                      onChange={handleChange}
                      name="fund_source"
                    >
                      {projectCodeLookup.map((data) => (
                        <MenuItem value={data?.project_id}>
                          {data?.project_title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <TextField
                    type="text"
                    name="title"
                    onChange={handleChange}
                    label="Title"
                    required={true}
                    fullWidth={true}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <TextField
                    type="text"
                    name="description"
                    onChange={handleChange}
                    label="Description"
                    required={true}
                    fullWidth={true}
                  />
                </Grid>

                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      disablePast
                      label="Date"
                      openTo="day"
                      views={["year", "month", "day"]}
                      value={state?.date}
                      onChange={handleDateChange}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth={true} />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <TextField
                    type="text"
                    name="venue"
                    onChange={handleChange}
                    label="Venue"
                    required={true}
                    fullWidth={true}
                  />
                </Grid>
              </Grid>

              <br />

              <Grid container spacing={1}>
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
            </CardContent>
          </Card>
        </Grid>
      </ValidatorForm>
    </div>
  );
};

export default AppActivityForms;
