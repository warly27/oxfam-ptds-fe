import { useState, useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import { Card, Checkbox, Grid, TextField, Button } from "@mui/material";
import { Box, styled, useTheme } from "@mui/system";
import { Paragraph } from "app/components/Typography";
import useAuth from "app/hooks/useAuth";
import { Formik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import CustomizedDialogs from "../mydialogbox/customDialog";

import axios from "../../utils/axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const FlexBox = styled(Box)(() => ({ display: "flex", alignItems: "center" }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: "center" }));

const ContentBox = styled(Box)(() => ({
  height: "100%",
  padding: "32px",
  paddingTop: "100px",
  position: "relative",
  background: "rgba(0, 0, 0, 0.01)",
}));

const JWTRoot = styled(JustifyBox)(() => ({
  background: "#196900",
  minHeight: "100% !important",
  "& .card": {
    maxWidth: 800,
    minHeight: 400,
    margin: "1rem",
    display: "flex",
    borderRadius: 12,
    alignItems: "center",
  },
}));

// inital login credentials
const initialValues = {
  email: "",
  password: "",
  remember: true,
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be 6 character length")
    .required("Password is required!"),
  email: Yup.string()
    .email("Invalid Email address")
    .required("Email is required!"),
});

const JwtLogin = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [isResend, setIsResend] = useState(false);
  const [message, setModalMessage] = useState("");
  const [session, setSession] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user_id, setUserId] = useState("");
  const [counter, setCounter] = useState(300);

  const { login, verifyLoginOtp } = useAuth();

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

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      if (!isValidated) {
        const response = await login(values.email, values.password);

        setModalMessage(undefined);
        setLoading(false);

        const isSuccess = response?.status === 200;

        if (isSuccess) {
          setSession(response?.data?.session);
          setUserId(response?.data?.user_id);
          setEmail(values.email);
          setPassword(values.password);
          setIsValidated(isSuccess);
        }
      }

      if (isValidated) {
        const payload = {
          session,
          confirmation_code: values.code,
          user_id,
        };

        const response = await verifyLoginOtp(payload);

        console.log("[response]", response);

        navigate("/");

        setModalMessage(undefined);
        setLoading(false);
        setSession("");
        setUserId("");
        setEmail("");
        setPassword("");
        setIsValidated(false);
      }
    } catch (e) {
      setModalMessage(e.message);
      setLoading(false);
      setShowModal(true);
      setIsValidated(false);
      setSession("");
      setUserId("");
      setEmail("");
      setPassword("");
    }
  };

  const handleResendOTP = async () => {
    try {
      const resendOtp = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });

      const isSuccess = resendOtp.status === 200;

      if (isSuccess) {
        setSession(resendOtp?.data?.session);
        setUserId(resendOtp?.data?.user_id);
        setIsResend(true);
      }
    } catch (err) {
      setModalMessage(err.message);
      setLoading(false);
      setShowModal(true);
    }
  };

  return (
    <JWTRoot>
      <Card className="card">
        <CustomizedDialogs
          showModal={showModal}
          setShowModal={setShowModal}
          message={message}
        />

        <Grid container>
          <Grid item sm={6} xs={12}>
            <JustifyBox p={4} height="100%" sx={{ minWidth: 320 }}>
              {/* <img src="/assets/images/illustrations/dreamer.svg" width="100%" alt="" /> */}
              <img
                src="/assets/images/logos/round-oxfam-logo.png"
                width="100%"
                alt=""
              />
            </JustifyBox>
          </Grid>

          <Grid item sm={6} xs={12}>
            <ContentBox>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    fontSize: 30,
                    fontWeight: 600,
                    lineHeight: 1.2,
                  }}
                >
                  Participant Tracking
                </div>

                <div
                  style={{
                    textAlign: "center",
                    fontSize: 30,
                    fontWeight: 600,
                    lineHeight: 1.2,
                    marginBottom: "8px",
                  }}
                >
                  Database System
                </div>
              </div>

              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => (
                  <form onSubmit={handleSubmit}>
                    {!isValidated && (
                      <>
                        <TextField
                          fullWidth
                          size="small"
                          type="email"
                          name="email"
                          label="Email"
                          variant="outlined"
                          onBlur={handleBlur}
                          value={values.email}
                          onChange={handleChange}
                          helperText={touched.email && errors.email}
                          error={Boolean(errors.email && touched.email)}
                          sx={{ mb: 3 }}
                        />

                        <TextField
                          fullWidth
                          size="small"
                          name="password"
                          type="password"
                          label="Password"
                          variant="outlined"
                          onBlur={handleBlur}
                          value={values.password}
                          onChange={handleChange}
                          helperText={touched.password && errors.password}
                          error={Boolean(errors.password && touched.password)}
                          sx={{ mb: 1.5 }}
                        />

                        <FlexBox justifyContent="space-between">
                          <FlexBox gap={1}>
                            <Checkbox
                              size="small"
                              name="remember"
                              onChange={handleChange}
                              checked={values.remember}
                              sx={{ padding: 0 }}
                            />

                            <Paragraph>Remember Me</Paragraph>
                          </FlexBox>

                          <NavLink
                            to="/forgot-password"
                            style={{ color: theme.palette.primary.main }}
                          >
                            Forgot password?
                          </NavLink>
                        </FlexBox>
                      </>
                    )}

                    {isValidated && (
                      <>
                        <h3>Check your email for OTP</h3>

                        <TextField
                          fullWidth
                          type="text"
                          name="code"
                          label="OTP"
                          variant="outlined"
                          onBlur={handleBlur}
                          value={values.code}
                          onChange={handleChange}
                          helperText={touched.code && errors.code}
                          error={Boolean(errors.code && touched.code)}
                          sx={{ mb: 1, mt: 1, textAlign: "center" }}
                        />

                        <Button
                          fullWidth
                          variant="text"
                          onClick={handleResendOTP}
                          disabled={isResend}
                        >
                          Resend OTP {isResend && <>{`(${counter})`}</>}
                        </Button>
                      </>
                    )}

                    <LoadingButton
                      type="submit"
                      color="success"
                      loading={loading}
                      variant="contained"
                      fullWidth
                      sx={{ my: 2 }}
                    >
                      {isValidated ? "Confirm" : "Login"}
                    </LoadingButton>
                  </form>
                )}
              </Formik>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </JWTRoot>
  );
};

export default JwtLogin;
