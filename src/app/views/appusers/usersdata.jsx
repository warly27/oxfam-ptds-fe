import React, { useState, useEffect, useCallback } from "react";

import MUIDataTable from "mui-datatables";
import {
  ThemeProvider,
  createTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import Button from "app/components/controls/Button";
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import dayjs from "dayjs";

const UsersData = ({
  userData,
  handleConfirmUser,
  handleDeleteUser,
  openModal,
  setIsEdit,
  setCurrentUser,
}) => {
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

  const confirm = (value) => {
    console.log(value);
  };

  const columns = [
    {
      name: "id",
      label: "ID",
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
      name: "first_name",
      label: "Name",
      options: {
        filter: true,
      },
    },
    {
      name: "last_name",
      label: " ",
      options: {
        filter: true,
      },
    },
    {
      name: "email",
      label: "email",
      options: {
        filter: true,
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
                        <strong>Role: </strong>
                        {rowData[5]}
                      </TableCell>

                      <TableCell component="th" scope="row" align="left">
                        <strong>Status:</strong>{" "}
                        {rowData[6] === "0" ? "For Approval" : "Approved"}
                      </TableCell>

                      <TableCell component="th" scope="row" align="left">
                        <strong>Is Deleted?:</strong>{" "}
                        {rowData[7] === "0" ? "Active" : "Deleted"}
                      </TableCell>

                      <TableCell component="th" scope="row" align="left">
                        <strong>Submitted:</strong>{" "}
                        {dayjs(rowData[8]).format("MM/DD/YYYY")}
                      </TableCell>

                      <TableCell component="th" scope="row" align="left">
                        <strong>Approved: </strong>{" "}
                        {dayjs(rowData[9]).format("MM/DD/YYYY")}
                      </TableCell>

                      <TableCell component="th" scope="row" align="center">
                        <Button
                          onClick={() => onClickConfirmUser(rowData[4])}
                          text={<CheckIcon />}
                          size="small"
                          disabled={rowData[6] === "1" || rowData[7] === "1"}
                        />
                      </TableCell>

                      <TableCell component="th" scope="row" align="center">
                        <Button
                          onClick={() => {
                            setIsEdit(true);
                            openModal();
                            setCurrentUser(
                              data.find(
                                (dataItem) => dataItem.id === rowData[0]
                              )
                            );
                          }}
                          text={<ModeEditIcon />}
                          size="small"
                          disabled={rowData[7] === "1"}
                        />
                      </TableCell>

                      <TableCell component="th" scope="row" align="center">
                        <Button
                          onClick={() =>
                            onClickDeleteUser(rowData[1], rowData[4])
                          }
                          text={<DeleteOutlineIcon />}
                          size="small"
                          disabled={rowData[7] === "1"}
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
