import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme, Icon } from "@mui/material";
import MUIDataTable from "mui-datatables";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import Paper from "@material-ui/core/Paper";

import Button from "app/components/controls/Button";
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const PartnersData = ({ activityList, handleConfirmUser, handleDeleteUser }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(activityList);
  }, [activityList]);

  const getMuiTheme = () =>
    createTheme({
      components: {
        MUIDataTableBodyCell: {
          styleOverrides: {
            root: {
              backgroundColor: "#e9ffdb",
            },
          },
        },
      },
    });

  const handleClick = () => {
    console.log("clicked");
  };

  const onClickConfirmUser = (email) => {
    handleConfirmUser(email);
  };

  const onClickDeleteUser = (cognitoId, email) => {
    handleDeleteUser(cognitoId, email);
  };

  // const columns = [
  //   {
  //     name: "id",
  //     label: "Partner Id",
  //     options: {
  //       filter: true,
  //     },
  //   },
  //   {
  //     name: "name",
  //     label: "Name",
  //     options: {
  //       filter: true,
  //     },
  //   },
  //   {
  //     name: "code",
  //     label: "Code",
  //     options: {
  //       filter: true,
  //     },
  //   },
  //   {
  //     name: "email",
  //     label: "email",
  //     options: {
  //       filter: true,
  //     },
  //   },
  //   {
  //     name: "address",
  //     label: "Address",
  //     options: {
  //       display: false,
  //     },
  //   },
  //   {
  //     name: "website",
  //     label: "Website",
  //     options: {
  //       display: false,
  //     },
  //   },
  //   {
  //     name: "contact_number",
  //     label: "Contact no.",
  //     options: {
  //       display: false,
  //     },
  //   },
  //   {
  //     name: "status",
  //     label: "Status",
  //     options: {
  //       display: false,
  //     },
  //   },
  //   {
  //     name: "is_deleted",
  //     label: "Is Deleted",
  //     options: {
  //       display: false,
  //     },
  //   },
  //   {
  //     name: "createdAt",
  //     label: "Submitted",
  //     options: {
  //       display: false,
  //     },
  //   },
  //   {
  //     name: "updatedAt",
  //     label: "Approve",
  //     options: {
  //       display: false,
  //     },
  //   },
  //   {
  //     name: "cognito_id",
  //     label: "Cognito ID",
  //     options: {
  //       display: false,
  //     },
  //   },
  // ];


  const columns = [
    {
      name: 'id',
      label: 'Activity Id',
      options: {
        filter: true,
      },
    },
    {
      name: 'indicator_id',
      label: 'Indicator',
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
      name: 'description',
      label: 'Description',
      options: {
        filter: true,
      },
    },
    {
      name: 'venue',
      label: 'Vanue',
      options: {
        filter: true,
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
      name: 'creator_id',
      label: 'Created by',
      options: {
        display: false,
      },
    },
    {
      name: 'creator_role',
      label: 'Creator Role',
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
  ];

  const options = {
    filter: true,
    selectableRows: "none",
    // responsive: 'scrollMaxHeight',
    expandableRows: true,
    onRowsDelete: (rowsDeleted, dataRows) => {
      console.log(dataRows[0]);
      console.log(rowsDeleted.data);
    },
    renderExpandableRow: (rowData, rowMeta) => {
      console.log("DATA: " + rowData);
      console.log("MDATA: " + rowMeta);
      return (
        <>
          <tr>
            <td colSpan={6}>
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row" align="left">
                        {/* <strong>Is Deleted?:</strong> */}
                        <strong>Date</strong> {rowData[5]}
                      </TableCell>

                      <TableCell component="th" scope="row" align="left">
                        <strong>Created by</strong> {rowData[6]}
                      </TableCell>

                      <TableCell component="th" scope="row" align="left">
                        <strong>Created Role</strong> {rowData[7]}
                      </TableCell>

                      <TableCell component="th" scope="row" align="left">
                        <strong>Status</strong>{" "}
                        {rowData[8] === "0" ? "for approval" : "Approved"}
                      </TableCell>

                      <TableCell component="th" scope="row" align="left">
                        <strong>Is Deleted?</strong>{" "}
                        {rowData[9] === "0" ? "Active" : "Deleted"}
                      </TableCell>

                      <TableCell component="th" scope="row" align="center">
                        <Button
                          onClick={() => onClickConfirmUser(rowData[3])}
                          text={<CheckIcon />}
                          size="small"
                          disabled={rowData[7] === "1"}
                        />
                      </TableCell>

                      <TableCell component="th" scope="row" align="center">
                        <Button
                          onClick={() =>
                            onClickDeleteUser(rowData[11], rowData[3])
                          }
                          text={<DeleteOutlineIcon />}
                          size="small"
                          disabled={rowData[8] === "1"}
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </td>
          </tr>
        </>
      );
    },
    // onRowsClick: (rowData, rowMeta) => {
    //   console.log("rowData", rowData);
    //   handleClick(data[rowMeta.dataIndex]);
    // },
    onRowsExpand: (curExpanded, allExpanded) => {
      console.log("rowExpand", curExpanded, allExpanded[0]);
      handleClick();
    },
  };
  return (
    <div className="App">
      <ThemeProvider theme={getMuiTheme}>
        {/* total amount of the current page: {total} */}
        <MUIDataTable
          title={"Activities"}
          options={options}
          columns={columns}
          data={data}
        />
      </ThemeProvider>
    </div>
  );
};

export default PartnersData;
