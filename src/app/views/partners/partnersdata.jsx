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

import { faL } from "@fortawesome/free-solid-svg-icons";

const PartnersData = ({ partnerList, handleConfirmUser, handleDeleteUser }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(partnerList);
  }, [partnerList]);

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

  const columns = [
    {
      name: "id",
      label: "Partner Id",
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
      name: "code",
      label: "Code",
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
      name: "address",
      label: "Address",
      options: {
        display: false,
      },
    },
    {
      name: "website",
      label: "Website",
      options: {
        display: false,
      },
    },
    {
      name: "contact_number",
      label: "Contact no.",
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
    {
      name: "cognito_id",
      label: "Cognito ID",
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
                        <strong>Address</strong> {rowData[4]}
                      </TableCell>

                      <TableCell component="th" scope="row" align="left">
                        <strong>Website</strong> {rowData[5]}
                      </TableCell>

                      <TableCell component="th" scope="row" align="left">
                        <strong>Contact No.</strong> {rowData[6]}
                      </TableCell>

                      <TableCell component="th" scope="row" align="left">
                        <strong>Status</strong>{" "}
                        {rowData[7] === "0" ? "for approval" : "Approved"}
                      </TableCell>

                      <TableCell component="th" scope="row" align="left">
                        <strong>Is Deleted?</strong>{" "}
                        {rowData[8] === "0" ? "Active" : "Deleted"}
                      </TableCell>

                      <TableCell component="th" scope="row" align="left">
                        <strong>Created At</strong> {rowData[9]}
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
          title={"App Partners"}
          options={options}
          columns={columns}
          data={data}
        />
      </ThemeProvider>
    </div>
  );
};

export default PartnersData;
