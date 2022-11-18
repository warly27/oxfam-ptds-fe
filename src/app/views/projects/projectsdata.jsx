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
import dayjs from "dayjs";

const ProjectsData = ({ partnerProjectList }) => {
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
    console.log("handle Click");
  };

  const columns = [
    {
      name: "id",
      label: "Project Id",
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
      name: "project_code",
      label: "Project Code",
      options: {
        filter: true,
      },
    },
    {
      name: "project_name",
      label: "Project Short Name",
      options: {
        filter: true,
      },
    },
    {
      name: "project_title",
      label: "Project Title",
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
      name: "project_type",
      label: "Type",
      options: {
        display: false,
      },
    },
    {
      name: "portfolio",
      label: "Portfolio",
      options: {
        display: false,
      },
    },
    {
      name: "fund_source",
      label: "Fund Source",
      options: {
        display: false,
      },
    },
    {
      name: "budget",
      label: "Budget",
      options: {
        display: false,
      },
    },
    {
      name: "project_status",
      label: "Status",
      options: {
        display: false,
      },
    },
    {
      name: "is_deleted",
      label: "Is Deleted?",
      options: {
        display: false,
      },
    },
    {
      name: "project_start_date",
      label: "Start Date",
      options: {
        display: false,
      },
    },
    {
      name: "project_end_date",
      label: "End Date",
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
        <tr>
          <td colSpan={12}>
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row" align="left">
                      <strong>Project Type: </strong>
                      {rowData[6]}
                    </TableCell>

                    <TableCell component="th" scope="row" align="left">
                      <strong>Status: </strong>
                      {rowData[10]}
                    </TableCell>

                    <TableCell component="th" scope="row" align="left">
                      <strong>Start Date: </strong>
                      {dayjs(rowData[12]).format("MM/DD/YYYY")}
                    </TableCell>

                    <TableCell component="th" scope="row" align="left">
                      <strong>End Date: </strong>
                      {dayjs(rowData[13]).format("MM/DD/YYYY")}
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
          title={"Projects"}
          options={options}
          columns={columns}
          data={partnerProjectList}
        />
      </ThemeProvider>
    </div>
  );
};

export default ProjectsData;
