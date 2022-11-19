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
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const PartnersCodeData = ({
  partnersCodeData,
  handleDeletePartnerCode,
  setCurrentData,
  setShowModal,
  setIsEdit,
}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(partnersCodeData);
  }, [partnersCodeData]);

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

  const onClickDeleteUser = (id) => {
    handleDeletePartnerCode(id);
  };

  const onClickEdit = (data) => {
    console.log("[data]: ", data);

    const currentData = {
      email: data[3],
      companyWebsite: data[5],
      phone: data[6],
      partnerCode: data[2],
      company: data[1],
      companyAddress: data[4],
      id: data[0],
    };

    setIsEdit(true);
    setCurrentData(currentData);
    setShowModal(true);
  };

  const columns = [
    {
      name: "id",
      label: "Code id",
      options: {
        filter: false,
        display: false
      },
    },
    {
      name: "name",
      label: "Partner Name",
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
        filter: false,
        display: false
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
        filter: false,
        display: false
      },
    },
    {
      name: "contact_number",
      label: "Contact No.",
      options: {
        filter: false,
        display: false
      },
    },
    {
      name: "creator_id",
      label: "Created By",
      options: {
        display: false,
      },
    },
    {
      name: "creator_role",
      label: "Creator Role",
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
      console.log("MDATA: ", rowMeta);
      return (
        <>
          <tr>
            <td colSpan={6}>
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    <TableRow>
                      {/* <TableCell component="th" scope="row" align="left">
                        <strong>Website: </strong>
                        {rowData[5]}
                      </TableCell>

                      <TableCell component="th" scope="row" align="left">
                        <strong>Contact number: </strong>
                        {rowData[6]}
                      </TableCell> */}

                      <TableCell component="th" scope="row" align="left">
                        <strong>Created By: </strong>
                        {rowData[7]}
                      </TableCell>

                      <TableCell component="th" scope="row" align="left">
                        <strong>Creator Role: </strong> {rowData[8]}
                      </TableCell>

                      <TableCell component="th" scope="row" align="center">
                        <Button
                          onClick={() => onClickEdit(rowData)}
                          text={<ModeEditIcon />}
                          size="small"
                          disabled={rowData[6] === "1"}
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
          title={"Partners Code"}
          options={options}
          columns={columns}
          data={data}
        />
      </ThemeProvider>
    </div>
  );
};

export default PartnersCodeData;
