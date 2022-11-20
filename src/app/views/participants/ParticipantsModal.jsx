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
  const [showChildModal, setShowChildModal] = useState(false);
  const [numberOfBeneficiary, setNumberOfBeneficiary] = useState(0);
  const [beneficiariesData, setBeneficiariesData] = useState([]);

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (showModal) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [showModal]);

  const handleClose = () => {
    setShowModal((prev) => !prev);
  };

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
              setNumberOfBeneficiary={setNumberOfBeneficiary}
              beneficiariesData={beneficiariesData}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>

      <ParticipantsBeneficiaryModal
        showChildModal={showChildModal}
        setShowChildModal={setShowChildModal}
        numberOfBeneficiary={numberOfBeneficiary}
        setBeneficiariesData={setBeneficiariesData}
      />
    </div>
  );
};

export default ParticipantsModal;
