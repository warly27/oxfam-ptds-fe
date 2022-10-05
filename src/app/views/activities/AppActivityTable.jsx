import React, { useState, useEffect, useRef } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import MUIDataTable from 'mui-datatables';
import { Box, styled, Icon } from '@mui/material';
import { Breadcrumb } from 'app/components';
import Button from '@mui/material/Button';
import { OxFamLogo } from 'app/components';
import AppActivityAddModal from './AppActivityAddModal';
import EditUsersIcon from 'app/components/svg-icons/EditUsersIcon';
import AddUsersIcon from 'app/components/svg-icons/AddUsersIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tooltip from '@material-ui/core/Tooltip';
import Error from '@material-ui/icons/Error';
import Done from '@material-ui/icons/Done';
import Activities from './activitydata';

const data = [
  [
    'Warly De La Cruz',
    'warly.dela.cruz@gmail.com',
    '09173052124',
    'CIC',
    'Admin',
    '8/08/2022 08:08',
    '8/08/2022 08:08',
    'Active',
  ],
  [
    'Robot De La Cruz',
    'robot.dela.cruz@gmail.com',
    '09171111111',
    'CIC',
    'Admin',
    '8/08/2022 08:08',
    '8/08/2022 08:08',
    'Active',
  ],
  [
    'Mark Athena Agana',
    'markAthenaAgana@gmail.com',
    '09171234567',
    'LANEX',
    'Project Woner',
    '8/09/2022 08:08',
    '8/10/2022 10:08',
    'Active',
  ],
  [
    'Mark Zuckerberg',
    'mark-zuckerberg@facebook.com',
    '09999999999',
    'Facebook',
    'Partner',
    '8/08/2022 08:08',
    '8/08/2022 08:08',
    'For approval',
  ],
  [
    'Rodrigo Duterte',
    'digongdu30@malacanaNG.com',
    '09271434455',
    'OOTP',
    'Admin',
    '8/08/2022 08:08',
    '8/08/2022 08:08',
    'Active',
  ],
  [
    'Bong Bong Marcos',
    'bong2x@malacanaNG.com',
    '09091434456',
    'OOTP',
    'Partner',
    '8/08/2022 08:08',
    '8/08/2022 08:08',
    'For approval',
  ],
  [
    'Sarah Duterte',
    'Sardu30@malacanaNG.com',
    '09091224456',
    'OOTP',
    'Partner',
    '8/08/2022 08:08',
    '8/08/2022 08:08',
    'For approval',
  ],
  [
    'Robin Padilla',
    'Robin@malacanaNG.com',
    '09491434456',
    'OOTP',
    'Aadmin',
    '8/08/2022 08:08',
    '8/08/2022 08:08',
    'For approval',
  ],
  [
    'Diana Quinzon',
    'DQ@malacanaNG.com',
    '09091432256',
    'OOTP',
    'Admin',
    '8/08/2022 08:08',
    '8/08/2022 08:08',
    'Approved',
  ],
  [
    'Luisa Marcos',
    'luisA@malacanaNG.com',
    '09471434456',
    'OOTP',
    'Partner',
    '9/08/2022 08:08',
    '9/08/2022 08:08',
    'For approval',
  ],
  [
    'Apo Lakay Marcos',
    'bong2x@malacanaNG.com',
    '09091434456',
    'OOTP',
    'Admin',
    '8/08/2022 08:08',
    '8/08/2022 08:08',
    'Approved',
  ],
];

const review = () => {
  console.log('TEST');
};
const columns = [
  { name: 'Name' },
  { name: 'Email' },
  'Contact',
  'Company ',
  'Role',
  'Created at',
  'Updated at',
  'Access Status',
  // {
  //   name: 'Access Status',
  //   options: {
  //     customBodyRender: (value, tableMeta, updateValue) => {
  //       if (value === 'OK')
  //         return (
  //           <Tooltip title="OK">
  //             <Done color="primary" />
  //           </Tooltip>
  //         );
  //       else
  //         return (
  //           <Tooltip title="Failing">
  //             <Error color="error" />
  //           </Tooltip>
  //         );
  //     },
  //   },
  // },
  {
    name: 'Actions',
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <Button variant="outlined" color="secondary" onClick={review}>
            {`Review`}
          </Button>
        );
      },
    },
  },
];

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

const AppActivityTable = () => {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  // const showAddParticipantsModal = () => {
  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (showModal) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [showModal]);
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
          routeSegments={[{ name: 'App Activity', path: '/records' }, { name: 'Records' }]}
        />
        <Button
          variant="contained"
          color="success"
          className={classes.addButton}
          onClick={openModal}
        >
          <Icon>add</Icon>
          <span>Activity</span>
        </Button>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          {/* <MUIDataTable
            title={'App Users Management'}
            data={data}
            columns={columns}
            options={options}
          /> */}
          {/* <MUIDataTable
            title="App Users List"
            data={datatableData}
            columns={[
              'Name',
              'Email',
              'Contact',
              'Company',
              'Role',
              'Created_at',
              'Updated_at',
              'Access Status',
              'Action',
            ]}
            options={options}
          /> */}
          <Activities />
        </Grid>
      </Grid>
      <AppActivityAddModal showModal={showModal} setShowModal={setShowModal} />
    </Container>
  );
};
export default AppActivityTable;
