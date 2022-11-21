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

import dayjs from "dayjs";

const IndicatorsCodeData = ({ indicatorsCodeData, handleDeleteUser }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(indicatorsCodeData);
  }, [indicatorsCodeData]);

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
    handleDeleteUser(id);
  };

  const confirm = (value) => {
    console.log(value);
  };

  const columns = [
    {
      name: "id",
      label: "Code ID",
      options: {
        filter: true,
      },
    },
    {
      name: "name",
      label: "Indicator Name",
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
      name: "creator_id",
      label: "Created By",
      options: {
        filter: true,
      },
    },
    {
      name: "creator_role",
      label: "Creator Role",
      options: {
        filter: true,
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
      label: "Is deleted?",
      options: {
        display: false,
      },
    },
    {
      name: "createdAt",
      label: "Created At",
      options: {
        display: false,
      },
    },
    {
      name: "updatedAt",
      label: "Updated At",
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
        <>
          <tr>
            <td colSpan={6}>
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row" align="left">
                        <strong>Status:</strong>
                        {rowData[5] === "0" ? "Assigned" : "Unassigned"}
                      </TableCell>

                      <TableCell component="th" scope="row" align="left">
                        <strong>Is Deleted?: </strong>
                        {rowData[6] === "0" ? "Active" : "Deleted"}
                      </TableCell>

                      <TableCell component="th" scope="row" align="left">
                        <strong>Created At: </strong>
                        {dayjs(rowData[7]).format("MM/DD/YYYY")}
                      </TableCell>

                      <TableCell component="th" scope="row" align="left">
                        <strong>Updated At: </strong>{" "}
                        {dayjs(rowData[8]).format("MM/DD/YYYY")}
                      </TableCell>

                      {/* <TableCell component="th" scope="row" align="center">
                        <Button
                          onClick={() => onClickConfirmUser(rowData[3])}
                          text={<CheckIcon />}
                          size="small"
                          disabled={rowData[5] === "1"}
                        />
                      </TableCell> */}

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
          title={"Indicator Code"}
          options={options}
          columns={columns}
          data={data}
        />
      </ThemeProvider>
    </div>
  );
};

export default IndicatorsCodeData;
