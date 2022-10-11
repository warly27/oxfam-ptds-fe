import React, { useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AppUsersForms from "./AppUsersForms";
import { Typography } from "@material-ui/core";

const AppUserAddModal = ({ showModal, setShowModal, handleCreateUser }) => {
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
            Create an App User
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <AppUsersForms handleCreateUser={handleCreateUser} />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppUserAddModal;
