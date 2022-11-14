import React, { useState, useRef, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AppUsersForms from "./AppUsersForms";
import EditUserForms from "./EditUserForms";
import { Typography } from "@material-ui/core";

const AppUserAddModal = ({
  showModal,
  setShowModal,
  handleCreateUser,
  isEdit,
  currentUser,
  setIsEdit,
  handleEditUser,
}) => {
  const handleClose = () => {
    setShowModal((prev) => !prev);
    setIsEdit(false);
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

  console.log("[currentUser]", currentUser);

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
            {isEdit ? "Edit" : "Create"} an App User
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {isEdit ? (
              <EditUserForms
                currentUser={currentUser}
                handleEditUser={handleEditUser}
              />
            ) : (
              <AppUsersForms handleCreateUser={handleCreateUser} />
            )}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppUserAddModal;
