import React, { useState, useRef, useEffect, useCallback } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@material-ui/core";

import { ValidatorForm } from "react-material-ui-form-validator";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import axios from "../../utils/axios";
import useAuth from "../../hooks/useAuth";
import Autocomplete from "@mui/material/Autocomplete";

import { Span } from "app/components/Typography";
import isEmpty from "lodash/isEmpty";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const AddModal = ({
  showAddModal,
  setShowAddModal,
  handleLinkParticipant,
  currentId,
}) => {
  const { user } = useAuth();
  const [projectId, setProjectId] = useState("");
  const [partnerList, setPartnerList] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [user_id, setUserId] = useState("");
  const [participantsData, setParticipantsData] = useState([]);
  const [direct_participant_id, setParticipantId] = useState(null);

  const isAdmin = user?.role === "admin";

  const descriptionElementRef = useRef(null);

  const fetchAllPartners = useCallback(async () => {
    const getAllUsersResult = await axios.get(
      `${BASE_URL}/partner/getAllPartners`
    );
    setPartnerList(getAllUsersResult?.data?.data);
  }, []);

  const fetchProjectCodeLookup = useCallback(async () => {
    const getAllCodesResult = await axios.get(
      `${BASE_URL}/project/getPartnerProject?type=partner_id&id=${currentUser?.partner_id}`
    );

    setProjectList(getAllCodesResult?.data?.data);
  }, [currentUser]);

  const fetchParticipantsData = useCallback(async () => {
    const getAllUsersResult = await axios.get(`${BASE_URL}/participants`);

    setParticipantsData(getAllUsersResult?.data?.data);
  }, []);

  useEffect(() => {
    fetchAllPartners();
    fetchParticipantsData();
  }, [fetchAllPartners, fetchParticipantsData]);

  useEffect(() => {
    if (!isEmpty(currentUser)) {
      fetchProjectCodeLookup();
    }
  }, [currentUser, fetchProjectCodeLookup]);

  useEffect(() => {
    if (showAddModal) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }

    if (!showAddModal) {
      handleClose();
    }
  }, [showAddModal]);

  const handleClose = () => {
    setUserId("");
    setProjectId("");
    setParticipantId(null);
    setShowAddModal(false);
  };

  const handleChange = (event) => {
    // const isParticipant = event.target.name === "participant";
    // if (isParticipant) {
    //   setParticipantId(event.target.value);
    // }

    const isProjectCode = event.target.name === "projectCode";
    if (isProjectCode) {
      setProjectId(event.target.value);
    }

    const isUserId = event.target.name === "user_id";
    if (isUserId) {
      setUserId(event.target.value);

      setCurrentUser(
        partnerList.find((data) => data?.user_id === event.target.value)
      );
      return;
    }
  };

  const handleSubmit = () => {
    handleLinkParticipant({
      user_id,
      direct_participant_id: direct_participant_id?.id,
      activity_id: currentId,
      beneficiary_added: "no",
      indirect_participant_id: "",
      project_id: projectId,
    });
  };

  const handleAutoCompleteChange = (_event, value) => {
    setParticipantId(value);
  };

  console.log("[participantsData]", participantsData);

  return (
    <div>
      <Dialog
        open={showAddModal}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          <Typography variant="h4" color="primary">
            Add Participant to Activiy
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
              <Card style={{ minWidth: 400, maxWidth: 600, margin: "0 auto" }}>
                <CardContent>
                  <Grid container rowSpacing={2}>
                    {isAdmin && (
                      <Grid xs={12} sm={12} item>
                        <FormControl fullWidth>
                          <InputLabel id="partner-code-select-label">
                            User Partner
                          </InputLabel>

                          <Select
                            labelId="partner-code-select-label"
                            id="partner-code-select"
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
                    )}

                    <Grid xs={12} sm={12} item>
                      <FormControl fullWidth>
                        <InputLabel id="project-code-select-label">
                          Project
                        </InputLabel>

                        <Select
                          labelId="project-code-select-label"
                          id="project-code-select"
                          value={projectId}
                          label="Project"
                          onChange={handleChange}
                          name="projectCode"
                        >
                          {projectList.map((data) => (
                            <MenuItem value={data?.project_id}>
                              {data?.project_title}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <Autocomplete
                        disablePortal
                        id="direct_participant_id"
                        options={participantsData}
                        fullWidth={true}
                        name="direct_participant_id"
                        value={direct_participant_id}
                        onChange={handleAutoCompleteChange}
                        getOptionLabel={(option) =>
                          `${option.first_name} ${option.last_name}`
                        }
                        renderOption={(props, option) => (
                          <li
                            {...props}
                          >{`${option.first_name} ${option.last_name}`}</li>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            type="text"
                            name="direct_participant_id"
                            label="Participant"
                            fullWidth={true}
                          />
                        )}
                      />
                    </Grid>

                    <Grid container item spacing={1}>
                      <Grid item xs={12} align="right">
                        <Button
                          fullWidth
                          color="primary"
                          variant="contained"
                          type="submit"
                        >
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
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddModal;
