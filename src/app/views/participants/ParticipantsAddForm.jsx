import { Button, Checkbox, Icon } from "@mui/material";
import { Span } from "app/components/Typography";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import isEmpty from "lodash/isEmpty";
import dayjs from "dayjs";

import { faL } from "@fortawesome/free-solid-svg-icons";

const ParticipantsAddForm = ({ handleCreateParticipant }) => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState(null);
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [baranggay, setBaranggay] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [province, setProvince] = useState("");
  const [gender, setGender] = useState("");
  const [isPwd, setIsPwd] = useState(false);
  const [pwdStatus, setPwdStatus] = useState("");
  const [civilStatus, setCivilStatus] = useState("");

  const [isEqualPassword, setIsEqualPassword] = useState(true);

  useEffect(() => {
    const hasPassword = !isEmpty(password);
    const hasConfirmPassword = !isEmpty(confirmPassword);

    if (hasPassword && hasConfirmPassword) {
      setIsEqualPassword(password === confirmPassword);
    }
  }, [password, confirmPassword]);

  const handleSubmit = () => {
    console.log("[age]", dayjs().diff(birthday, "year"));

    handleCreateParticipant({
      email,
      first_name: firstName,
      last_name: lastName,
      middle_name: middleName,
      sex: gender,
      date_of_birth: birthday.format("DD/MM/YYYY"),
      age: dayjs().diff(birthday, "year"),
      address,
      civil_status: civilStatus,
      baranggay,
      municipality,
      province,
      pwd_status: pwdStatus,
      contact_number: mobileNumber,
    });
    console.log("[mock submit]");
  };

  const handleChange = (event) => {
    console.log("[name]", event.target.name);
    console.log("[value]", event.target.value);

    const isConfirmPassword = event?.target?.name === "confirmPassword";
    if (isConfirmPassword) {
      setConfirmPassword(event?.target?.value);
    }

    const isPassword = event?.target?.name === "password";
    if (isPassword) {
      setPassword(event?.target?.value);
    }

    const isFname = event?.target?.name === "firstName";
    if (isFname) {
      setFirstName(event?.target?.value);
    }

    const isMname = event?.target?.name === "middleName";
    if (isMname) {
      setMiddleName(event?.target?.value);
    }

    const isLname = event?.target?.name === "lastName";
    if (isLname) {
      setLastName(event?.target?.value);
    }

    const isEmail = event?.target?.name === "email";
    if (isEmail) {
      setEmail(event?.target?.value);
    }

    const isMobile = event?.target?.name === "mobile";
    if (isMobile) {
      setMobileNumber(event?.target?.value);
    }

    const isAddress = event?.target?.name === "address";
    if (isAddress) {
      setAddress(event?.target?.value);
    }

    const isBaranggay = event?.target?.name === "baranggay";
    if (isBaranggay) {
      setBaranggay(event?.target?.value);
    }

    const isMunicipality = event?.target?.name === "municipality";
    if (isMunicipality) {
      setMunicipality(event?.target?.value);
    }

    const isProvince = event?.target?.name === "province";
    if (isProvince) {
      setProvince(event?.target?.value);
    }

    const isGender = event?.target?.name === "gender";
    if (isGender) {
      setGender(event?.target?.value);
    }

    const isPwd = event?.target?.name === "isPwd";
    if (isPwd) {
      setIsPwd(event?.target?.value === "true");
    }

    const isPwdStatus = event?.target?.name === "pwdStatus";
    if (isPwdStatus) {
      setPwdStatus(event?.target?.value);
    }

    const isCivilStatus = event?.target?.name === "civilstatus";
    if (isCivilStatus) {
      setCivilStatus(event?.target?.value);
    }
  };

  const handleDateChange = (date) => {
    setBirthday(date);
  };

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Card>
          <CardContent>
            <Grid container rowSpacing={2}>
              <Grid item xs={12}>
                <TextField
                  sm={12}
                  type="text"
                  name="firstName"
                  label="First Name"
                  onChange={handleChange}
                  required={true}
                  fullWidth={true}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  sm={12}
                  type="text"
                  name="middleName"
                  label="Middle Name"
                  onChange={handleChange}
                  required={true}
                  fullWidth={true}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  sm={12}
                  type="text"
                  name="lastName"
                  label="Last Name"
                  onChange={handleChange}
                  required={true}
                  fullWidth={true}
                />
              </Grid>

              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    disableFuture
                    label="Brithday"
                    openTo="day"
                    views={["year", "month", "day"]}
                    value={birthday}
                    onChange={handleDateChange}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth={true} />
                    )}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  type="email"
                  name="email"
                  label="Email"
                  onChange={handleChange}
                  required={true}
                  fullWidth={true}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  type="number"
                  name="mobile"
                  label="Mobile Nubmer"
                  onChange={handleChange}
                  required={true}
                  fullWidth={true}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  error={!isEqualPassword}
                  name="password"
                  type="password"
                  label="Password"
                  onChange={handleChange}
                  required={true}
                  fullWidth={true}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  error={!isEqualPassword}
                  type="password"
                  name="confirmPassword"
                  onChange={handleChange}
                  label="Confirm Password"
                  required={true}
                  fullWidth={true}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  type="text"
                  name="address"
                  onChange={handleChange}
                  label="Lot Blk etc"
                  required={true}
                  fullWidth={true}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  type="text"
                  name="baranggay"
                  onChange={handleChange}
                  label="Baranggay"
                  required={true}
                  fullWidth={true}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  type="text"
                  name="municipality"
                  onChange={handleChange}
                  label="Municipality"
                  required={true}
                  fullWidth={true}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  type="text"
                  name="province"
                  onChange={handleChange}
                  label="Province"
                  required={true}
                  fullWidth={true}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Gender
                  </FormLabel>

                  <RadioGroup
                    row
                    name="gender"
                    sx={{ mb: 2 }}
                    // value={gender || ""}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="male"
                      label="Male"
                      labelPlacement="end"
                      control={<Radio color="secondary" />}
                    />

                    <FormControlLabel
                      value="female"
                      label="Female"
                      labelPlacement="end"
                      control={<Radio color="secondary" />}
                    />

                    <FormControlLabel
                      value="others"
                      label="Others"
                      labelPlacement="end"
                      control={<Radio color="secondary" />}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Is PWD?
                  </FormLabel>

                  <RadioGroup
                    row
                    name="isPwd"
                    sx={{ mb: 2 }}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value={true}
                      label="Yes"
                      labelPlacement="end"
                      control={<Radio color="secondary" />}
                    />

                    <FormControlLabel
                      value={false}
                      label="No"
                      labelPlacement="end"
                      control={<Radio color="secondary" />}
                    />
                  </RadioGroup>
                </FormControl>

                {isPwd && (
                  <FormControl fullWidth>
                    <FormLabel id="demo-simple-select-label">
                      PWD Status
                    </FormLabel>

                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      onChange={handleChange}
                      name="pwdStatus"
                    >
                      <MenuItem value={"difficulty_seeing"}>
                        Difficulty seeing
                      </MenuItem>

                      <MenuItem value={"difficulty_hearing"}>
                        Difficulty hearing
                      </MenuItem>

                      <MenuItem value={"difficulty_walking_climbing _steps"}>
                        Difficulty walking/climbing steps
                      </MenuItem>

                      <MenuItem value={"difficulty_remembreing_concentrating"}>
                        Difficulty remembreing/Concentrating
                      </MenuItem>

                      <MenuItem value={"difficulty_with_self_care"}>
                        Difficulty with self-care
                      </MenuItem>

                      <MenuItem value={"difficulty_communicating"}>
                        Difficulty communicating
                      </MenuItem>
                    </Select>
                  </FormControl>
                )}
              </Grid>

              <Grid item xs={12}>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Civil Status
                  </FormLabel>

                  <RadioGroup
                    row
                    name="civilstatus"
                    sx={{ mb: 2 }}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="single"
                      label="Single"
                      labelPlacement="end"
                      control={<Radio color="secondary" />}
                    />

                    <FormControlLabel
                      value="married"
                      label="Married"
                      labelPlacement="end"
                      control={<Radio color="secondary" />}
                    />

                    <FormControlLabel
                      value="widowed"
                      label="Widowed"
                      labelPlacement="end"
                      control={<Radio color="secondary" />}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <FormControlLabel
                control={<Checkbox />}
                label="I have read and agree to the terms of service."
              />
            </Grid>

            <Grid align="right">
              <Button color="primary" variant="contained" type="submit">
                <Icon>send</Icon>
                <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
              </Button>
            </Grid>
          </CardContent>
        </Card>
      </ValidatorForm>
    </div>
  );
};

export default ParticipantsAddForm;
