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

import Button from "app/components/controls/Button";
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import days from "dayjs";

const PartnersData = ({
  partnerList,
  handleConfirmUser,
  handleDeleteUser,
  setShowModal,
  setCurrentSelectedUser,
  setIsEdit,
}) => {
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
      name: "id",
      label: "ID",
      options: {
        filter: true,
      },
    },
    {
      name: "user_name",
      label: "User Name",
      options: {
        filter: true,
      },
    },
    {
      name: "partner_id",
      label: "Partner ID",
      options: {
        filter: true,
      },
    },
    {
      name: "partner_code",
      label: "Partner Code",
      options: {
        filter: true,
      },
    },
    {
      name: "project_id",
      label: "Project ID",
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
      return (
        <tr>
          <td colSpan={6}>
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row" align="left">
                      <strong>Project ID:</strong> {rowData[4]}
                    </TableCell>

                    <TableCell component="th" scope="row" align="left">
                      <strong>Is Deleted?</strong>{" "}
                      {rowData[5] === "0" ? "Active" : "Deleted"}
                    </TableCell>

                    <TableCell component="th" scope="row" align="left">
                      <strong>Created At:</strong>{" "}
                      {days(rowData[6]).format("MM/DD/YYYY")}
                    </TableCell>

                    {/* <TableCell component="th" scope="row" align="center">
                      <Button
                        onClick={() => {
                          setShowModal(true);
                          setCurrentSelectedUser({
                            id: rowData[0],
                            partner_id: rowData[2],
                          });
                        }}
                        text={<AddIcon />}
                        size="small"
                        disabled={rowData[5] === "1"}
                      />
                    </TableCell> */}

                    <TableCell component="th" scope="row" align="center">
                      <Button
                        onClick={() => {
                          setShowModal(true);
                          setIsEdit(true);
                          setCurrentSelectedUser({
                            id: rowData[0],
                            partner_id: rowData[2],
                            user_name: rowData[1],
                          });
                        }}
                        text={<ModeEditIcon />}
                        size="small"
                        disabled={rowData[5] === "1"}
                      />
                    </TableCell>

                    {/* <TableCell component="th" scope="row" align="center">
                      <Button
                        onClick={() => onClickConfirmUser(rowData[3])}
                        text={<CheckIcon />}
                        size="small"
                        disabled={rowData[7] === "1"}
                      />
                    </TableCell> */}

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
          title={"Partners"}
          options={options}
          columns={columns}
          data={data}
        />
      </ThemeProvider>
    </div>
  );
};

export default PartnersData;
