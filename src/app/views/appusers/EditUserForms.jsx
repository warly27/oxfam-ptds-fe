import React, { useEffect, useState, useCallback } from "react";
import { useTheme } from "@mui/material/styles";
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
import Chip from "@mui/material/Chip";

import Box from "@mui/material/Box";

import axios from "../../utils/axios";
import isEmpty from "lodash/isEmpty";
import defaultTo from "lodash/defaultTo";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const style = {
  width: "100%",
  bgcolor: "background.paper",
  borderRadius: 2,
  border: "1px solid #000",
  py: 1,
  px: 2,
  mt: 2,
};

const buttonStyle = {
  mt: 2,
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const EditUsersForms = ({ currentUser, handleEditUser }) => {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [userName, setUserName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fundSource, setFundSource] = useState("");
  const [partnerCode, setPartnerCode] = useState("");
  const [partnerId, setPartnerId] = useState("");
  const [projectCode, setProjectCode] = useState(null);

  const [partnerCodeLookup, setPartnerCodeLookup] = useState([]);
  const [partnerProjectList, setPartnerProjectList] = useState([]);
  const [currentSelectedProjects, setCurrentSelectedProjects] = useState({});
  const [currentDeletedProjects, setCurrentDeletedProjects] = useState({});
  const [currentAddedProjects, setCurrentAddedProjects] = useState({});

  const [currentPartnerProjectList, setCurrentPartnerProjectList] = useState(
    []
  );

  const [currentDeletedPartner, setCurrentDeletedPartner] = useState([]);
  const [partnerProject, setPartnerProject] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [password, setPassword] = useState("");

  const fetchPartnerCodeLookup = useCallback(async () => {
    const getPartnerCodeLookup = await axios.get(
      `${BASE_URL}/codes/getAllPartnerCodes`
    );

    setPartnerCodeLookup(getPartnerCodeLookup?.data?.data);
  }, []);

  const fetchAllPartnerProject = useCallback(async () => {
    const getAllCodesResult = await axios.get(
      `${BASE_URL}/project/getPartnerProject?type=partner_id&id=${partnerId}`
    );

    setPartnerProjectList(getAllCodesResult?.data?.data);
  }, [partnerId]);

  const fetchAllPartnerProjectUser = useCallback(async () => {
    const getAllPartnerProject = await Promise.all(
      currentUser?.partner.map((item) =>
        axios.get(
          `${BASE_URL}/project/getPartnerProject?type=partner_id&id=${item?.partner_id}`
        )
      )
    );

    const moldPartner = currentUser?.partner.map((item) => item?.partner_id);
    const moldProject = getAllPartnerProject.map((item) => item?.data?.data);

    const finalData = moldPartner.map((item, index) => ({
      id: item,
      projects: moldProject[index],
    }));

    setCurrentPartnerProjectList(finalData);
  }, [currentUser]);

  useEffect(() => {
    fetchPartnerCodeLookup();
  }, []);

  useEffect(() => {
    setFirstName(currentUser?.first_name);
    setLastName(currentUser?.last_name);
    setEmail(currentUser?.email);
    setFundSource(currentUser?.role);
    setPartnerProject(currentUser?.partner);
    setUserName(currentUser?.user_name);

    if (!isEmpty(currentUser)) {
      fetchAllPartnerProjectUser();
    }
  }, [currentUser, fetchAllPartnerProjectUser]);

  useEffect(() => {
    if (partnerId) {
      fetchAllPartnerProject();
    }
  }, [partnerId, fetchAllPartnerProject]);

  const handleChange = (event) => {
    const isFirstName = event.target.name === "first_name";
    if (isFirstName) {
      setFirstName(event.target.value);
    }

    const isLastName = event.target.name === "last_name";
    if (isLastName) {
      setLastName(event.target.value);
    }

    const isUsername = event.target.name === "user_name";
    if (isUsername) {
      setUserName(event.target.value);
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
  };

  const handleSubmit = () => {
    // const partnerIds = Object.keys(currentSelectedProjects);
    // console.log("[currentSelectedProjects]", currentSelectedProjects);

    // const moldAddedProject = partnerIds.map((record) => {
    //   const selected = currentSelectedProjects[record];
    //   const current = partnerProject.find(
    //     (item) => item?.partner_id === record
    //   );

    //   console.log("[selected]", selected);
    //   console.log("[current]", current?.projects);
    // });

    // console.log("moldAddedProject[]", moldAddedProject);

    // console.log("[edited details]: ", {
    //   email,
    //   first_name: firstName,
    //   last_name: lastName,
    //   user_partner_id: currentUser?.id,
    //   id: currentUser?.user_id,
    //   role: fundSource,
    //   projectCode,
    //   partner_id: partnerId,
    //   user_name: userName,
    //   deleted_partner: currentDeletedPartner,
    //   added_projects: currentAddedProjects,
    //   deleted_projects: currentDeletedProjects,
    // });

    setIsLoading(true);
    handleEditUser({
      email,
      first_name: firstName,
      last_name: lastName,
      user_partner_id: currentUser?.id,
      id: currentUser?.user_id,
      role: fundSource,
      projectCode,
      partner_id: partnerId,
      user_name: userName,
      deleted_partner: currentDeletedPartner,
      added_projects: currentAddedProjects,
      deleted_projects: currentDeletedProjects,
    });
  };

  const handleReset = () => {
    setFundSource("");
    setUserName("");
    setEmail("");
    setPassword("");
    setPartnerCode("");
  };

  const handleChangeProject = (event, partner_id) => {
    const currentValue = partnerProject.find(
      (item) => item?.partner_id === partner_id
    );

    const currentProject = currentValue.projects.filter((data) => data !== "");

    console.log("[currentProject]", currentProject);
    console.log("[event?.target?.value]", event?.target?.value);

    const hasProjects = !isEmpty(event?.target?.value);

    if (!hasProjects) {
      setCurrentDeletedProjects((data) => ({
        [partner_id]: currentProject,
        ...data,
      }));
    }

    if (hasProjects) {
      const filterAdded = defaultTo(event?.target?.value, []).filter((data) => {
        const findItem = currentProject.find((record) => record === data);
        return isEmpty(findItem);
      });

      const hasItem = !isEmpty(filterAdded);

      if (hasItem) {
        setCurrentAddedProjects((data) => ({
          [partner_id]: filterAdded,
          ...data,
        }));
      }

      const filterDeleted = defaultTo(currentProject, []).filter((data) => {
        const findItem = event?.target?.value.find((record) => record === data);
        return isEmpty(findItem);
      });

      const hasDeletedItem = !isEmpty(filterDeleted);

      if (hasDeletedItem) {
        setCurrentDeletedProjects((data) => ({
          [partner_id]: filterDeleted,
          ...data,
        }));
      }
    }

    setCurrentSelectedProjects((item) => ({
      ...item,
      [partner_id]: event?.target?.value,
    }));
  };

  const handleDeletePartner = (data) => {
    setPartnerProject((list) => {
      const filterList = list.filter((item) => item?.partner_id !== data);

      return filterList;
    });

    setCurrentDeletedPartner((partner) => [...partner, data]);
  };

  const isPartner = fundSource === "partner";

  console.log("[currentUser]", currentUser);

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Card>
          <CardContent>
            {/* <form> */}
            <Grid container rowSpacing={2}>
              <Grid container item spacing={2}>
                <Grid container item spacing={2}>
                  {inputFormElements.slice(0, 4).map((input) => (
                    <Grid xs={input.xs} sm={input.sm} item>
                      <TextField
                        defaultValue={currentUser[`${input?.name}`]}
                        {...input}
                        onChange={handleChange}
                      />
                    </Grid>
                  ))}
                </Grid>

                <Grid container item>
                  <Grid xs={12} sm={12} item>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        User Role *
                      </InputLabel>

                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={fundSource}
                        label="User Role*"
                        onChange={handleChange}
                        name="fundSource"
                      >
                        <MenuItem value={"admin"}>Admin</MenuItem>
                        <MenuItem value={"partner"}>Partner</MenuItem>
                        <MenuItem value={"melsa"}>Melsa</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              {!isEmpty(currentPartnerProjectList) &&
                partnerProject.map((item, index) => {
                  const selectedItems = item?.projects.filter(
                    (data) => data !== ""
                  );

                  return (
                    <Box sx={style}>
                      <h4>{item?.parnter_code}</h4>

                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Project *
                        </InputLabel>

                        <Select
                          labelId="demo-multiple-chip-label"
                          id="demo-multiple-chip"
                          multiple
                          name="projects"
                          value={
                            currentSelectedProjects[item?.partner_id] ||
                            selectedItems
                          }
                          onChange={(event) =>
                            handleChangeProject(event, item?.partner_id)
                          }
                          label="Project *"
                          renderValue={(selected) => (
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                              }}
                            >
                              {selected.map((value) => {
                                const findData = currentPartnerProjectList[
                                  index
                                ].projects.find(
                                  (listItem) => listItem?.project_id === value
                                );

                                return (
                                  <Chip
                                    key={findData?.project_id}
                                    label={findData?.project_code}
                                  />
                                );
                              })}
                            </Box>
                          )}
                        >
                          {defaultTo(
                            currentPartnerProjectList[index].projects,
                            []
                          ).map((item) => (
                            <MenuItem
                              key={item?.project_id}
                              value={item?.project_id}
                              style={getStyles(
                                item?.project_id,
                                currentPartnerProjectList[index].projects,
                                theme
                              )}
                            >
                              {item?.project_code}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <Button
                        color="primary"
                        variant="outlined"
                        sx={buttonStyle}
                        onClick={() => handleDeletePartner(item?.partner_id)}
                        fullWidth
                      >
                        Delete Partner
                      </Button>
                    </Box>
                  );
                })}

              {isPartner && (
                <Grid container item rowSpacing={2}>
                  <b>Add Partner/Project</b>

                  <Grid xs={12} sm={12} item>
                    <FormControl fullWidth>
                      <InputLabel id="partner-code-select-label">
                        Partner Code
                      </InputLabel>

                      <Select
                        labelId="partner-code-select-label"
                        id="partner-code-select"
                        value={partnerCode}
                        label="Partner Code"
                        onChange={handleChange}
                        name="partnerCode"
                      >
                        {partnerCodeLookup.map((data) => (
                          <MenuItem value={data?.code}>{data?.code}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid xs={12} sm={12} item>
                    <FormControl fullWidth>
                      <InputLabel id="project-code-select-label">
                        Project Name
                      </InputLabel>

                      <Select
                        labelId="project-code-select-label"
                        id="project-code-select"
                        value={projectCode}
                        label="Project Name"
                        onChange={handleChange}
                        name="projectCode"
                        displayEmpty
                      >
                        {partnerProjectList.map((data) => (
                          <MenuItem value={data?.project_id}>
                            {data?.project_title}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              )}

              <Grid container item>
                <Grid item xs={12} align="right">
                  <LoadingButton
                    color="primary"
                    variant="contained"
                    type="submit"
                    loading={isLoading}
                    fullWidth
                  >
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

export default EditUsersForms;
