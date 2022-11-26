import React, { useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ProjectsAddFrom from "./ProjectsAddForm";
import ProjectsEditForm from "./ProjectsEditForm";
import { Typography } from "@material-ui/core";
import { isEmpty } from "lodash";

const ProjectsAddModal = ({
  showModal,
  setShowModal,
  handleCreateProject,
  setCurrentId,
  setCurrentData,
  isEdit,
  currentData,
  handleEditProject,
}) => {
  const handleClose = () => {
    setShowModal((prev) => !prev);
    setCurrentId("");
    setCurrentData({});
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (showModal) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [showModal]);

  return (
    <div>
      <Dialog
        open={showModal}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          <Typography variant="h4" color="primary">
            {isEdit ? "Edit Project" : "Create a Project"}
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {!isEdit && (
              <ProjectsAddFrom handleCreateProject={handleCreateProject} />
            )}

            {isEdit && !isEmpty(currentData) && (
              <ProjectsEditForm
                currentData={currentData}
                handleEditProject={handleEditProject}
              />
            )}

            {isEdit && isEmpty(currentData) && <> Loading... </>}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectsAddModal;
