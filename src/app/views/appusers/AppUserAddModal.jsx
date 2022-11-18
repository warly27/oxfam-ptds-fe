import React, { useState, useRef, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
import AppUsersForms from "./AppUsersForms";
import EditUserForms from "./EditUserForms";
import { Typography } from "@material-ui/core";
import isEmpty from "lodash/isEmpty";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  maxHeight: "80vh",
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: 2,
  boxShadow: 24,
  p: 2,
  overflow: "auto",
};

const AppUserAddModal = ({
  showModal,
  setShowModal,
  handleCreateUser,
  isEdit,
  currentUser,
  setIsEdit,
  handleEditUser,
  setUserDetails,
  setCurrentUser,
}) => {
  useEffect(() => {
    return () => {
      setUserDetails({});
    };
  }, []);

  const handleClose = () => {
    setShowModal((prev) => !prev);
    setIsEdit(false);
    setUserDetails({});
    setCurrentUser({});
  };

  return (
    <Modal
      open={showModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {isEdit ? "Edit" : "Create"} an App User
        </Typography>

        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {isEdit && !isEmpty(currentUser) && (
            <EditUserForms
              currentUser={currentUser}
              handleEditUser={handleEditUser}
            />
          )}

          {!isEdit && <AppUsersForms handleCreateUser={handleCreateUser} />}

          {isEdit && isEmpty(currentUser) && "Loading..."}
        </Typography>
      </Box>
    </Modal>
  );
};

export default AppUserAddModal;
