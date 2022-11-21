import { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { green } from "@mui/material/colors";
import Dialog from "@mui/material/Dialog";
import MuiDialogActions from "@mui/material/DialogActions";
import MuiDialogContent from "@mui/material/DialogContent";
import MuiDialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { useEffect } from "react";

const DialogTitleRoot = styled(MuiDialogTitle)(({ theme }) => ({
  margin: 0,
  padding: theme.spacing(2),
  "& .closeButton": {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

const DialogTitle = (props) => {
  const { children, onClose } = props;
  return (
    <DialogTitleRoot disableTypography>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="Close"
          className="closeButton"
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitleRoot>
  );
};

const DialogContent = styled(MuiDialogContent)(({ theme }) => ({
  "&.root": { padding: theme.spacing(2), color: green },
}));

const DialogActions = styled(MuiDialogActions)(({ theme }) => ({
  "&.root": { margin: 0, padding: theme.spacing(1) },
}));

const CustomizedDialogs = ({ showModal, setShowModal, message, type }) => {
  const sampleMessage =
    "You have successfully sent an App registration. You will be notified in your email within 24hrs";

  const [currentMessage, setCurrentMessage] = useState(sampleMessage);

  useEffect(() => {
    setCurrentMessage(message);
  }, [message]);

  const handleClose = () => setShowModal(false);

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={showModal}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {type === undefined ? "Notification: " : "Error: "}
        </DialogTitle>

        <DialogContent dividers>
          <Typography gutterBottom>{currentMessage}</Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomizedDialogs;
