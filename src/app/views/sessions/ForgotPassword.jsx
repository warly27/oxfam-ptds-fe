import { useState, useEffect } from "react";
import { Box, Button, Card, Grid, styled, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomizedDialogs from "../mydialogbox/customDialog";
import { LoadingButton } from "@mui/lab";

import axios from "../../utils/axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

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
    maxWidth: 500,
    margin: "1rem",
    borderRadius: 12,
  },
}));

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isValidated, setValidated] = useState(false);
  const [isResend, setIsResend] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [counter, setCounter] = useState(300);

  useEffect(() => {
    if (isResend) {
      if (counter > 0) {
        setTimeout(() => setCounter(counter - 1), 1000);
      }

      if (counter === 0) {
        setIsResend(false);
        setCounter(300);
      }
    }
  }, [counter, isResend]);

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangeCode = (event) => {
    setCode(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = async () => {
    setLoading(true);
    try {
      if (!isValidated) {
        const response = await axios.post(`${BASE_URL}/auth/reset_password`, {
          email,
        });

        const isSuccess = response.status === 200;
        if (isSuccess) {
          setValidated(isSuccess);
          setLoading(false);
        }
      }

      if (isValidated) {
        const response = await axios.post(`${BASE_URL}/auth/confirm_password`, {
          email,
          code,
          password,
        });

        const isSuccess = response.status === 200;
        if (isSuccess) {
          navigate("/");
          setValidated(false);
          setLoading(false);
        }
      }
    } catch (err) {
      setMessage(err.message);
      setLoading(false);
      setShowModal(true);
    }

    // const
  };

  const handleGoBack = () => {
    navigate("/");
  };

  const handleResendOTP = async () => {
    try {
      const resendOtp = await axios.post(`${BASE_URL}/auth/login/resend_otp`, {
        user_id: email,
      });

      const isSuccess = resendOtp.status === 200;

      if (isSuccess) {
        setIsResend(true);
      }
    } catch (err) {
      setMessage(err?.message);
      setLoading(false);
      setShowModal(true);
    }
  };

  return (
    <ForgotPasswordRoot>
      <CustomizedDialogs
        showModal={showModal}
        setShowModal={setShowModal}
        message={message}
      />

      <Card className="card">
        <Grid container>
          <Grid item xs={12}>
            <JustifyBox p={4}>
              <img
                src="/assets/images/logos/round-oxfam-logo.png"
                width="40%"
                alt=""
              />
            </JustifyBox>

            <ContentBox>
              {!isValidated && (
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
              )}

              {isValidated && (
                <>
                  <h3>Check your email for OTP</h3>

                  <TextField
                    type="text"
                    name="code"
                    label="OTP"
                    value={code}
                    variant="outlined"
                    onChange={(event) => handleChangeCode(event)}
                    sx={{ mb: 2, width: "100%" }}
                  />

                  <TextField
                    type="password"
                    name="password"
                    label="New Password"
                    value={password}
                    variant="outlined"
                    onChange={(event) => handleChangePassword(event)}
                    sx={{ mb: 2, width: "100%" }}
                  />

                  <Button
                    fullWidth
                    variant="text"
                    onClick={handleResendOTP}
                    disabled={isResend}
                    sx={{ mb: 2, width: "100%" }}
                  >
                    Resend OTP {isResend && <>{`(${counter})`}</>}
                  </Button>
                </>
              )}

              <LoadingButton
                fullWidth
                variant="contained"
                color="success"
                type="submit"
                onClick={handleFormSubmit}
                loading={loading}
              >
                {isValidated ? "Confirm" : "Reset Password"}
              </LoadingButton>

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
