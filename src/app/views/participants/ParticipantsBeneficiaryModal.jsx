import React, { useRef, useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Span } from "app/components/Typography";
import { ValidatorForm } from "react-material-ui-form-validator";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import LoadingButton from "@mui/lab/LoadingButton";

import dayjs from "dayjs";

const ParticipantBeneficiaryModal = ({
  showChildModal,
  setShowChildModal,
  numberOfBeneficiary,
  setBeneficiariesData,
}) => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState(null);
  const [mobileNumber, setMobileNumber] = useState("");
  const [gender, setGender] = useState("");
  const [civil_status, setCivilStatus] = useState("");

  const [relationship, setRelationship] = useState("");
  const [source_of_income, setSourceOfIncome] = useState("");
  const [nature_of_work, setNatureOfWork] = useState("");
  const [vulnerability, setVulnerability] = useState("");
  const [primary_id, setPrimaryId] = useState("");
  const [id_number, setIdNumber] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [beneficiaries, setBeneficiaries] = useState([]);

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

    const isMobile = event?.target?.name === "mobile";
    if (isMobile) {
      setMobileNumber(event?.target?.value);
    }

    const isGender = event?.target?.name === "gender";
    if (isGender) {
      setGender(event?.target?.value);
    }

    const isCivilStatus = event?.target?.name === "civil_status";
    if (isCivilStatus) {
      setCivilStatus(event?.target?.value);
    }

    const isRelationship = event?.target?.name === "relationship";
    if (isRelationship) {
      setRelationship(event?.target?.value);
    }

    const isNatureOfWork = event?.target?.name === "nature_of_work";
    if (isNatureOfWork) {
      setNatureOfWork(event?.target?.value);
    }

    const isVulnerability = event?.target?.name === "vulnerability";
    if (isVulnerability) {
      setVulnerability(event?.target?.value);
    }

    const isPrimaryId = event?.target?.name === "primary_id";
    if (isPrimaryId) {
      setPrimaryId(event?.target?.value);
    }

    const isIdNumber = event?.target?.name === "id_number";
    if (isIdNumber) {
      setIdNumber(event?.target?.value);
    }

    const isSourceOfIncome = event?.target?.name === "source_of_income";
    if (isSourceOfIncome) {
      setSourceOfIncome(event?.target?.value);
    }
  };

  const handleSubmit = () => {
    console.log("[beneficiaries]:", beneficiaries);
    setBeneficiariesData(beneficiaries);
    setShowChildModal(false);
  };

  const handleDateChange = (date) => {
    setBirthday(date);
  };

  const handleNext = () => {
    setBeneficiaries((benficiary) => [
      {
        first_name: firstName,
        last_name: lastName,
        middle_name: middleName,
        gender,
        date_of_birth: birthday.format("DD/MM/YYYY"),
        age: dayjs().diff(birthday, "year"),
        civil_status,
        relationship,
        source_of_income,
        nature_of_work,
        vulnerability,
        mobile_wallet: mobileNumber,
        primary_id,
        id_number,
        id_img_location: "",
      },
      ...benficiary,
    ]);
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
                          name="first_name"
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
                          name="middle_name"
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
                          name="last_name"
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
                            <MenuItem value={"single"}>Single</MenuItem>
                            <MenuItem value={"married"}>Married</MenuItem>
                            <MenuItem value={"divorced"}>Divorced</MenuItem>
                            <MenuItem value={"separated"}>Separated</MenuItem>
                            <MenuItem value={"living_with_common_law_partner"}>
                              Living with common-law partner
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

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
                        <FormControl fullWidth>
                          <FormLabel id="demo-simple-select-label">
                            Mobile Wallet
                          </FormLabel>

                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={handleChange}
                            name="mobile"
                          >
                            <MenuItem value={"maya"}>Maya</MenuItem>
                            <MenuItem value={"gcash"}>Gcash</MenuItem>
                            <MenuItem value={"grabpay"}>GrabPay</MenuItem>
                            <MenuItem value={"paypal"}>PayPal</MenuItem>
                            <MenuItem value={"dragonpay"}>DragonPay</MenuItem>
                            <MenuItem value={"Others"}>Others</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <FormLabel id="demo-simple-select-label">
                            Relationship
                          </FormLabel>

                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={handleChange}
                            name="relationship"
                          >
                            <MenuItem value={"married"}>Married</MenuItem>
                            <MenuItem value={"living_with_common_law_partner"}>
                              Living with common-law partner
                            </MenuItem>
                            <MenuItem value={"separated"}>Separated</MenuItem>
                            <MenuItem value={"divorced"}>Divorced</MenuItem>
                            <MenuItem value={"single"}>Single</MenuItem>
                          </Select>
                        </FormControl>
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

                      <Grid item xs={12}>
                        <TextField
                          type="text"
                          name="source_of_income"
                          onChange={handleChange}
                          label="Source of income"
                          required={true}
                          fullWidth={true}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <FormLabel id="demo-simple-select-label">
                            Vulnerability
                          </FormLabel>

                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={handleChange}
                            name="vulnerability"
                          >
                            <MenuItem value={"single_parent"}>
                              Single Parent
                            </MenuItem>
                            <MenuItem value={"child_headed"}>
                              Child Headed
                            </MenuItem>
                            <MenuItem value={"lactating"}>Lactating</MenuItem>
                            <MenuItem value={"PWD"}>PWD</MenuItem>
                            <MenuItem value={"senior_citizen"}>
                              Senior Citizen
                            </MenuItem>
                            <MenuItem value={"chronically_II"}>
                              Chronically II
                            </MenuItem>
                            <MenuItem value={"living_along_danger_zones"}>
                              Living along danger zones
                            </MenuItem>
                            <MenuItem value={"none"}>None</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <FormLabel id="demo-simple-select-label">
                            Primary ID
                          </FormLabel>

                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={handleChange}
                            name="primary_id"
                          >
                            <MenuItem value={"passport"}>
                              Philippine Passport
                            </MenuItem>
                            <MenuItem value={"sss"}>
                              Social Security System (SSS) Card
                            </MenuItem>
                            <MenuItem value={"gsis"}>
                              Government Service Insurance System (GSIS) Card
                            </MenuItem>
                            <MenuItem value={"umid"}>
                              Unified Multi-Purpose Identification (UMID) Card
                            </MenuItem>
                            <MenuItem value={"driver_license"}>
                              Driver's License
                            </MenuItem>
                            <MenuItem value={"prc"}>
                              Professional Regulatory Commission (PRC) ID
                            </MenuItem>
                            <MenuItem value={"postalid"}>Postal ID</MenuItem>
                            <MenuItem value={"studentid"}>Student ID</MenuItem>
                            <MenuItem value={"others"}>Others</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          type="text"
                          name="id_number"
                          onChange={handleChange}
                          label="ID number"
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
                        type={
                          numberOfBeneficiary === currentPage
                            ? "submit"
                            : "reset"
                        }
                        loading={isLoading}
                        fullWidth
                        onClick={handleNext}
                      >
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
