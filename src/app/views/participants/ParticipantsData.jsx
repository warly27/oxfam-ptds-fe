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
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";

import daysJs from "dayjs";

const ParticipantsData = ({
  participantsData,
  handleDeleteParticipant,
  setShowBeneficiaryModal,
  setCurrentUser,
}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(participantsData);
  }, [participantsData]);

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

  // const onClickConfirmUser = (email) => {
  //   handleConfirmUser(email);
  // };

  const onClickDeleteUser = (id) => {
    handleDeleteParticipant(id);
  };

  const confirm = (id) => {
    setShowBeneficiaryModal(true);
    setCurrentUser(id);
  };

  const columns = [
    {
      name: "id",
      label: "Id",
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
      name: "email",
      label: "email",
      options: {
        filter: true,
      },
    },
    {
      name: "contact_number",
      label: "Mobile no.",
      options: {
        display: true,
      },
    },
    {
      name: "age",
      label: "Age",
      options: {
        display: true,
      },
    },
    {
      name: "address",
      label: "Address",
      options: {
        display: true,
      },
    },
    {
      name: "dob",
      label: "Birthday",
      options: {
        display: false,
      },
    },
    {
      name: "gender",
      label: "Gender",
      options: {
        display: false,
      },
    },
    {
      name: "civil_status",
      label: "Civil Status",
      options: {
        display: false,
      },
    },
    {
      name: "pwd_status",
      label: "PWD",
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
            <td colSpan={12}>
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row" align="left">
                        <strong>Date of birth: </strong>
                        {rowData[6]}
                      </TableCell>

                      <TableCell component="th" scope="row" align="left">
                        <strong>Gender:</strong> {rowData[7]}
                      </TableCell>

                      <TableCell component="th" scope="row" align="left">
                        <strong>Civil Status: </strong> {rowData[8]}
                      </TableCell>

                      <TableCell component="th" scope="row" align="left">
                        <strong>With Disability:</strong>{" "}
                        {rowData[9] === ""
                          ? "None"
                          : rowData[9].replaceAll("_", " ")}
                      </TableCell>

                      <TableCell component="th" scope="row" align="left">
                        <strong>Approved:</strong>{" "}
                        {daysJs(rowData[11]).format("DD/MM/YYYY")}
                      </TableCell>

                      <TableCell component="th" scope="row" align="center">
                        <Button
                          onClick={() => confirm(rowData[0])}
                          text={<VisibilityIcon />}
                          size="small"
                          disabled={rowData[5] === "1"}
                        />
                      </TableCell>

                      <TableCell component="th" scope="row" align="center">
                        <Button
                          onClick={() => onClickDeleteUser(rowData[0])}
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
          title={"App Participants"}
          options={options}
          columns={columns}
          data={data}
        />
      </ThemeProvider>
    </div>
  );
};

export default ParticipantsData;
