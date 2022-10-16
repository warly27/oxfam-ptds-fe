import { Box, Button, Card, Grid, styled, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FlexBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}));

const JustifyBox = styled(FlexBox)(() => ({
  justifyContent: "center",
}));

const ContentBox = styled(Box)(({ theme }) => ({
  padding: 32,
  background: theme.palette.background.default,
}));

const ForgotPasswordRoot = styled(JustifyBox)(() => ({
  background: "#196900",
  minHeight: "100vh !important",
  "& .card": {
    maxWidth: 800,
    margin: "1rem",
    borderRadius: 12,
  },
}));

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleFormSubmit = () => {
    console.log(email);
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <ForgotPasswordRoot>
      <Card className="card">
        <Grid container>
          <Grid item xs={12}>
            <JustifyBox p={4}>
              <img
                src="/assets/images/logos/round-oxfam-logo.png"
                width="100%"
                alt=""
              />
            </JustifyBox>

            <ContentBox>
              <TextField
                type="email"
                name="email"
                size="small"
                label="Email"
                value={email}
                variant="outlined"
                onChange={(event) => handleChangeEmail(event)}
                sx={{ mb: 3, width: "100%" }}
              />

              <Button
                fullWidth
                variant="contained"
                color="success"
                type="submit"
                onClick={handleFormSubmit}
              >
                Reset Password
              </Button>

              <Button
                fullWidth
                color="primary"
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={handleGoBack}
              >
                Go Back
              </Button>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </ForgotPasswordRoot>
  );
};

export default ForgotPassword;
