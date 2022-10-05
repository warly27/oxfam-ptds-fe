import { Span } from 'app/components/Typography';
import { ValidatorForm } from 'react-material-ui-form-validator';
import React, { useEffect, useState } from 'react';
import { inputFormElements } from 'app/components/FormElement';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, Button, Card, CardContent, Typography, Icon } from '@material-ui/core';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    padding: '10px 5px',
  },
}));

const AppActivityForms = () => {
  const classes = useStyles();
  const [state, setState] = useState({ date: new Date() });
  const [fund_source, setFundSource] = useState('');

  const handleChange = (event) => {
    setFundSource(event.target.value);
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    // console.log("submitted");
    console.log(event);
  };

  const margin = { margin: '0 5px' };
  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid style={{ padding: '10px 5px 0 5px' }}>
          <Card style={{ maxWidth: 600, margin: '0 auto' }}>
            <CardContent>
              <form>
                <Grid container spacing={1}>
                  {inputFormElements.slice(2, 6).map((input) => (
                    <Grid xs={input.xs} sm={input.sm} item>
                      <TextField {...input} />
                    </Grid>
                  ))}
                </Grid>
                {/* <Typography variant="body2" align="left" gutterBottom>
                  Address :{' '}
                </Typography> */}
                <Grid container spacing={1}>
                  <Grid xs={12} sm={12} item>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">User Role</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={fund_source}
                        label="Project Fund Source"
                        onChange={handleChange}
                      >
                        <MenuItem value={30}>Admin</MenuItem>
                        <MenuItem value={20}>Partner</MenuItem>
                        <MenuItem value={50}>Project Owner</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
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

export default AppActivityForms;
