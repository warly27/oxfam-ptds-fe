import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme, List, ListItemText } from '@mui/material';
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
      .get('https://phyqi94vke.execute-api.ap-southeast-1.amazonaws.com/dev/v1/users/getAllUsers', {
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
      label: 'User Id',
      options: {
        filter: true,
      },
    },
    {
      name: 'cognito_id',
      label: 'AWS ID',
      options: {
        filter: true,
      },
    },
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: true,
      },
    },
    {
      name: 'email',
      label: 'email',
      options: {
        filter: false,
      },
    },
    {
      name: 'role',
      label: 'Role',
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
    {
      name: 'is_deleted',
      label: 'Is Deleted',
      options: {
        display: false,
      },
    },
    {
      name: 'created_at',
      label: 'Submitted',
      options: {
        display: false,
      },
    },
    {
      name: 'updated_at',
      label: 'Approve',
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
          <td colSpan={4}>
            <TableContainer>
              <Table style={{ margin: '0 auto' }}>
                <TableHead>
                  <TableCell align="left">Info</TableCell>
                  {/* <TableCell align="right">Color</TableCell>
                  <TableCell align="right">Size</TableCell> */}
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row" align="left">
                      <strong>Role:</strong>
                      {rowData[4]}
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                      <strong>Status:</strong> {rowData[5] === '0' ? 'for approval' : 'Approved'}
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                      <strong>Is Deleted?:</strong> {rowData[6] === '0' ? 'Active' : 'Deleted'}
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                      <strong>Submitted:</strong> {rowData[7]}
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                      <strong>Approved:</strong> {rowData[8]}
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
