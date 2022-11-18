import React from "react";
import MuiButton from "@mui/material/Button";

export default function Button(props) {
  const { text, size, color, variant, onClick, disabled, ...other } = props;

  return (
    <MuiButton
      variant={variant || "contained"}
      size={size || "medium"}
      color={color || "grey"}
      onClick={onClick}
      {...other}
      disabled={disabled || false}
    >
      {text}
    </MuiButton>
  );
}
