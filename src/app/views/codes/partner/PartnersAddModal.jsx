import React, { useRef, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PartnersAddForms from "./PartnersAddForms";
import { Typography } from "@material-ui/core";

const AppPartnerCodeAddModal = ({
  showModal,
  setShowModal,
  handleCreatePartner,
  currentData,
  isEdit,
  handleEditPartnerCode,
}) => {
  console.log(showModal + " from the modal component");
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
            {`${isEdit ? "Edit" : "Create"} Partner Code`}
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <PartnersAddForms
              handleCreatePartner={handleCreatePartner}
              currentData={currentData}
              isEdit={isEdit}
              handleEditPartnerCode={handleEditPartnerCode}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppPartnerCodeAddModal;
