import { Span } from "app/components/Typography";
import { useState, useEffect, useCallback, forwardRef } from "react";
import { ValidatorForm } from "react-material-ui-form-validator";
import { inputFormElements } from "app/components/FormElement";
import { makeStyles } from "@material-ui/core/styles";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import axios from "../../../utils/axios";

import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { isEmpty } from "lodash";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BASE_URL = process.env.REACT_APP_BASE_URL;

const ProjectsAddFrom = ({ handleCreateProject }) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [budget, setBudget] = useState("");
  const [fund_source, setFundSource] = useState("");
  const [start_date, setStartDate] = useState(null);
  const [end_date, setEndDate] = useState(null);
  const [type, setType] = useState("");
  const [partner_id, setPartner_id] = useState("");
  const [partnersCodeData, setPartnersCodeData] = useState([]);

  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchAllPartners = useCallback(async () => {
    const getPartnersCodeResult = await axios.get(
      `${BASE_URL}/codes/getAllPartnerCodes`
    );
    setPartnersCodeData(getPartnersCodeResult?.data?.data);
  }, []);

  useEffect(() => {
    fetchAllPartners();
  }, [fetchAllPartners]);

  const handleChange = (event) => {
    const isTitle = event.target.name === "title";
    if (isTitle) {
      setTitle(event.target.value);
    }

    const isName = event.target.name === "name";
    if (isName) {
      setName(event.target.value);
    }

    const isCode = event.target.name === "code";
    if (isCode) {
      setCode(event.target.value);
    }

    const isDescription = event.target.name === "description";
    if (isDescription) {
      setDescription(event.target.value);
    }

    const isPortfolio = event.target.name === "portfolio";
    if (isPortfolio) {
      setPortfolio(event.target.value);
    }

    const isFundSource = event.target.name === "fundSource";
    if (isFundSource) {
      setFundSource(event.target.value);
    }

    const isBudget = event.target.name === "budget";
    if (isBudget) {
      setBudget(event.target.value);
    }

    const isType = event.target.name === "type";
    if (isType) {
      setType(event.target.value);
    }

    const isPartnerId = event.target.name === "partner_id";
    if (isPartnerId) {
      setPartner_id(event.target.value);
    }
  };

  const handleSubmit = () => {
    const hasStartDate = !isEmpty(start_date);

    if (!hasStartDate) {
      setHasError(true);
      setErrorMessage("Start date is required!");

      return;
    }

    const hasEndDate = !isEmpty(end_date);
    if (!hasEndDate) {
      setHasError(true);
      setErrorMessage("End date is required!");

      return;
    }

    handleCreateProject({
      name,
      code,
      description,
      title,
      portfolio,
      budget,
      fund_source,
      start_date: start_date?.$d,
      end_date: end_date?.$d,
      type,
      partner_id,
    });
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleCloseError = () => {
    setHasError(false);
  };

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Card style={{ maxWidth: 600, margin: "0 auto" }}>
          <CardContent>
            <Grid container rowSpacing={2}>
              <Grid container item spacing={1}>
                <Grid xs={12} sm={12} item>
                  <TextField
                    name="code"
                    placeholder="Enter project code"
                    label="Project Code"
                    variant="outlined"
                    fullWidth={true}
                    required={true}
                    xs={12}
                    sm={12}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>

              <Grid container item spacing={1}>
                {inputFormElements.slice(14, 18).map((input) => (
                  <Grid xs={input.xs} sm={input.sm} item>
                    <TextField {...input} onChange={handleChange} />
                  </Grid>
                ))}
              </Grid>

              <Grid xs={12} sm={12} item>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Project Protfoilio
                  </InputLabel>

                  <Select
                    required={true}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={portfolio}
                    label="Project Protfoilio"
                    name="portfolio"
                    onChange={handleChange}
                  >
                    <MenuItem value={"resilience"}>Resilience</MenuItem>
                    <MenuItem value={"gender_justice"}>Gender Justice</MenuItem>
                    <MenuItem value={"humanitarian"}>Humanitarian</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid xs={12} sm={12} item>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Project Type
                  </InputLabel>

                  <Select
                    required={true}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    label="Project Type"
                    name="type"
                    onChange={handleChange}
                  >
                    <MenuItem value={"development"}>Development</MenuItem>
                    <MenuItem value={"humanitarian"}>Humanitarian</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid container item spacing={1}>
                <Grid xs={12} sm={12} item>
                  <TextField
                    name="fundSource"
                    placeholder="Enter project fund source"
                    label="Project Fund Source"
                    variant="outlined"
                    fullWidth={true}
                    required={true}
                    xs={12}
                    sm={12}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>

              <Grid container item spacing={1}>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        disablePast
                        label="Start Date"
                        openTo="day"
                        views={["year", "month", "day"]}
                        value={start_date}
                        onChange={handleStartDateChange}
                        required={true}
                        renderInput={(params) => (
                          <TextField {...params} fullWidth={true} />
                        )}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        disablePast
                        label="End Date"
                        openTo="day"
                        views={["year", "month", "day"]}
                        value={end_date}
                        onChange={handleEndDateChange}
                        required={true}
                        renderInput={(params) => (
                          <TextField {...params} fullWidth={true} />
                        )}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={12} item>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Partner
                    </InputLabel>

                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={partner_id}
                      label="Partner"
                      name="partner_id"
                      required={true}
                      onChange={handleChange}
                    >
                      {partnersCodeData.map((item) => (
                        <MenuItem value={item?.id}>{item?.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container item spacing={1}>
                <Grid item xs={12} align="right">
                  <Button color="primary" variant="contained" type="submit">
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

      <Snackbar
        open={hasError}
        autoHideDuration={3000}
        onClose={handleCloseError}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProjectsAddFrom;
