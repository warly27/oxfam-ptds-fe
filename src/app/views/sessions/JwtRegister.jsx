import { useTheme } from '@emotion/react';
import { LoadingButton } from '@mui/lab';
import { Card, Checkbox, Grid, TextField, Autocomplete } from '@mui/material';
import { Box, styled } from '@mui/system';
import { Paragraph } from 'app/components/Typography';
import useAuth from 'app/hooks/useAuth';
import { Formik } from 'formik';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import CustomizedDialogs from '../mydialogbox/customDialog';

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const AutoComplete = styled(Autocomplete)(() => ({
  width: 300,
  marginBottom: '16px',
}));

const suggestions = [{ role: 'Admin' }, { role: 'Melsa' }, { role: 'Partner' }];

const ContentBox = styled(JustifyBox)(() => ({
  height: '100%',
  padding: '32px',
  background: 'rgba(0, 0, 0, 0.01)',
}));

const JWTRegister = styled(JustifyBox)(() => ({
  background: '#196900',
  minHeight: '100vh !important',
  '& .card': {
    maxWidth: 800,
    minHeight: 400,
    margin: '1rem',
    display: 'flex',
    borderRadius: 12,
    alignItems: 'center',
  },
}));

// inital login credentials
const initialValues = {
  email: '',
  password: '',
  user_name: '',
  role: '',
  remember: true,
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be 6 character length')
    .required('Password is required!'),
  email: Yup.string().email('Invalid Email address').required('Email is required!'),
});

const JwtRegister = () => {
  const theme = useTheme();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setModalMessage] = useState();

  const handleFormSubmit = async (values) => {
    console.log(values);
    setLoading(true);

    try {
      const response = await register(values.email, values.user_name, values.password, values.role);
      console.log(response);
      // alert(response);
      // navigate('/');
      setModalMessage(undefined);
      setLoading(false);
      setShowModal(true);
    } catch (e) {
      console.log(e);
      setModalMessage(e.message);
      setLoading(false);
      setShowModal(true);
    }
  };

  return (
    <JWTRegister>
      <Card className="card">
        <CustomizedDialogs showModal={showModal} setShowModal={setShowModal} message={message} />
        <Grid container>
          <Grid item sm={6} xs={12}>
            <ContentBox>
              {/* <img
                width="100%"
                alt="Register"
                src="/assets/images/illustrations/posting_photo.svg"
              /> */}
              <img src="/assets/images/logos/round-oxfam-logo.png" width="100%" alt="" />
            </ContentBox>
          </Grid>

          <Grid item sm={6} xs={12}>
            <Box p={4} height="100%">
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
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
                          helperText={touched.role && errors.role}
                          error={Boolean(errors.role && touched.role)}
                          sx={{ mb: 3 }}
                        />
                      )}
                    />

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
                        to="/session/signin"
                        style={{ color: theme.palette.primary.main, marginLeft: 5 }}
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
