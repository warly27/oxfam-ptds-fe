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
import Icon from "@mui/material/Icon";
import axios from "../../../utils/axios";

import { Span } from "app/components/Typography";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const AddModal = ({
  showAddModal,
  setShowAddModal,
  handleLinkProject,
  currentId,
}) => {
  const [projectId, setProjectId] = useState("");
  const [partnerList, setPartnerList] = useState([]);
  const [activityList, setActivityList] = useState([]);
  const [user_id, setUserId] = useState("");

  const descriptionElementRef = useRef(null);

  const fetchAllPartners = useCallback(async () => {
    const getAllUsersResult = await axios.get(
      `${BASE_URL}/partner/getAllPartners`
    );
    setPartnerList(getAllUsersResult?.data?.data);
  }, []);

  const fetchAllActivities = useCallback(async () => {
    const getAllUsersResult = await axios.get(
      `${BASE_URL}/activity/getAllActivities`
    );

    setActivityList(getAllUsersResult?.data?.data);
  }, []);

  useEffect(() => {
    fetchAllPartners();
    fetchAllActivities();
  }, [fetchAllPartners, fetchAllActivities]);

  useEffect(() => {
    if (showAddModal) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [showAddModal]);

  const handleClose = () => {
    setShowAddModal((prev) => !prev);
  };

  const handleChange = (event) => {
    const isProjectCode = event.target.name === "projectCode";
    if (isProjectCode) {
      setProjectId(event.target.value);
    }

    const isUserId = event.target.name === "user_id";
    if (isUserId) {
      setUserId(event.target.value);
      return;
    }
  };

  const handleSubmit = () => {
    handleLinkProject({
      user_id,
      activity_id: projectId,
      project_id: currentId,
    });
  };

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
            Add Project to Activity
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

                    <Grid xs={12} sm={12} item>
                      <FormControl fullWidth>
                        <InputLabel id="project-code-select-label">
                          Activities
                        </InputLabel>

                        <Select
                          labelId="project-code-select-label"
                          id="project-code-select"
                          value={projectId}
                          label="Activities"
                          onChange={handleChange}
                          name="projectCode"
                        >
                          {activityList.map((data) => (
                            <MenuItem value={data?.id}>{data?.title}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid container item spacing={1}>
                      <Grid item xs={12} align="right">
                        <Button
                          fullWidth
                          color="primary"
                          variant="contained"
                          type="submit"
                        >
                          <Icon>send</Icon>
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
