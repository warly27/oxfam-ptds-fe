import { Span } from "app/components/Typography";
import { useState, useCallback, useEffect } from "react";

import { ValidatorForm } from "react-material-ui-form-validator";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";

import axios from "../../../utils/axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const ProjectsLinkFrom = ({ handleLinkPartnerProject }) => {
  const [projectList, setProjectList] = useState([]);
  const [projectId, setProjectId] = useState("");

  const fetchAllProjects = useCallback(async () => {
    const getAllCodesResult = await axios.get(
      `${BASE_URL}/codes/getAllProjectCodes`
    );

    setProjectList(getAllCodesResult?.data?.data);
  }, []);

  useEffect(() => {
    fetchAllProjects();
  }, [fetchAllProjects]);

  const handleChange = (event) => {
    const isProjectCode = event.target.name === "projectCode";
    if (isProjectCode) {
      setProjectId(event.target.value);
    }
  };

  const handleSubmit = () => {
    handleLinkPartnerProject(projectId);
  };

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Card style={{ minWidth: 400, maxWidth: 600, margin: "0 auto" }}>
          <CardContent>
            <Grid container rowSpacing={2}>
              {/* <Grid xs={12} sm={12} item>
                <FormControl fullWidth>
                  <InputLabel id="partner-code-select-label">
                    Partner
                  </InputLabel>

                  <Select
                    labelId="partner-code-select-label"
                    id="partner-code-select"
                    value={partnerId}
                    label="Partner"
                    onChange={handleChange}
                    name="partnerCode"
                  >
                    {partnerList.map((data) => (
                      <MenuItem value={data?.id}>{data?.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid> */}

              <Grid xs={12} sm={12} item>
                <FormControl fullWidth>
                  <InputLabel id="project-code-select-label">
                    Project
                  </InputLabel>

                  <Select
                    labelId="project-code-select-label"
                    id="project-code-select"
                    value={projectId}
                    label="Project"
                    onChange={handleChange}
                    name="projectCode"
                  >
                    {projectList.map((data) => (
                      <MenuItem value={data?.id}>{data?.title}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid container item spacing={1}>
                <Grid item xs={12} align="right">
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    type="submit"
                  >
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

export default ProjectsLinkFrom;
