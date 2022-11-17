import React, { useRef, useEffect, useState, useCallback } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Checkbox, Icon } from "@mui/material";
import { Span } from "app/components/Typography";
import { ValidatorForm } from "react-material-ui-form-validator";

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
import Autocomplete from "@mui/material/Autocomplete";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import LoadingButton from "@mui/lab/LoadingButton";

import isEmpty from "lodash/isEmpty";
import dayjs from "dayjs";

const ParticipantBeneficiaryModal = ({ showChildModal, setShowChildModal }) => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState(null);
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [isPwd, setIsPwd] = useState(false);
  const [pwdStatus, setPwdStatus] = useState("");
  const [civil_status, setCivilStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setShowChildModal((prev) => !prev);
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (showChildModal) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [showChildModal]);

  const handleChange = (event) => {
    console.log("[name]", event.target.name);
    console.log("[value]", event.target.value);

    const isFname = event?.target?.name === "first_name";
    if (isFname) {
      setFirstName(event?.target?.value);
    }

    const isMname = event?.target?.name === "middle_name";
    if (isMname) {
      setMiddleName(event?.target?.value);
    }

    const isLname = event?.target?.name === "last_name";
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

  const handleSubmit = () => {
    // setIsLoading(true);
    // const findRegion = regionList.find((record) => record?.id === region);
    // const findProvince = provinceList.find((record) => record?.id === province);
    // console.log("[findProvince]", findProvince);
    // console.log("[payload]: ", {
    //   email,
    //   first_name: firstName,
    //   last_name: lastName,
    //   middle_name: middleName,
    //   sex: gender,
    //   date_of_birth: birthday.format("DD/MM/YYYY"),
    //   age: dayjs().diff(birthday, "year"),
    //   address,
    //   civil_status: civilStatus,
    //   baranggay,
    //   municipality,
    //   province: findProvince?.name,
    //   pwd_status: pwdStatus,
    //   contact_number: mobileNumber,
    // });
  };

  const handleDateChange = (date) => {
    setBirthday(date);
  };

  return (
    <div>
      <Dialog
        open={showChildModal}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Add Beneficiary</DialogTitle>
        <DialogContent dividers>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
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
                          type="number"
                          name="mobile"
                          label="Mobile Nubmer"
                          onChange={handleChange}
                          required={true}
                          fullWidth={true}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <FormLabel id="demo-radio-buttons-group-label">
                            Civil Status
                          </FormLabel>

                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={handleChange}
                            name="civil_status"
                          >
                            <MenuItem value={"ingle"}>Single</MenuItem>
                            <MenuItem value={"married"}>Married</MenuItem>
                            <MenuItem value={"divorced"}>Divorced</MenuItem>
                            <MenuItem value={"separated"}>Separated</MenuItem>
                            <MenuItem value={"living_with_common_law_partner"}>
                              Living with common-law partner
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      {/* <Grid item xs={12}>
                        <TextField
                          type="email"
                          name="email"
                          label="Email"
                          onChange={handleChange}
                          required={true}
                          fullWidth={true}
                        />
                      </Grid> */}

                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <FormLabel id="demo-simple-select-label">
                            Gender
                          </FormLabel>

                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={handleChange}
                            name="gender"
                          >
                            <MenuItem value={"male"}>Male</MenuItem>
                            <MenuItem value={"female"}>Female</MenuItem>
                            <MenuItem value={"lesbian"}>Lesbian</MenuItem>
                            <MenuItem value={"bisexual"}>Bisexual</MenuItem>
                            <MenuItem value={"gay"}>Gay</MenuItem>
                            <MenuItem value={"transgender"}>
                              Transgender
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          type="text"
                          name="relationship"
                          onChange={handleChange}
                          label="Relationship"
                          required={true}
                          fullWidth={true}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          type="text"
                          name="nature_of_work"
                          onChange={handleChange}
                          label="Nature of work"
                          required={true}
                          fullWidth={true}
                        />
                      </Grid>
                    </Grid>

                    <br />

                    <Grid align="right">
                      <LoadingButton
                        color="primary"
                        variant="contained"
                        type="submit"
                        loading={isLoading}
                        fullWidth
                      >
                        <Icon>send</Icon>
                        <Span sx={{ pl: 1, textTransform: "capitalize" }}>
                          ADD
                        </Span>
                      </LoadingButton>
                    </Grid>
                  </CardContent>
                </Card>
              </ValidatorForm>
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ParticipantBeneficiaryModal;
