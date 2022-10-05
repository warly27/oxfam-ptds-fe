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

const Test = () => {
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
    const accessToken = window.localStorage.getItem('accessToken');
    console.log(accessToken);
    const url = 'https://jsonplaceholder.typicode.com/posts';

    const getDatas = fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // this.setState({ data: data });
        setData(data);
      })
      .catch((err) => console.log('error:', err));
  }, [setData]);

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
      name: 'userId',
      label: 'User Id',
      options: {
        filter: true,
      },
    },
    {
      name: 'title',
      label: 'Title',
      options: {
        filter: true,
      },
    },
    {
      name: 'body',
      label: 'Body',
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
                  <TableCell align="left">Body</TableCell>
                  {/* <TableCell align="right">Color</TableCell>
                  <TableCell align="right">Size</TableCell> */}
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row" align="left">
                      {rowData[2]}
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
        <MUIDataTable title={'Participants'} options={options} columns={columns} data={data} />
      </ThemeProvider>
    </div>
  );
};

export default Test;
