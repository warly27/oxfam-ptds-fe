import React, { useRef, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ParticipantsAddForm from "./ParticipantsAddForm";

const ParticipantsModal = ({
  showModal,
  setShowModal,
  handleCreateParticipant,
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
        <DialogTitle id="scroll-dialog-title">Add Participants</DialogTitle>
        <DialogContent dividers>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <ParticipantsAddForm
              handleCreateParticipant={handleCreateParticipant}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ParticipantsModal;
