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
// import { faL } from '@fortawesome/free-solid-svg-icons';

const ProjectsData = () => {
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
        'https://phyqi94vke.execute-api.ap-southeast-1.amazonaws.com/dev/v1/project/getAllProjects',
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
      label: 'Project Id',
      options: {
        filter: true,
      },
    },
    {
      name: 'partner_id',
      label: 'Partner ID',
      options: {
        filter: true,
      },
    },
    {
      name: 'code',
      label: 'Project Code',
      options: {
        filter: true,
      },
    },
    {
      name: 'name',
      label: 'Project Short Name',
      options: {
        filter: true,
      },
    },
    {
      name: 'title',
      label: 'Project Title',
      options: {
        filter: true,
      },
    },
    {
      name: 'description',
      label: 'Description',
      options: {
        filter: true,
      },
    },
    {
      name: 'type',
      label: 'Type',
      options: {
        filter: true,
      },
    },
    {
      name: 'portfolio',
      label: 'Portfolio',
      options: {
        display: false,
      },
    },
    {
      name: 'fund_source',
      label: 'Fund Source',
      options: {
        display: false,
      },
    },
    {
      name: 'budget',
      label: 'Budget',
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
        label: 'Is Deleted?',
        options: {
          display: false,
        },
      },
      {
        name: 'start_date',
        label: 'Start Date',
        options: {
          display: false,
        },
      },
      {
        name: 'end_date',
        label: 'End Date',
        options: {
          display: false,
        },
      }
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
                <TableCell align="left">Portfolio</TableCell>
                <TableCell align="left">Fund Source</TableCell>
                <TableCell align="left">Budget</TableCell>
                <TableCell align="left">Status</TableCell>
                  <TableCell align="left">Is Deleted?</TableCell>
                  <TableCell align="left">Start Date</TableCell>
                  <TableCell align="left">Created At</TableCell>
                  <TableCell align="left">Actions</TableCell>
                  {/* <TableCell align="right">Color</TableCell>
                  <TableCell align="right">Size</TableCell> */}
                </TableHead>
                <TableBody>
                  <TableRow>
                  <TableCell component="th" scope="row" align="left">
                      {/* <strong>Is Deleted?:</strong> */}
                      {rowData[7]}
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                      {/* <strong>Is Deleted?:</strong> */}
                      {rowData[8]}
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                      {/* <strong>Is Deleted?:</strong> */}
                      {rowData[9]}
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                      {/* <strong>Created At:</strong>  */}
                      {rowData[10] === '0' ? 'for approval' : 'Approved'}
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                      {/* <strong>Updated At:</strong>  */}
                      {rowData[11] === '0' ? 'Active' : 'Deleted'}
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                      {/* <strong>Created At:</strong>  */}
                      {rowData[12]}
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                      {/* <strong>Updated At:</strong>  */}
                      {rowData[13] === '0' ? 'Active' : 'Deleted'}
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                      {/* <strong>Created At:</strong>  */}
                      {rowData[14]}
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

export default ProjectsData;
