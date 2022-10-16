import { Span } from "app/components/Typography";
import { useEffect, useState } from "react";
import { ValidatorForm } from "react-material-ui-form-validator";
import * as React from "react";
import { inputFormElements } from "app/components/FormElement";
import { makeStyles } from "@material-ui/core/styles";
// import {
//   Grid,
//   TextField,
//   Button,
//   Card,
//   CardContent,
//   Icon,
// } from "@material-ui/core";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 250,
    padding: "10px 5px",
  },
}));

const ProjectsAddFrom = () => {
  const classes = useStyles();

  const [fund_source, setFundSource] = React.useState("");

  const handleChange = (event) => {};

  const handleSubmit = (event) => {
    // console.log("submitted");
    console.log(event);
  };

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Card style={{ maxWidth: 600, margin: "0 auto" }}>
          <CardContent>
            <Grid container rowSpacing={2}>
              <Grid container item spacing={1}>
                {inputFormElements.slice(13, 14).map((input) => (
                  <Grid xs={input.xs} sm={input.sm} item>
                    <TextField {...input} />
                  </Grid>
                ))}
              </Grid>

              <Grid container item spacing={1}>
                <Grid xs={12} sm={6} item>
                  <TextField
                    id="datetime-local"
                    label="Start Date"
                    type="datetime-local"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid xs={12} sm={6} item>
                  <TextField
                    id="datetime-local"
                    label="End Date"
                    type="datetime-local"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>

              <Grid container item spacing={1}>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Project Fund Source
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={fund_source}
                      label="Project Fund Source"
                      onChange={handleChange}
                    >
                      <MenuItem value={30}>Duterte</MenuItem>
                      <MenuItem value={20}>Marcos</MenuItem>
                      <MenuItem value={50}>Warly</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <TextField
                    label="Project Budget"
                    placeholder="Enter project budget"
                    variant="outlined"
                    fullWidth="true"
                    required="true"
                  />
                </Grid>
              </Grid>

              <Grid container item spacing={1}>
                {inputFormElements.slice(14, 15).map((input) => (
                  <Grid xs={input.xs} sm={input.sm} item>
                    <TextField {...input} />
                  </Grid>
                ))}
              </Grid>

              <Grid container item spacing={1}>
                <Grid item xs={12} align="right">
                  <Button color="primary" variant="contained" type="submit">
                    <Icon>send</Icon>
                    <Span sx={{ pl: 1, textTransform: "capitalize" }}>
                      Submit
                    </Span>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </ValidatorForm>
    </div>
  );
};

export default ProjectsAddFrom;
