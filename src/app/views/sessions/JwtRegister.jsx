import { useState, useCallback, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { LoadingButton } from "@mui/lab";
import { Card, Checkbox, Grid, TextField, Autocomplete } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Paragraph } from "app/components/Typography";
import useAuth from "app/hooks/useAuth";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import CustomizedDialogs from "../mydialogbox/customDialog";

import axios from "../../utils/axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const FlexBox = styled(Box)(() => ({ display: "flex", alignItems: "center" }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: "center" }));

const AutoComplete = styled(Autocomplete)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const suggestions = [{ role: "Admin" }, { role: "Melsa" }, { role: "Partner" }];

const ContentBox = styled(JustifyBox)(() => ({
  height: "100%",
  padding: "32px",
  background: "rgba(0, 0, 0, 0.01)",
}));

const JWTRegister = styled(JustifyBox)(() => ({
  background: "#196900",
  minHeight: "100vh !important",
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
  user_name: "",
  last_name: "",
  first_name: "",
  role: null,
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
  first_name: Yup.string().required("First name is required!"),
  last_name: Yup.string().required("Last name is required!"),
});

const JwtRegister = () => {
  const theme = useTheme();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setModalMessage] = useState();
  const [partnerCodeLookup, setPartnerCodeLookup] = useState([]);
  const [role, setRole] = useState("");
  const [partnerCode, setPartnerCode] = useState("");

  const fetchPartnerCodeLookup = useCallback(async () => {
    const getPartnerCodeLookup = await axios.get(
      `${BASE_URL}/codes/getAllPartnerCodes`
    );

    setPartnerCodeLookup(getPartnerCodeLookup?.data?.data);
  }, []);

  useEffect(() => {
    fetchPartnerCodeLookup();
  }, []);

  const handleFormSubmit = async (values) => {
    console.log("[values]", values);
    setLoading(true);

    try {
      const response = await register(
        values.email,
        values.first_name,
        values.last_name,
        values.password,
        role,
        partnerCode,
        values?.user_name
      );

      console.log(response);

      if (response.status === 201) {
        setModalMessage(undefined);
        setLoading(false);
        setShowModal(true);
        navigate("/");
      }
    } catch (e) {
      console.log("[e]", e);
      setModalMessage(e?.result);
      setLoading(false);
      setShowModal(true);
    }
  };

  const handleChangeData = (_event, newValue) => {
    setRole(newValue?.role?.toLowerCase());
  };

  const handleSelectCode = (_event, newValue) => {
    setPartnerCode(newValue?.code);
  };

  return (
    <JWTRegister>
      <Card className="card">
        <CustomizedDialogs
          showModal={showModal}
          setShowModal={setShowModal}
          message={message}
        />
        <Grid container>
          <Grid item sm={6} xs={12}>
            <ContentBox>
              <img
                src="/assets/images/logos/round-oxfam-logo.png"
                width="100%"
                alt=""
              />
            </ContentBox>
          </Grid>

          <Grid item sm={6} xs={12}>
            <Box p={4} height="100%">
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
                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="first_name"
                      label="First name"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.first_name}
                      onChange={handleChange}
                      helperText={touched.first_name && errors.first_name}
                      error={Boolean(errors.first_name && touched.first_name)}
                      sx={{ mb: 3 }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="last_name"
                      label="Last name"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.last_name}
                      onChange={handleChange}
                      helperText={touched.last_name && errors.last_name}
                      error={Boolean(errors.last_name && touched.last_name)}
                      sx={{ mb: 3 }}
                    />
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
                      sx={{ mb: 2 }}
                    />
                    {/* <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="role"
                      label="Role"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.role}
                      onChange={handleChange}
                      helperText={touched.role && errors.role}
                      error={Boolean(errors.role && touched.role)}
                      sx={{ mb: 3 }}
                    /> */}

                    <AutoComplete
                      options={suggestions}
                      getOptionLabel={(option) => option.role}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Role"
                          variant="outlined"
                          fullWidth
                          //value={values.params}
                          inputValue={values.param}
                          onInputChange={values.param}
                          onChange={handleChange}
                          name="role"
                          value={values.role}
                          helperText={touched.role && errors.role}
                          error={Boolean(errors.role && touched.role)}
                          sx={{ mb: 3 }}
                        />
                      )}
                      onChange={handleChangeData}
                    />

                    {role === "partner" && (
                      <AutoComplete
                        options={partnerCodeLookup}
                        getOptionLabel={(option) => option.code}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Partner Code"
                            variant="outlined"
                            fullWidth
                            inputValue={values.param}
                            onInputChange={values.param}
                            onChange={handleChange}
                            name="partnerCode"
                            helperText={touched.name && errors.name}
                            error={Boolean(errors.name && touched.name)}
                            sx={{ mb: 3 }}
                          />
                        )}
                        onChange={handleSelectCode}
                      />
                    )}
                    {role === "partner" && (
                      <TextField
                        fullWidth
                        size="small"
                        type="text"
                        name="user_name"
                        label="Username"
                        variant="outlined"
                        onBlur={handleBlur}
                        value={values.user_name}
                        onChange={handleChange}
                        helperText={touched.user_name && errors.user_name}
                        error={Boolean(errors.user_name && touched.user_name)}
                        sx={{ mb: 3 }}
                      />
                    )}
                    <FlexBox gap={1} alignItems="center">
                      <Checkbox
                        size="small"
                        name="remember"
                        onChange={handleChange}
                        checked={values.remember}
                        sx={{ padding: 0 }}
                      />

                      <Paragraph fontSize={13}>
                        I have read and agree to the terms of service.
                      </Paragraph>
                    </FlexBox>

                    <LoadingButton
                      type="submit"
                      color="success"
                      loading={loading}
                      variant="contained"
                      sx={{ mb: 2, mt: 3 }}
                    >
                      Regiser
                    </LoadingButton>

                    <Paragraph>
                      Already have an account?
                      <NavLink
                        to="/"
                        style={{
                          color: theme.palette.primary.main,
                          marginLeft: 5,
                        }}
                      >
                        Login
                      </NavLink>
                    </Paragraph>
                  </form>
                )}
              </Formik>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </JWTRegister>
  );
};

export default JwtRegister;
