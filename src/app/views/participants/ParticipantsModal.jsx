import React, { useRef, useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ParticipantsAddForm from "./ParticipantsAddForm";
import ParticipantsBeneficiaryModal from "./ParticipantsBeneficiaryModal";

const ParticipantsModal = ({
  showModal,
  setShowModal,
  handleCreateParticipant,
}) => {
  console.log(showModal + " from the modal component");
  const handleClose = () => {
    setShowModal((prev) => !prev);
  };

  const [showChildModal, setShowChildModal] = useState(false);

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (showModal) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [showModal]);

  console.log("[showChildModal]", showChildModal);

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
              setShowChildModal={setShowChildModal}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>

      <ParticipantsBeneficiaryModal
        showChildModal={showChildModal}
        setShowChildModal={setShowChildModal}
      />
    </div>
  );
};

export default ParticipantsModal;
