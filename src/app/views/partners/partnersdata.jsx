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
import { faL } from '@fortawesome/free-solid-svg-icons';

const PartnersData = () => {
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
      .get(
        ' https://phyqi94vke.execute-api.ap-southeast-1.amazonaws.com/dev/v1/partner/getAllPartners',
        {
          headers: {
            Authorization: `${window.localStorage.getItem('accessToken')}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setData(res.data);
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
      label: 'Partner Id',
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
      name: 'code',
      label: 'Code',
      options: {
        filter: true,
      },
    },
    {
      name: 'email',
      label: 'email',
      options: {
        filter: true,
      },
    },
    {
      name: 'address',
      label: 'Address',
      options: {
        display: false,
      },
    },
    {
      name: 'website',
      label: 'Website',
      options: {
        display: false,
      },
    },
    {
      name: 'contact_number',
      label: 'Contact no.',
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
                <TableCell align="left">Address</TableCell>
                <TableCell align="left">Website</TableCell>
                <TableCell align="left">Contact No.</TableCell>
                <TableCell align="left">Status</TableCell>
                  <TableCell align="left">Is Deleted?</TableCell>
                  <TableCell align="left">Created At</TableCell>
                  <TableCell align="left">Actions</TableCell>
                  {/* <TableCell align="right">Color</TableCell>
                  <TableCell align="right">Size</TableCell> */}
                </TableHead>
                <TableBody>
                  <TableRow>
                  <TableCell component="th" scope="row" align="left">
                      {/* <strong>Is Deleted?:</strong> */}
                      {rowData[4]}
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                      {/* <strong>Is Deleted?:</strong> */}
                      {rowData[5]}
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                      {/* <strong>Is Deleted?:</strong> */}
                      {rowData[6]}
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                      {/* <strong>Created At:</strong>  */}
                      {rowData[7] === '0' ? 'for approval' : 'Approved'}
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                      {/* <strong>Updated At:</strong>  */}
                      {rowData[8] === '0' ? 'Active' : 'Deleted'}
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                      {/* <strong>Created At:</strong>  */}
                      {rowData[9]}
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
        <MUIDataTable title={'App Partners'} options={options} columns={columns} data={data} />
      </ThemeProvider>
    </div>
  );
};

export default PartnersData;
