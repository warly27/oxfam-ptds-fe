import { DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Grid, TextField, Button, Card, CardContent, Typography, Icon } from '@material-ui/core';
import { Span } from 'app/components/Typography';
import { useEffect, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { inputFormElements } from 'app/components/FormElement';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const PartnersAddForms = () => {
  const [state, setState] = useState({ date: new Date() });

  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== state.password) return false;

      return true;
    });
    return () => ValidatorForm.removeValidationRule('isPasswordMatch');
  }, [state.password]);

  const handleSubmit = (event) => {
    // console.log("submitted");
    // console.log(event);
  };

  const handleChange = (event) => {
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleDateChange = (date) => setState({ ...state, date });
  const margin = { margin: '0 5px' };
  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid style={{ padding: '10px 5px 0 5px' }}>
          <Card style={{ maxWidth: 600, margin: '0 auto' }}>
            <CardContent>
              <form>
                <Grid container spacing={1}>
                  {inputFormElements.slice(2, 8).map((input) => (
                    <Grid xs={input.xs} sm={input.sm} item>
                      <TextField {...input} />
                    </Grid>
                  ))}
                </Grid>
                {/* <Typography variant="body2" align="left" gutterBottom>
                  Address :{' '}
                </Typography> */}

                <Grid container spacing={1}>
                  <Grid item xs={12} align="right">
                    <Button style={margin} type="reset" variant="outlined" color="primary">
                      Reset
                    </Button>
                    <Button color="primary" variant="contained" type="submit">
                      <Icon>send</Icon>
                      <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Submit</Span>
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </ValidatorForm>
    </div>
  );
};

export default PartnersAddForms;
