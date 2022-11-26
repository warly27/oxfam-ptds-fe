import React, { useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AppActivityForms from "./AppActivityForms";
import { Typography } from "@material-ui/core";
import { isEmpty } from "lodash";

import EditActivityForms from "./EditActivityForms";

const AppActivityAddModal = ({
  showModal,
  setShowModal,
  handleCreateActivity,
  currentData,
  isEdit,
  handleEditActivity,
  setIsEdit,
  setCurrentData,
}) => {
  console.log(showModal + " from the modal component");
  const handleClose = () => {
    setShowModal((prev) => !prev);
    setIsEdit(false);
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
            {isEdit ? "Edit Activity" : "Create an Activity"}
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {!isEdit && isEmpty(currentData) && (
              <AppActivityForms handleCreateActivity={handleCreateActivity} />
            )}

            {isEdit && !isEmpty(currentData) && (
              <EditActivityForms
                handleEditActivity={handleEditActivity}
                currentData={currentData}
              />
            )}

            {isEdit && isEmpty(currentData) && <> Loading... </>}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppActivityAddModal;
