import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme, List, ListItemText, Icon } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  FormLabel,
  FormGroup,
} from '@mui/material';
import axios from 'axios.js';

const Activities = () => {
  const [data, setData] = useState();

  const getMuiTheme = () =>
    createTheme({
      components: {
        MUIDataTableBodyCell: {
          styleOverrides: {
            root: {
              backgroundColor: '#e9ffdb',
            },
          },
        },
      },
    });

  useEffect(() => {
    axios
      .get(' https://phyqi94vke.execute-api.ap-southeast-1.amazonaws.com/dev/v1/activity/getAllActivities', {
        headers: {
          Authorization: `${window.localStorage.getItem('accessToken')}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [setData]);

  // useEffect(() => {
  //   const accessToken = window.localStorage.getItem('accessToken');
  //   console.log(accessToken);

  //   const url = 'https://jsonplaceholder.typicode.com/posts';

  //   const getDatas = fetch(url)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // this.setState({ data: data });
  //       setData(data);
  //     })
  //     .catch((err) => console.log('error:', err));
  // }, [setData]);

  const handleClick = (value) => {
    console.log('value', value.id);
    const { id } = value;
    const url = `https://jsonplaceholder.typicode.com/posts/${id}/comments`;
    const getComments = fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // this.setState({ comments: data });
        console.log(data);
      })
      .catch((err) => console.log('error:', err));
  };

  const columns = [
    {
      name: 'id',
      label: 'Activity Id',
      options: {
        filter: true,
      },
    },
    {
      name: 'project_id',
      label: 'Project ID',
      options: {
        filter: true,
      },
    },
    {
      name: 'indicator_id',
      label: 'WBS',
      options: {
        filter: true,
      },
    },
    {
      name: 'title',
      label: 'Activity Title',
      options: {
        filter: false,
      },
    },
    {
      name: 'description',
      label: 'description',
      options: {
        filter: false,
      },
    },
    {
      name: 'venue',
      label: 'Venue',
      options: {
        display: false,
      },
    },
    {
      name: 'date',
      label: 'Date',
      options: {
        display: false,
      },
    },
    {
      name: 'is_deleted',
      label: 'Is Deleted',
      options: {
        display: false,
      },
    },
    {
      name: 'status',
      label: 'Status',
      options: {
        display: false,
      },
    },
  ];

  const options = {
    filter: true,
    selectableRows: 'none',
    // responsive: 'scrollMaxHeight',
    expandableRows: true,
    onRowsDelete: (rowsDeleted, dataRows) => {
      console.log(dataRows[0]);
      console.log(rowsDeleted.data);
    },
    renderExpandableRow: (rowData, rowMeta) => {
      console.log('DATA: ' + rowData);
      console.log('MDATA: ' + rowMeta);
      return (
        <tr>
          <td colSpan={12}>
            <TableContainer>
              <Table style={{ margin: '0 auto' }}>
                <TableHead>
                  <TableCell align="left">Activity Venue</TableCell>
                  <TableCell align="left">Activity Date</TableCell>
                  <TableCell align="left">Is Deleted?</TableCell>
                  <TableCell align="left">Status</TableCell>
                  <TableCell align="left">Actions</TableCell>
                  {/* <TableCell align="right">Color</TableCell>
                  <TableCell align="right">Size</TableCell> */}
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row" align="left">
                      {/* <strong>Role:</strong> */}
                      {rowData[5]}
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                    {rowData[6]}
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                    {rowData[7]}
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                    {rowData[8]}
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                      <Icon> playlist_add </Icon>
                    </TableCell>

                    {/* <TableCell align="right">{row.color}</TableCell>
                        <TableCell align="right">{row.size}</TableCell> */}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </td>
        </tr>
      );
    },
    onRowsClick: (rowData, rowMeta) => {
      console.log('rowData', rowData);
      handleClick(data[rowMeta.dataIndex]);
    },
    onRowsExpand: (curExpanded, allExpanded) => {
      console.log('rowExpand', curExpanded, allExpanded[0]);
      handleClick(data[allExpanded[0].dataIndex]);
    },
  };
  return (
    <div className="App">
      <ThemeProvider theme={getMuiTheme}>
        {/* total amount of the current page: {total} */}
        <MUIDataTable
          title={'Project Activities'}
          options={options}
          columns={columns}
          data={data}
        />
      </ThemeProvider>
    </div>
  );
};

export default Activities;
