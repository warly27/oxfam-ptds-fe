import React, { useState, useRef, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ProjectsLinkForm from "./ProjectsLinkForm";
import { Typography } from "@material-ui/core";

const ProjectsLinkModal = ({
  showModal,
  setShowModal,
  handleLinkPartnerProject,
}) => {
  const handleClose = () => {
    setShowModal((prev) => !prev);
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

  console.log("[showModal]", showModal);

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
            Link Partner Project
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <ProjectsLinkForm
              handleLinkPartnerProject={handleLinkPartnerProject}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectsLinkModal;
