import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import MUIDataTable from 'mui-datatables';
import { Box, styled, Icon } from '@mui/material';
import { Breadcrumb } from 'app/components';
import Button from '@mui/material/Button';
import ParticipantsAddForms from './ParticipantsAddForms';
import Test from './test';

const useStyles = makeStyles((theme) => ({
  tableOverflow: {
    overflow: 'auto',
  },
  addButton: {
    position: 'absolute',
    color: 'white',
    size: 'medium',
    right: '25px',
  },
}));

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
  '& .addButton': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));

const options = {
  onRowsDelete: (rowsDeleted, dataRows) => {
    console.log(dataRows[0]);
    console.log(rowsDeleted.data);
  },
};

const ParticipantsTable = () => {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  // const showAddParticipantsModal = () => {

  console.log('Show Modal ' + showModal);
  // };
  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  // onClick={handleClickOpen('paper')}
  return (
    <Container>
      <Box className="breadcrumb" display="flex">
        <Breadcrumb
          routeSegments={[{ name: 'Participants', path: '/records' }, { name: 'Records' }]}
        />
        <Button
          variant="contained"
          color="success"
          className={classes.addButton}
          onClick={openModal}
        >
          <Icon>add</Icon>
          <span>Participants</span>
        </Button>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          {/* <MUIDataTable
            title="Participants List"
            data={datatableData}
            columns={[
              'ID',
              'Activity ID',
              'First Name',
              'Last Name',
              'Middle Name',
              'Sex',
              'Gender',
              'DOB',
              'Age',
              'Civil Status',
              'Province',
              'Municipality',
              'Barangay',
              'PWDStatus',
            ]}
            options={options}
          /> */}
          <Test />
        </Grid>
      </Grid>
      <ParticipantsAddForms showModal={showModal} setShowModal={setShowModal} />
    </Container>
  );
};
export default ParticipantsTable;
