import React, { useState, useEffect, useCallback } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
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

const UsersData = ({ userData, handleConfirmUser, handleDeleteUser }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(userData);
  }, [userData]);

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

  const handleClick = (value) => {
    console.log("value", value?.id);
  };

  const onClickConfirmUser = (email) => {
    handleConfirmUser(email);
  };

  const onClickDeleteUser = (cognitoId, email) => {
    handleDeleteUser(cognitoId, email);
  };

  const columns = [
    {
      name: "id",
      label: "User Id",
      options: {
        filter: true,
      },
    },
    {
      name: "cognito_id",
      label: "AWS ID",
      options: {
        filter: true,
      },
    },
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
      },
    },
    {
      name: "email",
      label: "email",
      options: {
        filter: false,
      },
    },
    {
      name: "role",
      label: "Role",
      options: {
        display: false,
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        display: false,
      },
    },
    {
      name: "is_deleted",
      label: "Is Deleted",
      options: {
        display: false,
      },
    },
    {
      name: "createdAt",
      label: "Submitted",
      options: {
        display: false,
      },
    },
    {
      name: "updatedAt",
      label: "Approve",
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
                        <strong>Role:</strong>
                        {rowData[4]}
                      </TableCell>

                      <TableCell component="th" scope="row" align="left">
                        <strong>Status:</strong>{" "}
                        {rowData[5] === "0" ? "For Approval" : "Approved"}
                      </TableCell>

                      <TableCell component="th" scope="row" align="left">
                        <strong>Is Deleted?:</strong>{" "}
                        {rowData[6] === "0" ? "Active" : "Deleted"}
                      </TableCell>

                      <TableCell component="th" scope="row" align="left">
                        <strong>Submitted:</strong> {rowData[7]}
                      </TableCell>

                      <TableCell component="th" scope="row" align="left">
                        <strong>Approved:</strong> {rowData[8]}
                      </TableCell>

                      <TableCell component="th" scope="row" align="center">
                        <Button
                          onClick={() => onClickConfirmUser(rowData[3])}
                          text={<CheckIcon />}
                          size="small"
                          disabled={rowData[5] === "1"}
                        />
                      </TableCell>

                      <TableCell component="th" scope="row" align="center">
                        <Button
                          onClick={() =>
                            onClickDeleteUser(rowData[1], rowData[3])
                          }
                          text={<DeleteOutlineIcon />}
                          size="small"
                          disabled={rowData[6] === "1"}
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
    //   handleClick(data[rowMeta?.dataIndex]);
    // },
    onRowsExpand: (curExpanded, allExpanded) => {
      console.log("[curExpanded]", curExpanded);
      console.log("[allExpanded]", allExpanded);

      handleClick();
    },
  };
  return (
    <div className="App">
      <ThemeProvider theme={getMuiTheme}>
        {/* total amount of the current page: {total} */}
        <MUIDataTable
          title={"App Users"}
          options={options}
          columns={columns}
          data={data}
        />
      </ThemeProvider>
    </div>
  );
};

export default UsersData;
